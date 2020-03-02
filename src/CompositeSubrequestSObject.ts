import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequest, CompositeSubrequestBody } from './CompositeSubrequest'

/**
 * @description Class for SObject Composite Subrequests.
 * @augments CompositeSubrequest
 * @param {string} sobject - A valid built-in or custom SObject name.
 * @param {string} [referenceId] - The reference ID of the query subrequest.
 * @param {string} [version] - The version of the Salesforce API to use.
 */
export class CompositeSubrequestSObject extends CompositeSubrequest {
  constructor (sobject: string, referenceId?: string, version?: string) {
    super(referenceId, version)
    this.sobject = sobject
  }

  sobject: any

  url (): string {
    return super.url() + `/sobjects/${this.sobject}`
  }

  delete (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestBody {
    this.obj = this.makeRequest(
      'DELETE',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : this.url(),
      body,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method to delete an SObject record.
   * @param {string} id - The ID of the SObject resource to destory.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  destroy (id: string, httpHeaders?: any): CompositeSubrequestBody {
    return this.delete(undefined, id, httpHeaders)
  }

  get (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestBody {
    this.obj = this.makeRequest(
      null,
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : this.url(),
      body,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method to describe an SObject type.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  describe (httpHeaders?: any): CompositeSubrequestBody {
    return this.get(undefined, 'describe', httpHeaders)
  }

  /**
   * @description Method to retrieve an SObject record.
   * @param {string} id - The ID of the SObject resource to retrieve.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  retrieve (id: string, httpHeaders?: any): CompositeSubrequestBody {
    return this.get(undefined, id, httpHeaders)
  }

  patch (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestBody {
    this.obj = this.makeRequest(
      'PATCH',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : this.url(),
      body,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method to update an SObject record.
   * @param {object} record - An object with valid fields for the SObject record.
   * @param {string} record.Id - The ID of the SObject resource to update.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  update (record: any, httpHeaders?: any): CompositeSubrequestBody {
    const id = record.Id

    delete record.Id

    return this.patch(record, id, httpHeaders)
  }

  post (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestBody {
    this.obj = this.makeRequest(
      'POST',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : this.url(),
      body,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method to create an SObject record.
   * @param {object} record - An object with valid fields for the SObject record; do not include an Id field.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  create (record: any, httpHeaders?: any): CompositeSubrequestBody {
    return this.post(record, null, httpHeaders)
  }

  /**
   * @description Synonym of `create()`.
   * @param {object} record - An object with valid fields for the SObject record; do not include an Id field.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   */
  insert (record: any, httpHeaders?: any): CompositeSubrequestBody {
    return this.create(record, httpHeaders)
  }

  put (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestBody {
    this.obj = this.makeRequest(
      'PUT',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : this.url(),
      body,
      httpHeaders
    )

    return this.obj
  }
}
