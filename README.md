# Salesforce Composite Call
A library for dealing with the Composite Call API in Salesforce. Integrates with the JSforce node module when available and passed as an option.

## Usage
Install it from the [npm repository](https://www.npmjs.com/package/sf-composite-call):
```console
npm install --save sf-composite-call
```

Then require it in your project:
```js
const escape = require('escape-html')
const { Connection } = require('jsforce')
const { CompositeCall } = require('sf-composite-call')
const util = require('util')
const getToken = util.promisify(
  require('salesforce-jwt-bearer-token-flow').getToken
)

async function main () {
  // Build an authenticated connection with Salesforce.
  // Note: Example uses JWT, but your jsforce connection may vary depending on your use case.
  const jwt = await getToken({
    iss: 'Replace this with your Client Id from Salesforce',
    sub: 'Replace this with your username from Salesforce',
    aud: 'https://login.salesforce.com',
    privateKey: 'Replace with your private pem certificate'
  })

  const conn = new Connection({
    instanceUrl: jwt.instance_url,
    accessToken: jwt.access_token
  })

  // Create the composite call.
  // Note: Order of operations matter when making composite calls.
  const compositeCall = new CompositeCall({
    allOrNone: true,
    jsforceConnection: conn
  })
  const account = compositeCall.addSObject('Account')
  const accountNote = compositeCall.addSObject('ContentNote')
  const accountNoteLink = compositeCall.addSObject('ContentDocumentLink')

  // Note: More fields may be required to create an account sObject in your Salesforce instance.
  account.create({
    Name: 'Some account name'
  })
  accountNote.create({
    Title: 'Some note title',
    Content: Buffer.from(escape('Here\'s some note content'), 'utf8').toString('base64')
  })

  // Note: Pay special attention to usage of references. In this example accountNote must be part of the same composite call otherwise an error is thrown.
  accountNoteLink.create({
    ContentDocumentId: `@{${accountNote.referenceId}.id}`,
    LinkedEntityId: `@{${account.referenceId}.id}`
  })

  // Execute the composite call.
  const result = await compositeCall.execute()
}

main()

```

The TypeScript code is compiled to JavaScript and distributed via NPM. If you wish to use the TypeScript code directly you can [download the zip](https://github.com/ahuggins-nhs/sf-composite-call/releases/latest) and unpack it locally.

Then import it in your project:
```typescript
import { CompositeCall } from './sf-composite-call/index.ts'
```

JSforce is not a required module. This library can be used to simply build out the requests so that another JavaScript API can make the actual POST operation using `fetch()` or `request` or whatever framework makes you happy.

## Options
The entire options object can be omitted when creating a new instance of `CompositeCall`.

|Option|Type|Description|
|:----:|----|-----------|
|**allOrNone**|*Boolean*|**Optional.** Used in the request to Salesforce. See their [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm)|
|**collateSubrequests**|*Boolean*|**Optional.** Used in the request to Salesforce. See their [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm)|
|**version**|*String*|**Optional** Sets the version of the Salesforce API to use for the Composite Call; defaults to `v48.0`.|
|**jsforceConnection**|*JSforce instance*|**Optional.** This connection enables the `execute()` method for convenience. Without it, the result of Composite Call will have to be passed to another method to post it to Salesforce.|


## Documentation
The API is fully documented [internally](/docs/API.md). Raw methods are available in most cases in the event that things like the url or the body of the message need to be manipulated further, or some operation is supported by Salesforce that is not directly implemented by this library.

Further documentation of Salesforce Composite Calls can be found at [their site](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite.htm). As much effort as possible has been taken to make this an implementation of their JSON request/response API in JavaScript.
