import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequestQuery } from './CompositeSubrequestQuery'
import { CompositeSubrequestSObject } from './CompositeSubrequestSObject'
import { CompositeSubrequestSObjectCollection } from './CompositeSubrequestSObjectCollection'
import { CompositeSubrequestBody } from './CompositeSubrequest'

interface CompositeCallOptions {
  version?: string
  allOrNone?: boolean
  collateSubrequests?: boolean
  jsforceConnection?: any
}

// Taken from https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm
interface CompositeCallRequest {
  allOrNone?: boolean
  collateSubrequests?: boolean
  compositeRequest: CompositeSubrequestBody[]
}

interface CompositeCallResponseError {
  message: string
  errorCode: string
  fields: string[]
}

interface CompositeCallResponseResult {
  id: string
  success: boolean
  errors: any[]
}

export interface CompositeResponse200<T = CompositeCallResponseResult> {
  body: T
  httpHeaders: {
    [header: string]: string
  }
  httpStatusCode: 200
  referenceId: string
}

export interface CompositeResponseAny {
  body?:
  | CompositeCallResponseResult
  | CompositeCallResponseResult[]
  | CompositeCallResponseError[]
  httpHeaders: {
    [header: string]: string
  }
  httpStatusCode: 200
  referenceId: string
}

export type CompositeResponse<T = any> = CompositeResponse200<T> | CompositeResponseAny

// Taken from https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/responses_composite.htm
export interface CompositeCallResponse<T = any> {
  compositeResponse: Array<CompositeResponse<T>>
}

/**
 * @description Main class for constructing a composite call. Tracks and enforces limits on query and request imposed by Salesforce API.
 * @param {object} [options] - **Optional.** Options for creating the instance.
 * @param {string} [options.version] - **Optional.** The version of Salesforce API to use.
 * @param {boolean} [options.allOrNone] - **Optional.** Used in the request to Salesforce.
 * See their [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm).
 * @param {boolean} [options.collateSubrequests] - **Optional.** Used in the request to Salesforce.
 * See their [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm).
 * @param {object} [options.jsforceConnection] - **Optional.** This connection enables the `execute()` method for convenience.
 * Without it, the result of Composite Call will have to be passed to another method to post it to Salesforce.
 */
export class CompositeCall {
  constructor (options: CompositeCallOptions) {
    this.version = this.versionRX.test(options.version as string)
      ? options.version as string
      : 'v48.0'
    this.calls = []
    this.options = {
      allOrNone: options.allOrNone as boolean,
      collateSubrequests: options.collateSubrequests as boolean
    }
    this.connection = options.jsforceConnection
    this.limits = {
      query: 5, // Salesforce defines that only up-to 5 queries may be included in a composite call (https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite.htm).
      total: 25, // Salesforce also defines that there may be only up-to 25 total requests (including queries) in a composite call.
      queryCount: 0,
      totalCount: 0
    }
  }

  version: string
  calls: any[]
  connection: any

  options: {
    allOrNone: boolean
    collateSubrequests: boolean
  }

  limits: {
    query: number
    queryCount: number
    total: number
    totalCount: number
  }

  get versionRX (): RegExp {
    return /v\d\d\.\d/gu
  }

  /**
   * @property {string} url - The versioned url of the composite request.
   */

  get url (): string {
    return `/services/data/${this.version}/composite`
  }

  /**
   * @property {object} request - The result of constructing the composite call.
   * @property {boolean} [request.allOrNone] - **Optional.** Specifies what to do when an error occurs while processing a subrequest.
   * @property {boolean} [request.collateSubrequests] - **Optional.** Specifies what to do when an error occurs while processing a subrequest.
   * @property {object[]} request.CompositeSubrequest - Collection of subrequests to execute.
   */

  get request (): CompositeCallRequest {
    const compositeRequest = this.calls.map(val => val.subrequest)

    return {
      compositeRequest,
      ...this.options
    }
  }

