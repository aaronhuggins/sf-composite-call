import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequest, CompositeSubrequestObject } from './CompositeSubrequest'

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

  get subrequest (): CompositeSubrequestObject {
    if (isNullOrUndefined(this.obj)) {
      return this.get()
    }

    return this.obj
  }

  get (queryId?: string, httpHeaders?: any): CompositeSubrequestObject {
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

  explain (httpHeaders?: any): CompositeSubrequestObject {
    this.verb = 'query'

    return this.get('explain', httpHeaders)
  }

  explainAll (httpHeaders?: any): CompositeSubrequestObject {
    this.verb = 'queryAll'

    return this.get('explain', httpHeaders)
  }

  nextRecords (nextRecordsUrl: string, httpHeaders?: any): CompositeSubrequestObject {
    this.verb = 'query'

    return this.get(nextRecordsUrl, httpHeaders)
  }

  nextRecordsAll (nextRecordsUrl: string, httpHeaders?: any): CompositeSubrequestObject {
    this.verb = 'queryAll'

    return this.get(nextRecordsUrl, httpHeaders)
  }

  query (httpHeaders?: any): CompositeSubrequestObject {
    this.verb = 'query'

    return this.get(null, httpHeaders)
  }

  queryAll (httpHeaders?: any): CompositeSubrequestObject {
    this.verb = 'queryAll'

    return this.get(null, httpHeaders)
  }
}
