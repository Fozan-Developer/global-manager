# GlobalManager

GlobalManager is a Node.js library for managing global variables easily within your applications.

## Installation

To install GlobalManager, use npm (Node Package Manager):

```sh
npm install global-manager
```

## Usage

```js
const globalManager = require('global-manager');

// Set a global variable
globalManager.set('appName', 'MyApp');

// Retrieve the global variable
const appName = globalManager.get('appName');
console.log(appName); // Output: MyApp
```

## Documentation

For detailed usage instructions and API documentation, please visit [GlobalManager Documentation](https://fozan.gitbook.io/global-manager).

## License

This project is licensed under the ISC License - see the LICENSE file for details.
