import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequest, CompositeSubrequestBody } from './CompositeSubrequest'

/**
 * @description Class for SObject Collection Composite Subrequests.
 * @augments CompositeSubrequest
 * @param {string} [referenceId] - The reference ID of the query subrequest.
 * @param {string} [version] - The version of the Salesforce API to use.
 */
export class CompositeSubrequestSObjectCollection extends CompositeSubrequest {
  url (): string {
    return super.url() + '/composite/sobjects'
  }

  /**
   * @description Method to delete a collection of SObjects.
   * @param {string[]} ids - An array of IDs to delete; limit is 200 records.
   * @param {boolean} [allOrNone=false] - **Optional.** Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many IDs specified for SObject Collection DELETE request; limit is 200, ${ids.length} were provided.
   */
  delete (ids: string[], allOrNone: boolean = false, httpHeaders?: any): CompositeSubrequestBody {
    if (ids.length > 200) {
      throw new Error(`Too many IDs specified for SObject Collection DELETE request; limit is 200, ${ids.length} were provided.`)
    }

    this.obj = this.makeRequest(
      'DELETE',
      this.url() + `?ids=${ids.join(',')}&allOrNone=${allOrNone}`,
      undefined,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method to delete a collection of SObjects.
   * @param {string | string[]} id - A single ID or an array of IDs to delete; limit is 200 records.
   * @param {boolean} [allOrNone=false] - **Optional.** Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many IDs specified for SObject Collection DELETE request; limit is 200, ${ids.length} were provided.
   */
  destroy (id: string | string[], allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestBody {
    const ids: string[] = Array.isArray(id) ? id : [id]

    return this.delete(ids, allOrNone, httpHeaders)
  }

  /**
   * @description Method to get a collection of SObjects.
   * @param {string} sobject - Name of the sobject(s) to get.
   * @param {string[]} ids - A single ID or an array of IDs to get; limit is 800 records.
   * @param {string[]} fields - The field names to retrieve for each sobject.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many IDs specified for SObject Collection GET request; limit is 800, ${ids.length} were provided.
   */
  get (sobject: string, ids: string[], fields: string[], httpHeaders?: any): CompositeSubrequestBody {
    if (ids.length > 800) {
      throw new Error(`Too many IDs specified for SObject Collection GET request; limit is 800, ${ids.length} were provided.`)
    }

    this.obj = this.makeRequest(
      null,
      this.url() + `/${sobject}?ids=${ids.join(',')}&fields=${fields.join(',')}`,
      undefined,
      httpHeaders
    )

    return this.obj
  }

  patch (records: any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestBody {
    if (records.length > 200) {
      throw new Error(`Too many records specified for PATCH request; limit is 200, ${records.length} were provided.`)
    }

    records = records.map((_record) => Object.assign({}, _record))

    if (isNullOrUndefined(sobject)) {
      const sobjects: string[] = records
        .map((val: any) => !isNullOrUndefined(val.attributes) ? (val.attributes.type as string) : '')
        .filter((val: string) => val !== '')

      if (sobjects.length !== records.length) {
        throw new Error('No SObject type provided for PATCH request.')
      }
    } else {
      records.forEach((val: any) => {
        if (isNullOrUndefined(val.attributes)) {
          val.attributes = {}
        }

        if (isNullOrUndefined(val.attributes.type)) {
          val.attributes.type = sobject
        }
      })
    }

    const body = {
      allOrNone,
      records
    }

    this.obj = this.makeRequest(
      'PATCH',
      this.url(),
      body,
      httpHeaders
    )

    return this.obj
  }

  /**
   * @description Method to update a collection of SObjects.
   * @param {object | object[]} record - The SObject records to update, limit is 200; ensure that all records have an Id field and object `attributes` with field `type` containing the SOBject name of the record.
   * @param {string} [sobject] - **Optional, if all records have a type.** A SObject name; used to add type information to any records missing `attributes.type`.
   * @param {boolean} [allOrNone] - **Optional.** Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many records specified for PATCH request; limit is 200, ${records.length} were provided.
   * @throws {Error} No SObject type provided for PATCH request.
   */
  update (record: any | any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestBody {
    const records: any[] = Array.isArray(record) ? record : [record]

    return this.patch(records, sobject, allOrNone, httpHeaders)
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
   * @description Method to get a collection of SObjects.
   * @param {string} sobject - Name of the sobject(s) to get.
   * @param {string | string[]} id - A single ID or an array of IDs to get; limit is 2000 records.
   * @param {string | string[]} field - The field name(s) to retrieve for each sobject.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many IDs specified for SObject Collection retrieve request; limit is 2000, ${id.length} were provided.
   */
  retrieve (sobject: string, id: string | string[], field: string | string[], httpHeaders?: any): CompositeSubrequestBody {
    const ids: string[] = Array.isArray(id) ? id : [id]
    const fields: string[] = Array.isArray(field) ? field : [field]
    const body = {
      ids,
      fields
    }

    if (ids.length > 2000) {
      throw new Error(`Too many IDs specified for SObject Collection retrieve request; limit is 2000, ${id.length} were provided.`)
    }

    return this.post(body, sobject, httpHeaders)
  }

  /**
   * @description Method to create a collection of SObjects.
   * @param {object | object[]} record - The SObject records to create, limit is 200; ensure that each record has object `attributes` with field `type` containing the SOBject name of the record and **NO** records have an Id field.
   * @param {string} [sobject] - **Optional, if all records have a type.** A SObject name; used to add type information to any records missing `attributes.type`.
   * @param {boolean} [allOrNone] - **Optional.** Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many records specified for create request; limit is 200, ${records.length} were provided.
   * @throws {Error} No SObject type provided for PATCH request.
   */
  create (record: any | any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestBody {
    let records: any[] = Array.isArray(record) ? record : [record]

    if (records.length > 200) {
      throw new Error(`Too many records specified for create request; limit is 200, ${records.length} were provided.`)
    }

    records = records.map((_record) => Object.assign({}, _record))

    if (isNullOrUndefined(sobject)) {
      const sobjects: string[] = records
        .map((val: any) => !isNullOrUndefined(val.attributes) ? (val.attributes.type as string) : '')
        .filter((val: string) => val !== '')

      if (sobjects.length !== records.length) {
        throw new Error('No SObject type provided for create request.')
      }
    } else {
      records.forEach((val: any) => {
        if (isNullOrUndefined(val.attributes)) {
          val.attributes = {}
        }

        if (isNullOrUndefined(val.attributes.type)) {
          val.attributes.type = sobject
        }
      })
    }

    const body = {
      allOrNone,
      records
    }

    return this.post(body, null, httpHeaders)
  }

  /**
   * @description Synonym of `create()`.
   * @param {object | object[]} record - The SObject records to create, limit is 200; ensure that each record has object `attributes` with field `type` containing the SOBject name of the record and **NO** records have an Id field.
   * @param {string} [sobject] - **Optional, if all records have a type.** A SObject name; used to add type information to any records missing `attributes.type`.
   * @param {boolean} [allOrNone] - **Optional.** Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.
   * @param {object} [httpHeaders] - **Optional.** Additional HTTP headers to include in the request.
   * @returns {CompositeSubrequestBody} - A subrequest object.
   * @throws {Error} Too many records specified for create request; limit is 200, ${records.length} were provided.
   * @throws {Error} No SObject type provided for PATCH request.
   */
  insert (record: any | any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestBody {
    return this.create(record, sobject, allOrNone, httpHeaders)
  }
}