  get queryLimitMet (): boolean {
    return this.limits.queryCount === this.limits.query
  }

  get totalLimitMet (): boolean {
    return this.limits.totalCount === this.limits.total
  }

  /**
   * @description Add a query subrequest instance to the composite request.
   * @param {string} query - A SOQL query.
   * @param {string} [referenceId] - **Optional.** The reference ID of the query subrequest.
   * @param {string} [version] - **Optional.** The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.
   * @returns {CompositeSubrequestQuery} - An instance of `CompositeSubrequestQuery`.
   * @throws {Error} Query limit met. No more queries may be added.
   * @throws {Error} Total request limit met. No more requests may be added.
   */
  addQuery (
    query: string,
    referenceId?: string,
    version?: string
  ): CompositeSubrequestQuery {
    if (this.queryLimitMet) {
      throw new Error('Query limit met. No more queries may be added.')
    }
    if (this.totalLimitMet) {
      throw new Error('Total request limit met. No more requests may be added.')
    }
    version = isNullOrUndefined(version) ? this.version : version
    const newCall = new CompositeSubrequestQuery(query, referenceId, version)

    this.calls.push(newCall)
    this.limits.queryCount += 1
    this.limits.totalCount += 1

    return newCall
  }

  /**
   * @description Add a SObject subrequest instance to the composite request.
   * @param {string} sobject - A SObject name; may be built-in or custom.
   * @param {string} [referenceId] - **Optional.** The reference ID of the SObject subrequest.
   * @param {string} [version] - **Optional.** The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.
   * @returns {CompositeSubrequestSObject} - An instance of `CompositeSubrequestSObject`.
   * @throws {Error} Total request limit met. No more requests may be added.
   */
  addSObject (
    sobject: string,
    referenceId?: string,
    version?: string
  ): CompositeSubrequestSObject {
    if (this.totalLimitMet) {
      throw new Error('Total request limit met. No more requests may be added.')
    }
    version = isNullOrUndefined(version) ? this.version : version
    const newCall = new CompositeSubrequestSObject(
      sobject,
      referenceId,
      version
    )

    this.calls.push(newCall)
    this.limits.totalCount += 1

    return newCall
  }

  /**
   * @description Add a SObject Collection subrequest instance to the composite request.
   * @param {string} [referenceId] - **Optional.** The reference ID of the SObject subrequest.
   * @param {string} [version] - **Optional.** The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.
   * @returns {CompositeSubrequestSObjectCollection} - An instance of `CompositeSubrequestSObjectCollection`.
   * @throws {Error} Total request limit met. No more requests may be added.
   */
  addSObjectCollection (
    referenceId?: string,
    version?: string
  ): CompositeSubrequestSObjectCollection {
    if (this.totalLimitMet) {
      throw new Error('Total request limit met. No more requests may be added.')
    }
    version = isNullOrUndefined(version) ? this.version : version
    const newCall = new CompositeSubrequestSObjectCollection(
      referenceId,
      version
    )

    this.calls.push(newCall)
    this.limits.totalCount += 1

    return newCall
  }

  /**
   * @description Convenience method for internally clearing previous calls, limits, etc.
   */
  clear (): void {
    this.calls = []
    this.limits.queryCount = 0
    this.limits.totalCount = 0
  }

  /**
   * @description Convenience method for integrating with JSforce.
   * @param {any} [connection] - Optionally pass a JSforce connection instance; used if not defined as part this class instance options.
   * @returns {Promise<CompositeCallResponse>} - The result of executing the composite call, or undefined if no JSforce connection was given.
   */
  async execute<T = any> (connection?: any): Promise<CompositeCallResponse<T>> {
    // eslint-disable-line @typescript-eslint/require-await
    if (!isNullOrUndefined(this.connection)) {
      return this.connection.requestPost(this.url, this.request)
    } else if (!isNullOrUndefined(connection)) {
      return connection.requestPost(this.url, this.request)
    }

    console.warn('No JSForce Connection object provided. Request cannot be executed.')
  }
}
