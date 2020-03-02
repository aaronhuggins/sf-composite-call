import { v4 as uuidv4 } from 'uuid'
import { isNullOrUndefined } from './Helpers'

/**
 * @description Base class for Composite Subrequests.
 * @param {string} [referenceId] - The reference ID of the query subrequest.
 * @param {string} [version] - The version of the Salesforce API to use.
 */
export class CompositeSubrequest {
  constructor (referenceId?: string, version?: string) {
    this.version = this.versionRX.test(version) ? version : 'v48.0'
    this.referenceId = isNullOrUndefined(referenceId) ? uuidv4().replace(/-/gu, '') : referenceId
  }

  version: string
  referenceId: string
  obj: CompositeSubrequestBody

  get versionRX (): RegExp {
    return /v\d\d\.\d/gu
  }

  /**
   * @property {object} subrequest - The result of constructing the composite call.
   * @property {any} [subrequest.body] - **Optional.** The input body for the subrequest.
   * @property {object} [subrequest.httpHeaders] - **Optional.** Request headers and their values to include with the subrequest.
   * @property {string} subrequest.method - The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).
   * @property {string} subrequest.referenceId - Reference ID that maps to the subrequest’s response and can be used to reference the response in later subrequests.
   * @property {string} subrequest.url - The resource to request.
   */

  get subrequest (): CompositeSubrequestBody {
    if (isNullOrUndefined(this.obj)) {
      return this.makeRequest()
    }

    return this.obj
  }

  url (): string {
    return `/services/data/${this.version}`
  }

  /**
   * @description Base method for building the request.
   * @param {string} method - The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).
   * @param {string} url - The resource to request.
   * @param {any} body - **Optional.** The input body for the subrequest.
   * @param {object} httpHeaders - **Optional.** Request headers and their values to include with the subrequest.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  makeRequest (method?: CompositeSubrequestMethods, url?: string, body?: any, httpHeaders?: any): CompositeSubrequestBody {
    method = isNullOrUndefined(method) ? 'GET' : method
    url = isNullOrUndefined(url) ? this.url() : url

    return {
      method,
      url,
      body,
      httpHeaders,
      referenceId: this.referenceId
    }
  }
}

type CompositeSubrequestMethods = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export interface CompositeSubrequestBody {
  method: CompositeSubrequestMethods
  url: string
  referenceId: string
  body?: string | object | any
  httpHeaders?: {
    [header: string]: string
  }
}
