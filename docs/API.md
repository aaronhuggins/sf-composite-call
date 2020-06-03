## Classes

<dl>
<dt><a href="#CompositeCall">CompositeCall</a></dt>
<dd></dd>
<dt><a href="#CompositeSubrequest">CompositeSubrequest</a></dt>
<dd></dd>
<dt><a href="#CompositeSubrequestQuery">CompositeSubrequestQuery</a> ⇐ <code><a href="#CompositeSubrequest">CompositeSubrequest</a></code></dt>
<dd></dd>
<dt><a href="#CompositeSubrequestSObject">CompositeSubrequestSObject</a> ⇐ <code><a href="#CompositeSubrequest">CompositeSubrequest</a></code></dt>
<dd></dd>
<dt><a href="#CompositeSubrequestSObjectCollection">CompositeSubrequestSObjectCollection</a> ⇐ <code><a href="#CompositeSubrequest">CompositeSubrequest</a></code></dt>
<dd></dd>
</dl>

<a name="CompositeCall"></a>

## CompositeCall
**Kind**: global class  

* [CompositeCall](#CompositeCall)
    * [new CompositeCall([options])](#new_CompositeCall_new)
    * [.url](#CompositeCall+url)
    * [.request](#CompositeCall+request)
    * [.addQuery(query, [referenceId], [version])](#CompositeCall+addQuery) ⇒ [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)
    * [.addSObject(sobject, [referenceId], [version])](#CompositeCall+addSObject) ⇒ [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)
    * [.addSObjectCollection([referenceId], [version])](#CompositeCall+addSObjectCollection) ⇒ [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)
    * [.clear()](#CompositeCall+clear)
    * [.execute()](#CompositeCall+execute) ⇒ <code>Promise.&lt;(void\|CompositeCallResponse)&gt;</code>

<a name="new_CompositeCall_new"></a>

### new CompositeCall([options])
<p>Main class for constructing a composite call. Tracks and enforces limits on query and request imposed by Salesforce API.</p>


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | <p><strong>Optional.</strong> Options for creating the instance.</p> |
| [options.version] | <code>string</code> | <p><strong>Optional.</strong> The version of Salesforce API to use.</p> |
| [options.allOrNone] | <code>boolean</code> | <p><strong>Optional.</strong> Used in the request to Salesforce. See their <a href="https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm">documentation</a>.</p> |
| [options.collateSubrequests] | <code>boolean</code> | <p><strong>Optional.</strong> Used in the request to Salesforce. See their <a href="https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm">documentation</a>.</p> |
| [options.jsforceConnection] | <code>object</code> | <p><strong>Optional.</strong> This connection enables the <code>execute()</code> method for convenience. Without it, the result of Composite Call will have to be passed to another method to post it to Salesforce.</p> |

<a name="CompositeCall+url"></a>

### compositeCall.url
**Kind**: instance property of [<code>CompositeCall</code>](#CompositeCall)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>The versioned url of the composite request.</p> |

<a name="CompositeCall+request"></a>

### compositeCall.request
**Kind**: instance property of [<code>CompositeCall</code>](#CompositeCall)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| request | <code>object</code> | <p>The result of constructing the composite call.</p> |
| [request.allOrNone] | <code>boolean</code> | <p><strong>Optional.</strong> Specifies what to do when an error occurs while processing a subrequest.</p> |
| [request.collateSubrequests] | <code>boolean</code> | <p><strong>Optional.</strong> Specifies what to do when an error occurs while processing a subrequest.</p> |
| request.CompositeSubrequest | <code>Array.&lt;object&gt;</code> | <p>Collection of subrequests to execute.</p> |

<a name="CompositeCall+addQuery"></a>

### compositeCall.addQuery(query, [referenceId], [version]) ⇒ [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)
<p>Add a query subrequest instance to the composite request.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery) - <ul>
<li>An instance of <code>CompositeSubrequestQuery</code>.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Query limit met. No more queries may be added.</p>
- <code>Error</code> <p>Total request limit met. No more requests may be added.</p>


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | <p>A SOQL query.</p> |
| [referenceId] | <code>string</code> | <p><strong>Optional.</strong> The reference ID of the query subrequest.</p> |
| [version] | <code>string</code> | <p><strong>Optional.</strong> The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.</p> |

<a name="CompositeCall+addSObject"></a>

### compositeCall.addSObject(sobject, [referenceId], [version]) ⇒ [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)
<p>Add a SObject subrequest instance to the composite request.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject) - <ul>
<li>An instance of <code>CompositeSubrequestSObject</code>.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Total request limit met. No more requests may be added.</p>


| Param | Type | Description |
| --- | --- | --- |
| sobject | <code>string</code> | <p>A SObject name; may be built-in or custom.</p> |
| [referenceId] | <code>string</code> | <p><strong>Optional.</strong> The reference ID of the SObject subrequest.</p> |
| [version] | <code>string</code> | <p><strong>Optional.</strong> The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.</p> |

<a name="CompositeCall+addSObjectCollection"></a>

### compositeCall.addSObjectCollection([referenceId], [version]) ⇒ [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)
<p>Add a SObject Collection subrequest instance to the composite request.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection) - <ul>
<li>An instance of <code>CompositeSubrequestSObjectCollection</code>.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Total request limit met. No more requests may be added.</p>


| Param | Type | Description |
| --- | --- | --- |
| [referenceId] | <code>string</code> | <p><strong>Optional.</strong> The reference ID of the SObject subrequest.</p> |
| [version] | <code>string</code> | <p><strong>Optional.</strong> The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.</p> |

<a name="CompositeCall+clear"></a>

### compositeCall.clear()
<p>Convenience method for internally clearing previous calls, limits, etc.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
<a name="CompositeCall+execute"></a>

### compositeCall.execute() ⇒ <code>Promise.&lt;(void\|CompositeCallResponse)&gt;</code>
<p>Convenience method for integrating with JSforce.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: <code>Promise.&lt;(void\|CompositeCallResponse)&gt;</code> - <ul>
<li>The result of executing the composite call, or undefined if no JSforce connection option was given.</li>
</ul>  
<a name="CompositeSubrequest"></a>

## CompositeSubrequest
**Kind**: global class  

* [CompositeSubrequest](#CompositeSubrequest)
    * [new CompositeSubrequest([referenceId], [version])](#new_CompositeSubrequest_new)
    * [.subrequest](#CompositeSubrequest+subrequest)
    * [.makeRequest(method, url, body, httpHeaders)](#CompositeSubrequest+makeRequest) ⇒ <code>CompositeSubrequestBody</code>

<a name="new_CompositeSubrequest_new"></a>

### new CompositeSubrequest([referenceId], [version])
<p>Base class for Composite Subrequests.</p>


| Param | Type | Description |
| --- | --- | --- |
| [referenceId] | <code>string</code> | <p>The reference ID of the query subrequest.</p> |
| [version] | <code>string</code> | <p>The version of the Salesforce API to use.</p> |

<a name="CompositeSubrequest+subrequest"></a>

### compositeSubrequest.subrequest
**Kind**: instance property of [<code>CompositeSubrequest</code>](#CompositeSubrequest)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subrequest | <code>object</code> | <p>The result of constructing the composite call.</p> |
| [subrequest.body] | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| [subrequest.httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |
| subrequest.method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| subrequest.referenceId | <code>string</code> | <p>Reference ID that maps to the subrequest’s response and can be used to reference the response in later subrequests.</p> |
| subrequest.url | <code>string</code> | <p>The resource to request.</p> |

<a name="CompositeSubrequest+makeRequest"></a>

### compositeSubrequest.makeRequest(method, url, body, httpHeaders) ⇒ <code>CompositeSubrequestBody</code>
<p>Base method for building the request.</p>

**Kind**: instance method of [<code>CompositeSubrequest</code>](#CompositeSubrequest)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| url | <code>string</code> | <p>The resource to request.</p> |
| body | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| httpHeaders | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |

<a name="CompositeSubrequestQuery"></a>

## CompositeSubrequestQuery ⇐ [<code>CompositeSubrequest</code>](#CompositeSubrequest)
**Kind**: global class  
**Extends**: [<code>CompositeSubrequest</code>](#CompositeSubrequest)  

* [CompositeSubrequestQuery](#CompositeSubrequestQuery) ⇐ [<code>CompositeSubrequest</code>](#CompositeSubrequest)
    * [new CompositeSubrequestQuery(query, [referenceId], [version])](#new_CompositeSubrequestQuery_new)
    * [.subrequest](#CompositeSubrequest+subrequest)
    * [.get([queryId], [httpHeaders])](#CompositeSubrequestQuery+get) ⇒ <code>CompositeSubrequestBody</code>
    * [.explain([httpHeaders])](#CompositeSubrequestQuery+explain) ⇒ <code>CompositeSubrequestBody</code>
    * [.explainAll([httpHeaders])](#CompositeSubrequestQuery+explainAll) ⇒ <code>CompositeSubrequestBody</code>
    * [.nextRecords(nextRecordsUrl, [httpHeaders])](#CompositeSubrequestQuery+nextRecords) ⇒ <code>CompositeSubrequestBody</code>
    * [.nextRecordsAll(nextRecordsUrl, [httpHeaders])](#CompositeSubrequestQuery+nextRecordsAll) ⇒ <code>CompositeSubrequestBody</code>
    * [.query([httpHeaders])](#CompositeSubrequestQuery+query) ⇒ <code>CompositeSubrequestBody</code>
    * [.queryAll([httpHeaders])](#CompositeSubrequestQuery+queryAll) ⇒ <code>CompositeSubrequestBody</code>
    * [.makeRequest(method, url, body, httpHeaders)](#CompositeSubrequest+makeRequest) ⇒ <code>CompositeSubrequestBody</code>

<a name="new_CompositeSubrequestQuery_new"></a>

### new CompositeSubrequestQuery(query, [referenceId], [version])
<p>Class for SOQL query and queryAll Composite Subrequests.</p>


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | <p>A SOQL query.</p> |
| [referenceId] | <code>string</code> | <p>The reference ID of the query subrequest.</p> |
| [version] | <code>string</code> | <p>The version of the Salesforce API to use.</p> |

<a name="CompositeSubrequest+subrequest"></a>

### compositeSubrequestQuery.subrequest
**Kind**: instance property of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Overrides**: [<code>subrequest</code>](#CompositeSubrequest+subrequest)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subrequest | <code>object</code> | <p>The result of constructing the composite call.</p> |
| [subrequest.body] | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| [subrequest.httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |
| subrequest.method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| subrequest.referenceId | <code>string</code> | <p>Reference ID that maps to the subrequest’s response and can be used to reference the response in later subrequests.</p> |
| subrequest.url | <code>string</code> | <p>The resource to request.</p> |

<a name="CompositeSubrequestQuery+get"></a>

### compositeSubrequestQuery.get([queryId], [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Base request method for query operations.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| [queryId] | <code>string</code> | <p><strong>Optional.</strong> The word <code>explain</code> or the <code>nextRecordsUrl</code> of a query.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestQuery+explain"></a>

### compositeSubrequestQuery.explain([httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method for creating an <code>explain</code> operation.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestQuery+explainAll"></a>

### compositeSubrequestQuery.explainAll([httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method for creating an <code>explain</code> operation with queryAll.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestQuery+nextRecords"></a>

### compositeSubrequestQuery.nextRecords(nextRecordsUrl, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method for creating an operation to obtain next records.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| nextRecordsUrl | <code>string</code> | <p>The <code>nextRecordsUrl</code> of a query.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestQuery+nextRecordsAll"></a>

### compositeSubrequestQuery.nextRecordsAll(nextRecordsUrl, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method for creating an operation to obtain next records with queryAll.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| nextRecordsUrl | <code>string</code> | <p>The <code>nextRecordsUrl</code> of a query.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestQuery+query"></a>

### compositeSubrequestQuery.query([httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method for creating a <code>query</code> operation.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestQuery+queryAll"></a>

### compositeSubrequestQuery.queryAll([httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method for creating a <code>query</code> operation with queryAll.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequest+makeRequest"></a>

### compositeSubrequestQuery.makeRequest(method, url, body, httpHeaders) ⇒ <code>CompositeSubrequestBody</code>
<p>Base method for building the request.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Overrides**: [<code>makeRequest</code>](#CompositeSubrequest+makeRequest)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| url | <code>string</code> | <p>The resource to request.</p> |
| body | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| httpHeaders | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |

<a name="CompositeSubrequestSObject"></a>

## CompositeSubrequestSObject ⇐ [<code>CompositeSubrequest</code>](#CompositeSubrequest)
**Kind**: global class  
**Extends**: [<code>CompositeSubrequest</code>](#CompositeSubrequest)  

* [CompositeSubrequestSObject](#CompositeSubrequestSObject) ⇐ [<code>CompositeSubrequest</code>](#CompositeSubrequest)
    * [new CompositeSubrequestSObject(sobject, [referenceId], [version])](#new_CompositeSubrequestSObject_new)
    * [.subrequest](#CompositeSubrequest+subrequest)
    * [.destroy(id, [httpHeaders])](#CompositeSubrequestSObject+destroy) ⇒ <code>CompositeSubrequestBody</code>
    * [.describe([httpHeaders])](#CompositeSubrequestSObject+describe) ⇒ <code>CompositeSubrequestBody</code>
    * [.retrieve(id, [httpHeaders])](#CompositeSubrequestSObject+retrieve) ⇒ <code>CompositeSubrequestBody</code>
    * [.update(record, [httpHeaders])](#CompositeSubrequestSObject+update) ⇒ <code>CompositeSubrequestBody</code>
    * [.create(record, [httpHeaders])](#CompositeSubrequestSObject+create) ⇒ <code>CompositeSubrequestBody</code>
    * [.insert(record, [httpHeaders])](#CompositeSubrequestSObject+insert) ⇒ <code>CompositeSubrequestBody</code>
    * [.makeRequest(method, url, body, httpHeaders)](#CompositeSubrequest+makeRequest) ⇒ <code>CompositeSubrequestBody</code>

<a name="new_CompositeSubrequestSObject_new"></a>

### new CompositeSubrequestSObject(sobject, [referenceId], [version])
<p>Class for SObject Composite Subrequests.</p>


| Param | Type | Description |
| --- | --- | --- |
| sobject | <code>string</code> | <p>A valid built-in or custom SObject name.</p> |
| [referenceId] | <code>string</code> | <p>The reference ID of the query subrequest.</p> |
| [version] | <code>string</code> | <p>The version of the Salesforce API to use.</p> |

<a name="CompositeSubrequest+subrequest"></a>

### compositeSubrequestSObject.subrequest
**Kind**: instance property of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Overrides**: [<code>subrequest</code>](#CompositeSubrequest+subrequest)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subrequest | <code>object</code> | <p>The result of constructing the composite call.</p> |
| [subrequest.body] | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| [subrequest.httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |
| subrequest.method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| subrequest.referenceId | <code>string</code> | <p>Reference ID that maps to the subrequest’s response and can be used to reference the response in later subrequests.</p> |
| subrequest.url | <code>string</code> | <p>The resource to request.</p> |

<a name="CompositeSubrequestSObject+destroy"></a>

### compositeSubrequestSObject.destroy(id, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to delete an SObject record.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>The ID of the SObject resource to destory.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObject+describe"></a>

### compositeSubrequestSObject.describe([httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to describe an SObject type.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObject+retrieve"></a>

### compositeSubrequestSObject.retrieve(id, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to retrieve an SObject record.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>The ID of the SObject resource to retrieve.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObject+update"></a>

### compositeSubrequestSObject.update(record, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to update an SObject record.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>object</code> | <p>An object with valid fields for the SObject record.</p> |
| record.Id | <code>string</code> | <p>The ID of the SObject resource to update.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObject+create"></a>

### compositeSubrequestSObject.create(record, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to create an SObject record.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>object</code> | <p>An object with valid fields for the SObject record; do not include an Id field.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObject+insert"></a>

### compositeSubrequestSObject.insert(record, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Synonym of <code>create()</code>.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>object</code> | <p>An object with valid fields for the SObject record; do not include an Id field.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequest+makeRequest"></a>

### compositeSubrequestSObject.makeRequest(method, url, body, httpHeaders) ⇒ <code>CompositeSubrequestBody</code>
<p>Base method for building the request.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObject</code>](#CompositeSubrequestSObject)  
**Overrides**: [<code>makeRequest</code>](#CompositeSubrequest+makeRequest)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| url | <code>string</code> | <p>The resource to request.</p> |
| body | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| httpHeaders | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |

<a name="CompositeSubrequestSObjectCollection"></a>

## CompositeSubrequestSObjectCollection ⇐ [<code>CompositeSubrequest</code>](#CompositeSubrequest)
**Kind**: global class  
**Extends**: [<code>CompositeSubrequest</code>](#CompositeSubrequest)  

* [CompositeSubrequestSObjectCollection](#CompositeSubrequestSObjectCollection) ⇐ [<code>CompositeSubrequest</code>](#CompositeSubrequest)
    * [new CompositeSubrequestSObjectCollection([referenceId], [version])](#new_CompositeSubrequestSObjectCollection_new)
    * [.subrequest](#CompositeSubrequest+subrequest)
    * [.delete(ids, [allOrNone], [httpHeaders])](#CompositeSubrequestSObjectCollection+delete) ⇒ <code>CompositeSubrequestBody</code>
    * [.destroy(id, [allOrNone], [httpHeaders])](#CompositeSubrequestSObjectCollection+destroy) ⇒ <code>CompositeSubrequestBody</code>
    * [.get(sobject, ids, fields, [httpHeaders])](#CompositeSubrequestSObjectCollection+get) ⇒ <code>CompositeSubrequestBody</code>
    * [.update(record, [sobject], [allOrNone], [httpHeaders])](#CompositeSubrequestSObjectCollection+update) ⇒ <code>CompositeSubrequestBody</code>
    * [.retrieve(sobject, id, field, [httpHeaders])](#CompositeSubrequestSObjectCollection+retrieve) ⇒ <code>CompositeSubrequestBody</code>
    * [.create(record, [sobject], [allOrNone], [httpHeaders])](#CompositeSubrequestSObjectCollection+create) ⇒ <code>CompositeSubrequestBody</code>
    * [.insert(record, [sobject], [allOrNone], [httpHeaders])](#CompositeSubrequestSObjectCollection+insert) ⇒ <code>CompositeSubrequestBody</code>
    * [.makeRequest(method, url, body, httpHeaders)](#CompositeSubrequest+makeRequest) ⇒ <code>CompositeSubrequestBody</code>

<a name="new_CompositeSubrequestSObjectCollection_new"></a>

### new CompositeSubrequestSObjectCollection([referenceId], [version])
<p>Class for SObject Collection Composite Subrequests.</p>


| Param | Type | Description |
| --- | --- | --- |
| [referenceId] | <code>string</code> | <p>The reference ID of the query subrequest.</p> |
| [version] | <code>string</code> | <p>The version of the Salesforce API to use.</p> |

<a name="CompositeSubrequest+subrequest"></a>

### compositeSubrequestSObjectCollection.subrequest
**Kind**: instance property of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subrequest | <code>object</code> | <p>The result of constructing the composite call.</p> |
| [subrequest.body] | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| [subrequest.httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |
| subrequest.method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| subrequest.referenceId | <code>string</code> | <p>Reference ID that maps to the subrequest’s response and can be used to reference the response in later subrequests.</p> |
| subrequest.url | <code>string</code> | <p>The resource to request.</p> |

<a name="CompositeSubrequestSObjectCollection+delete"></a>

### compositeSubrequestSObjectCollection.delete(ids, [allOrNone], [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to delete a collection of SObjects.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many IDs specified for SObject Collection DELETE request; limit is 200, ${ids.length} were provided.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ids | <code>Array.&lt;string&gt;</code> |  | <p>An array of IDs to delete; limit is 200 records.</p> |
| [allOrNone] | <code>boolean</code> | <code>false</code> | <p><strong>Optional.</strong> Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.</p> |
| [httpHeaders] | <code>object</code> |  | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObjectCollection+destroy"></a>

### compositeSubrequestSObjectCollection.destroy(id, [allOrNone], [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to delete a collection of SObjects.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many IDs specified for SObject Collection DELETE request; limit is 200, ${ids.length} were provided.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | <p>A single ID or an array of IDs to delete; limit is 200 records.</p> |
| [allOrNone] | <code>boolean</code> | <code>false</code> | <p><strong>Optional.</strong> Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.</p> |
| [httpHeaders] | <code>object</code> |  | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObjectCollection+get"></a>

### compositeSubrequestSObjectCollection.get(sobject, ids, fields, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to get a collection of SObjects.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many IDs specified for SObject Collection GET request; limit is 800, ${ids.length} were provided.</p>


| Param | Type | Description |
| --- | --- | --- |
| sobject | <code>string</code> | <p>Name of the sobject(s) to get.</p> |
| ids | <code>Array.&lt;string&gt;</code> | <p>A single ID or an array of IDs to get; limit is 800 records.</p> |
| fields | <code>Array.&lt;string&gt;</code> | <p>The field names to retrieve for each sobject.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObjectCollection+update"></a>

### compositeSubrequestSObjectCollection.update(record, [sobject], [allOrNone], [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to update a collection of SObjects.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many records specified for PATCH request; limit is 200, ${records.length} were provided.</p>
- <code>Error</code> <p>No SObject type provided for PATCH request.</p>


| Param | Type | Description |
| --- | --- | --- |
| record | <code>object</code> \| <code>Array.&lt;object&gt;</code> | <p>The SObject records to update, limit is 200; ensure that all records have an Id field and object <code>attributes</code> with field <code>type</code> containing the SOBject name of the record.</p> |
| [sobject] | <code>string</code> | <p><strong>Optional, if all records have a type.</strong> A SObject name; used to add type information to any records missing <code>attributes.type</code>.</p> |
| [allOrNone] | <code>boolean</code> | <p><strong>Optional.</strong> Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObjectCollection+retrieve"></a>

### compositeSubrequestSObjectCollection.retrieve(sobject, id, field, [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to get a collection of SObjects.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many IDs specified for SObject Collection retrieve request; limit is 2000, ${id.length} were provided.</p>


| Param | Type | Description |
| --- | --- | --- |
| sobject | <code>string</code> | <p>Name of the sobject(s) to get.</p> |
| id | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>A single ID or an array of IDs to get; limit is 2000 records.</p> |
| field | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>The field name(s) to retrieve for each sobject.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObjectCollection+create"></a>

### compositeSubrequestSObjectCollection.create(record, [sobject], [allOrNone], [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Method to create a collection of SObjects.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many records specified for create request; limit is 200, ${records.length} were provided.</p>
- <code>Error</code> <p>No SObject type provided for PATCH request.</p>


| Param | Type | Description |
| --- | --- | --- |
| record | <code>object</code> \| <code>Array.&lt;object&gt;</code> | <p>The SObject records to create, limit is 200; ensure that each record has object <code>attributes</code> with field <code>type</code> containing the SOBject name of the record and <strong>NO</strong> records have an Id field.</p> |
| [sobject] | <code>string</code> | <p><strong>Optional, if all records have a type.</strong> A SObject name; used to add type information to any records missing <code>attributes.type</code>.</p> |
| [allOrNone] | <code>boolean</code> | <p><strong>Optional.</strong> Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequestSObjectCollection+insert"></a>

### compositeSubrequestSObjectCollection.insert(record, [sobject], [allOrNone], [httpHeaders]) ⇒ <code>CompositeSubrequestBody</code>
<p>Synonym of <code>create()</code>.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Too many records specified for create request; limit is 200, ${records.length} were provided.</p>
- <code>Error</code> <p>No SObject type provided for PATCH request.</p>


| Param | Type | Description |
| --- | --- | --- |
| record | <code>object</code> \| <code>Array.&lt;object&gt;</code> | <p>The SObject records to create, limit is 200; ensure that each record has object <code>attributes</code> with field <code>type</code> containing the SOBject name of the record and <strong>NO</strong> records have an Id field.</p> |
| [sobject] | <code>string</code> | <p><strong>Optional, if all records have a type.</strong> A SObject name; used to add type information to any records missing <code>attributes.type</code>.</p> |
| [allOrNone] | <code>boolean</code> | <p><strong>Optional.</strong> Indicates whether to roll back the entire request when the deletion of any object fails (true) or to continue with the independent deletion of other objects in the request. The default is false.</p> |
| [httpHeaders] | <code>object</code> | <p><strong>Optional.</strong> Additional HTTP headers to include in the request.</p> |

<a name="CompositeSubrequest+makeRequest"></a>

### compositeSubrequestSObjectCollection.makeRequest(method, url, body, httpHeaders) ⇒ <code>CompositeSubrequestBody</code>
<p>Base method for building the request.</p>

**Kind**: instance method of [<code>CompositeSubrequestSObjectCollection</code>](#CompositeSubrequestSObjectCollection)  
**Returns**: <code>CompositeSubrequestBody</code> - <ul>
<li>A subrequest object.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| url | <code>string</code> | <p>The resource to request.</p> |
| body | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| httpHeaders | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |

