# Salesforce Composite Call
A library for dealing the the Composiate Call API in Salesforce. Integrates with the JSforce node module when available and passed as an option.

## Usage
Install it from the [npm repository](https://www.npmjs.com/package/sf-composite-call):
```console
npm install --save sf-composite-call
```

Then require it in your project:
```js
const jsforce = require('jsforce')
const escape = require('escape-html')
const { CompositeCall } = require('sf-composite-call')

async main () {
  // Order of operations matters when making composite calls.
  const compositeCall = new CompositeCall({
    allOrNone: true,
    jsforceConnection: conn // Assuming an authenticated instance of JSforce named 'conn'.
  })
  const account = compositeReq.addSObject('Account')
  const accountNote = compositeReq.addSObject('ContentNote')
  const accountNoteLink = compositeReq.addSObject('ContentDocumentLink')

  account.create({
    // More fields may be required to create an account sObject in your Salesforce instance.
    Name: 'Some account name'
  })
  accountNote.create({
    Title: 'Some note title',
    Content: Buffer.from(escape('Here\'s some note content'), 'utf8').toString('base64')
  })
  accountNoteLink.create({
    ContentDocumentId: `@{${accountNote.referenceId}.id}`,
    LinkedEntityId: `@{${account.referenceId}.id}`
  })

  const result = await compositeCall.execute()
}

main()

```

The TypeScript code is compiled to JavaScript and distributed via NPM. If you wish to use the TypeScript code directly you can [download the zip](https://github.com/ahuggins-nhs/sf-composite-call/releases/latest) and unpack it locally.

Then import it in your project:
```typescript
import { CompositeCall } from './sf-composite-call/index.ts'
```

## Options
The entire options object can be omitted when creating a new instance of `CompositeCall`.

|Option|Type|Description|
|:----:|----|-----------|
|**allOrNone**|*Boolean*|**Optional.** Used in the request to Salesforce. See their [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm)|
|**collateSubrequests**|*Boolean*|**Optional.** Used in the request to Salesforce. See their [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite.htm)|
|**version**|*String*|**Optional** Sets the version of the Salesforce API to use for the Composite Call; defaults to `v48.0`.|
|**jsforceConnection**|*JSforce instance*|**Optional.** This connection enables the `execute()` method for convenience. Without it, the result of Composite Call will have to be passed to another method to post it to Salesforce.|


## Documentation
The API is fully documented [internally](/docs/API.md)
