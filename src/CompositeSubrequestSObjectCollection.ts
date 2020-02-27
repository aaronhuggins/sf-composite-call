import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequest, CompositeSubrequestObject } from './CompositeSubrequest'

export class CompositeSubrequestSObjectCollection extends CompositeSubrequest {
  url (): string {
    return super.url() + '/composite/sobjects'
  }

  delete (ids: string[], allOrNone: boolean = false, httpHeaders?: any): CompositeSubrequestObject {
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

  destroy (id: string | string[], allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestObject {
    const ids: string[] = Array.isArray(id) ? id : [id]

    return this.delete(ids, allOrNone, httpHeaders)
  }

  get (sobject: string, ids: string[], fields: string[], httpHeaders?: any): CompositeSubrequestObject {
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

  patch (records: any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestObject {
    if (records.length > 200) {
      throw new Error(`Too many records specified for PATCH request; limit is 200, ${records.length} were provided.`)
    }

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

  update (record: any | any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestObject {
    const records: any[] = Array.isArray(record) ? record : [record]

    return this.patch(records, sobject, allOrNone, httpHeaders)
  }

  post (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestObject {
    this.obj = this.makeRequest(
      'POST',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : operation,
      body,
      httpHeaders
    )

    return this.obj
  }

  retrieve (sobject: string, id: string | string[], field: string | string[], httpHeaders?: any): CompositeSubrequestObject {
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

  create (record: any | any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestObject {
    const records: any[] = Array.isArray(record) ? record : [record]

    if (records.length > 200) {
      throw new Error(`Too many records specified for create request; limit is 200, ${records.length} were provided.`)
    }

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

  insert (record: any | any[], sobject?: string, allOrNone?: boolean, httpHeaders?: any): CompositeSubrequestObject {
    return this.create(record, sobject, allOrNone, httpHeaders)
  }
}
