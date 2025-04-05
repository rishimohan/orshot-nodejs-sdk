# Orshot Node.js API SDK

View on npmjs: https://www.npmjs.com/package/orshot

## Installation

Using `npm`
```
npm install --save orshot
```

Using `yarn`
```
yarn add orshot
```

## Usage

If you don't have your API key, get one from [orshot.com](https://orshot.com)

### Import

```
const { Orshot } = require('orshot');
```

With `ES6`

```
import { Orshot } from "orshot";
```

### Initialise

```js
const orshot = new Orshot("Your API key");
```

### Generate image

```js
const response = await Orshot.renderFromTemplate({templateId, modifications, responseType: "base64", responseFormat: "png"});
console.log(response);
```

### Generate signed URL

```js
const response = await Orshot.generateSignedUrl({templateId, modifications, expiresAt: 1744276943, renderType: "images", responseFormat: "png"});
console.log(response);
```

## Example

### `Base64` response format

```js
import { Orshot } from "orshot";

const orshot = new Orshot("os-ha2jdus1cbz1dpt4mktgjyvx");

let templateId = "open-graph-image-1";
let modifications = {
  title: "Orshot",
  description: "Create Visuals and Automate Image Generation",
  textColor: "",
  backgroundImageUrl: "",
  backgroundColor: ""
}

const response = await orshot.renderFromTemplate({templateId, modifications, responseType: "base64", responseFormat: "png"});
console.log(response);
```

API Response
```
{
  data: {
    content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAJ2CAYAAABPQHtcAAAAAXNSR0IArs4c6QAAIABJREFUeJzs3XmYJXdZL/Bvna37dM90FghLCBAQkC1BCBAMShLFBJAgKnofroBeFUUF5LrhiihXcV8BQRYVUUAlIewIGPbFmLCFLWwCYZEtzPR+trp/TM/......',
    format: 'png',
    type: 'base64',
    responseTime: 3375.72
  }
}
```

### `URL` response format

```js
import { Orshot } from "orshot";

const orshot = new Orshot("os-ha2jdus1cbz1dpt4mktgjyvx");

let templateId = "open-graph-image-1";
let modifications = {
  title: "Orshot",
  description: "Create Visuals and Automate Image Generation",
  textColor: "",
  backgroundImageUrl: "",
  backgroundColor: ""
}

const response = await orshot.renderFromTemplate({templateId, modifications, responseType: "url", responseFormat: "png"});
console.log(response);
```

API Response
```
{
  data: {
    content: 'https://storage.orshot.com/10631481-fd26-44ff-9a61-f52cdf1b8e62/images/r1wCliKXC2B.png',
    type: 'url',
    format: 'png',
    responseTime: 3550.43
  }
}
```

### `Binary` response format

```js
import { Orshot } from "orshot";
import { createWriteStream } from 'fs';

const orshot = new Orshot("os-he2jdus1cbz1dpt4mktgjyvx");

let templateId = "open-graph-image-1";
let modifications = {
  title: "Orshot",
  description: "Create Visuals and Automate Image Generation",
  textColor: "",
  backgroundImageUrl: "",
  backgroundColor: ""
}

const response = await orshot.renderFromTemplate({templateId, modifications, responseType: "binary", responseFormat: "png"});
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

createWriteStream("og.png").write(buffer);
```

This example writes the binary image to the file `og.png` in the current directory.

### Signed URL

```js
import { Orshot } from "orshot";

const orshot = new Orshot("os-ha2jdus1cbz1dpt4mktgjyvx");

let templateId = "open-graph-image-1";
let modifications = {
  title: "Orshot",
  description: "Create Visuals and Automate Image Generation",
  textColor: "",
  backgroundImageUrl: "",
  backgroundColor: ""
}

const response = await Orshot.generateSignedUrl({templateId, modifications, expiresAt: 1744276943, renderType: "images", responseFormat: "png"});
console.log(response);
```

## renderFromTemplate

Use this function to render an image/pdf. Render template takes in 4 options passed as an object

```
{
  templateId,
  modifications,
  responseType,
  responseFormat
}
```

| key | required | description |
|----------|----------|-------------|
| `templateId` | Yes | ID of the template (`open-graph-image-1`, `tweet-image-1`, `beautify-screenshot-1`, ...) |
| `modifications` | Yes | Modifications for the selected template. |
| `responseType` | No | `base64`, `binary`, `url` (Defaults to `base64`). |
| `responseFormat` | No | `png`, `webp`, `pdf`, `jpg`, `jpeg` (Defaults to `png`). |

For available templates and their modifications refer [Orshot Templates Page](https://orshot.com/templates)

## generateSignedUrl

Use this function to generate signed URL.

```
{
  templateId,
  modifications,
  renderType,
  responseFormat,
  expiresAt
}
```

| key | required | description |
|----------|----------|-------------|
| `templateId` | Yes | ID of the template (`open-graph-image-1`, `tweet-image-1`, `beautify-screenshot-1`, ...) |
| `modifications` | Yes | Modifications for the selected template. |
| `expiresAt` | Yes | Expires at in unix timestamp (Number). |
| `renderType` | No | `images`, `pdfs` (Defaults to `images`). |
| `responseFormat` | No | `png`, `webp`, `pdf`, `jpg`, `jpeg` (Defaults to `png`). |


## Local development and testing

Run these from the project

`npm run build`

`npm link`

Create a test directory and add `index.js` file

Write simple code to generate an image from a template.

From the `test` directory, run `npm link orshot`

You can now run `node index.js` to test if the sdk code works as expected.

## Publish package to NPM

Create a new release from GitHub. This will trigger a GitHub action which will publish the package to NPM.
