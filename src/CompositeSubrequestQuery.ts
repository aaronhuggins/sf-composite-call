import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequest, CompositeSubrequestBody } from './CompositeSubrequest'

/**
 * @description Class for SOQL query and queryAll Composite Subrequests.
 * @augments CompositeSubrequest
 * @param {string} query - A SOQL query.
 * @param {string} [referenceId] - The reference ID of the query subrequest.
 * @param {string} [version] - The version of the Salesforce API to use.
 */
export class CompositeSubrequestQuery extends CompositeSubrequest {
  constructor (query: string, referenceId?: string, version?: string) {
    super(referenceId, version)
    this.soql = query
    this.verb = 'query'
  }

  soql: string
  verb: string

  url (): string {
    return super.url() + `/${this.verb}`
  }

  get subrequest (): CompositeSubrequestBody {
    if (isNullOrUndefined(this.obj)) {
      return this.get()
    }

    return this.obj
  }

  /**
   * @description Base request method for query operations.
   * @param {string} [queryId] - **Optional.** The word `explain` or the `nextRecordsUrl` of a query.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  get (queryId?: string, httpHeaders?: any): CompositeSubrequestBody {
    const soql = this.soql.replace(/\s/gu, '+')

    this.obj = this.makeRequest(
      null,
      isNullOrUndefined(queryId)
        ? this.url() + `?q=${soql}`
        : queryId.trim().toLowerCase() === 'explain'
          ? this.url() + `?explain=${soql}`
          : queryId,
      undefined,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method for creating an `explain` operation.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  explain (httpHeaders?: any): CompositeSubrequestBody {
    this.verb = 'query'

    return this.get('explain', httpHeaders)
  }

  /**
   * @description Method for creating an `explain` operation with queryAll.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  explainAll (httpHeaders?: any): CompositeSubrequestBody {
    this.verb = 'queryAll'

    return this.get('explain', httpHeaders)
  }

  /**
   * @description Method for creating an operation to obtain next records.
   * @param {string} nextRecordsUrl - The `nextRecordsUrl` of a query.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  nextRecords (nextRecordsUrl: string, httpHeaders?: any): CompositeSubrequestBody {
    this.verb = 'query'

    return this.get(nextRecordsUrl, httpHeaders)
  }

  /**
   * @description Method for creating an operation to obtain next records with queryAll.
   * @param {string} nextRecordsUrl - The `nextRecordsUrl` of a query.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  nextRecordsAll (nextRecordsUrl: string, httpHeaders?: any): CompositeSubrequestBody {
    this.verb = 'queryAll'

    return this.get(nextRecordsUrl, httpHeaders)
  }

  /**
   * @description Method for creating a `query` operation.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  query (httpHeaders?: any): CompositeSubrequestBody {
    this.verb = 'query'

    return this.get(null, httpHeaders)
  }

  /**
   * @description Method for creating a `query` operation with queryAll.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  queryAll (httpHeaders?: any): CompositeSubrequestBody {
    this.verb = 'queryAll'

    return this.get(null, httpHeaders)
  }
}
