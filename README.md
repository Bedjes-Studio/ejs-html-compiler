A utility module module that converts ejs template to static html files.

## Installation

```bash
$ npm install ejs
```

## Features

-   Select source and destination folder
-   Compile multiple files recursively
-   Preserve source file architecture
-   Automatically resolve partial template inclusions
-   Custom rendering with EJS options

## Usage

Simply import the module and specify the source and destination folders. The source folder contains your page templates. Static files will be generated in the destination folder. You can also specify options for EJS renderer (see ejs documentation).

WARNING : If your partial template are in the same folder, they will also be compiled.

```js
const compiler = require('ejs-html-compiler');

compiler.build(/*source folder*/, /*destination folder*/);
compiler.build(/*source folder*/, /*destination folder*/, /*options*/);
```

## License

Under Apache 2.0 license.

