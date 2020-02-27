import { isNullOrUndefined } from './Helpers'
import { CompositeSubrequest, CompositeSubrequestObject } from './CompositeSubrequest'

export class CompositeSubrequestSObject extends CompositeSubrequest {
  constructor (sobject: string, referenceId?: string, version?: string) {
    super(referenceId, version)
    this.sobject = sobject
  }

  sobject: any

  url (): string {
    return super.url() + `/sobjects/${this.sobject}`
  }

  delete (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestObject {
    this.obj = this.makeRequest(
      'DELETE',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : operation,
      body,
      httpHeaders
    )

    return this.obj
  }

  destroy (id: string, httpHeaders?: any): CompositeSubrequestObject {
    return this.delete(undefined, id, httpHeaders)
  }

  get (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestObject {
    this.obj = this.makeRequest(
      null,
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : operation,
      body,
      httpHeaders
    )

    return this.obj
  }

  describe (httpHeaders?: any): CompositeSubrequestObject {
    return this.get(undefined, 'describe', httpHeaders)
  }

  retrieve (id: string, httpHeaders?: any): CompositeSubrequestObject {
    return this.get(undefined, id, httpHeaders)
  }

  patch (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestObject {
    this.obj = this.makeRequest(
      'PATCH',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : operation,
      body,
      httpHeaders
    )

    return this.obj
  }

  update (record: any, httpHeaders?: any): CompositeSubrequestObject {
    const id = record.Id

    delete record.Id

    return this.patch(record, id, httpHeaders)
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

  create (record: any, httpHeaders?: any): CompositeSubrequestObject {
    return this.post(record, null, httpHeaders)
  }

  insert (record: any, httpHeaders?: any): CompositeSubrequestObject {
    return this.create(record, httpHeaders)
  }

  put (body?: any, operation?: string, httpHeaders?: any): CompositeSubrequestObject {
    this.obj = this.makeRequest(
      'PUT',
      !isNullOrUndefined(operation) ? this.url() + '/' + operation : operation,
      body,
      httpHeaders
    )

    return this.obj
  }
}
