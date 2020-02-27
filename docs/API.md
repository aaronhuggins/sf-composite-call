## Classes

<dl>
<dt><a href="#CompositeCall">CompositeCall</a></dt>
<dd></dd>
<dt><a href="#CompositeSubrequest">CompositeSubrequest</a></dt>
<dd></dd>
<dt><a href="#CompositeSubrequestQuery">CompositeSubrequestQuery</a> ⇐ <code><a href="#CompositeSubrequest">CompositeSubrequest</a></code></dt>
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
    * [.addSObject(sobject, [referenceId], [version])](#CompositeCall+addSObject) ⇒ <code>CompositeSubrequestSObject</code>
    * [.addSObjectCollection([referenceId], [version])](#CompositeCall+addSObjectCollection) ⇒ <code>CompositeSubrequestSObjectCollection</code>
    * [.execute()](#CompositeCall+execute) ⇒ <code>Promise.&lt;any&gt;</code>

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

### compositeCall.addSObject(sobject, [referenceId], [version]) ⇒ <code>CompositeSubrequestSObject</code>
<p>Add a SObject subrequest instance to the composite request.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: <code>CompositeSubrequestSObject</code> - <ul>
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

### compositeCall.addSObjectCollection([referenceId], [version]) ⇒ <code>CompositeSubrequestSObjectCollection</code>
<p>Add a SObject Collection subrequest instance to the composite request.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: <code>CompositeSubrequestSObjectCollection</code> - <ul>
<li>An instance of <code>CompositeSubrequestSObjectCollection</code>.</li>
</ul>  
**Throws**:

- <code>Error</code> <p>Total request limit met. No more requests may be added.</p>


| Param | Type | Description |
| --- | --- | --- |
| [referenceId] | <code>string</code> | <p><strong>Optional.</strong> The reference ID of the SObject subrequest.</p> |
| [version] | <code>string</code> | <p><strong>Optional.</strong> The version of the Salesforce API to use. Must be less than or equal to the version defined for the Composite Call.</p> |

<a name="CompositeCall+execute"></a>

### compositeCall.execute() ⇒ <code>Promise.&lt;any&gt;</code>
<p>Convenience method for integrating with JSforce.</p>

**Kind**: instance method of [<code>CompositeCall</code>](#CompositeCall)  
**Returns**: <code>Promise.&lt;any&gt;</code> - <ul>
<li>The result of executing the composite call, or undefined if no JSforce connection option was given.</li>
</ul>  
<a name="CompositeSubrequest"></a>

## CompositeSubrequest
**Kind**: global class  

* [CompositeSubrequest](#CompositeSubrequest)
    * [new CompositeSubrequest([referenceId], [version])](#new_CompositeSubrequest_new)
    * [.subrequest](#CompositeSubrequest+subrequest)
    * [.makeRequest(method, url, body, httpHeaders)](#CompositeSubrequest+makeRequest) ⇒ <code>CompositeSubrequestObject</code>

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

### compositeSubrequest.makeRequest(method, url, body, httpHeaders) ⇒ <code>CompositeSubrequestObject</code>
<p>Base method for building the request.</p>

**Kind**: instance method of [<code>CompositeSubrequest</code>](#CompositeSubrequest)  
**Returns**: <code>CompositeSubrequestObject</code> - <p>A subrequest object.</p>  

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
    * [.makeRequest(method, url, body, httpHeaders)](#CompositeSubrequest+makeRequest) ⇒ <code>CompositeSubrequestObject</code>

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

<a name="CompositeSubrequest+makeRequest"></a>

### compositeSubrequestQuery.makeRequest(method, url, body, httpHeaders) ⇒ <code>CompositeSubrequestObject</code>
<p>Base method for building the request.</p>

**Kind**: instance method of [<code>CompositeSubrequestQuery</code>](#CompositeSubrequestQuery)  
**Overrides**: [<code>makeRequest</code>](#CompositeSubrequest+makeRequest)  
**Returns**: <code>CompositeSubrequestObject</code> - <p>A subrequest object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).</p> |
| url | <code>string</code> | <p>The resource to request.</p> |
| body | <code>any</code> | <p><strong>Optional.</strong> The input body for the subrequest.</p> |
| httpHeaders | <code>object</code> | <p><strong>Optional.</strong> Request headers and their values to include with the subrequest.</p> |

