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

```js
const { Orshot } = require("orshot");
```

With `ES6`

```js
import { Orshot } from "orshot";
```

### Initialise

```js
const orshot = new Orshot("Your API key");
```

## renderFromStudioTemplate

Render from a custom [Studio template](https://orshot.com/features/orshot-studio). Supports image, PDF, video generation and publishing to social accounts.

### Generate Image

```js
const response = await orshot.renderFromStudioTemplate({
  templateId: 1234,
  modifications: {
    title: "Orshot Studio",
    description: "Generate images from custom templates",
  },
  response: { type: "url", format: "png", scale: 2 },
});
```

### Generate PDF

```js
const response = await orshot.renderFromStudioTemplate({
  templateId: 1234,
  modifications: { title: "Invoice #1234" },
  response: { type: "url", format: "pdf" },
  pdfOptions: {
    margin: "20px",
    rangeFrom: 1,
    rangeTo: 2,
    colorMode: "rgb",
    dpi: 300,
  },
});
```

### Generate Video

```js
const response = await orshot.renderFromStudioTemplate({
  templateId: 1234,
  modifications: {
    videoElement: "https://example.com/custom-video.mp4",
    "videoElement.trimStart": 0,
    "videoElement.trimEnd": 10,
  },
  response: { type: "url", format: "mp4" },
  videoOptions: {
    trimStart: 0,
    trimEnd: 20,
    muted: false,
    loop: true,
    fps: 30,
    audioSource: "https://example.com/audio.mp3",
  },
});
```

### Multi-page Video with Transitions

```js
const response = await orshot.renderFromStudioTemplate({
  templateId: 1234,
  response: { type: "url", format: "mp4" },
  videoOptions: {
    combinePages: true,
    pageTransition: "fade",
    pageTransitionDuration: 0.5,
  },
});
```

### Publish to Social Accounts

```js
const response = await orshot.renderFromStudioTemplate({
  templateId: 1234,
  modifications: { title: "Check out our latest update!" },
  response: { type: "url", format: "png" },
  publish: {
    accounts: [1, 2],
    content: "Check out our latest design!",
  },
});
// response.publish => [{ platform: "twitter", username: "acmehq", status: "published" }, ...]
```

### Schedule a Post

```js
const response = await orshot.renderFromStudioTemplate({
  templateId: 1234,
  modifications: { title: "Scheduled post" },
  response: { type: "url", format: "png" },
  publish: {
    accounts: [1],
    content: "This will be posted later!",
    schedule: { scheduledFor: "2026-04-01T10:00:00Z" },
    timezone: "America/New_York",
  },
});
```

### Parameters

| key                             | required | description                                                                              |
| ------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `templateId`                    | Yes      | ID of the Studio template.                                                               |
| `modifications`                 | No       | Object of dynamic modifications for the template.                                        |
| `response.type`                 | No       | `base64`, `binary`, `url` (Defaults to `url`).                                           |
| `response.format`               | No       | `png`, `webp`, `jpg`, `jpeg`, `avif`, `pdf`, `mp4`, `webm`, `gif` (Defaults to `png`).   |
| `response.scale`                | No       | Scale of the output (`1` = original, `2` = double). Defaults to `1`.                     |
| `response.quality`              | No       | Output quality (`1`-`100`). Controls compression for the rendered output.                 |
| `response.includePages`         | No       | Page numbers to render for multi-page templates (e.g. `[1, 3]`).                         |
| `response.fileName`             | No       | Custom file name (without extension). Works with `url` and `binary` types.               |
| `pdfOptions.margin`             | No       | CSS margin value (e.g. `"20px"`).                                                        |
| `pdfOptions.rangeFrom`          | No       | Start page number for PDF output.                                                        |
| `pdfOptions.rangeTo`            | No       | End page number for PDF output.                                                          |
| `pdfOptions.colorMode`          | No       | `rgb` or `cmyk`.                                                                         |
| `pdfOptions.dpi`                | No       | DPI for print quality (e.g. `300`).                                                      |
| `videoOptions.trimStart`        | No       | Trim start time in seconds.                                                              |
| `videoOptions.trimEnd`          | No       | Trim end time in seconds.                                                                |
| `videoOptions.muted`            | No       | Mute audio track.                                                                        |
| `videoOptions.loop`             | No       | Loop the video.                                                                          |
| `videoOptions.duration`         | No       | Total video duration in seconds.                                                         |
| `videoOptions.fps`              | No       | Frames per second (`1`-`30`).                                                            |
| `videoOptions.quality`          | No       | Video quality (`1`-`100`).                                                               |
| `videoOptions.audioSource`      | No       | External audio URL or array of per-page audio sources.                                   |
| `videoOptions.subtitleSource`   | No       | Subtitle file URL.                                                                       |
| `videoOptions.combinePages`     | No       | Combine multi-page templates into a single video.                                        |
| `videoOptions.pageTransition`   | No       | Transition effect between pages (e.g. `"fade"`, `"dissolve"`, `"wipe"`, `"slide"`).      |
| `videoOptions.pageTransitionDuration` | No | Transition duration in seconds (`0.1`-`2`).                                              |
| `publish.accounts`              | No       | Array of social account IDs from your workspace.                                         |
| `publish.content`               | No       | Caption/text for the social post.                                                        |
| `publish.isDraft`               | No       | `true` to save as draft instead of publishing.                                           |
| `publish.schedule.scheduledFor` | No       | ISO date string to schedule the post.                                                    |
| `publish.timezone`              | No       | Timezone string (e.g. `"America/New_York"`).                                             |
| `publish.platformOptions`       | No       | Per-account options keyed by account ID.                                                 |

---

## renderFromTemplate

Render from a pre-built Orshot template.

```js
const response = await orshot.renderFromTemplate({
  templateId: "open-graph-image-1",
  modifications: { title: "Hello World", description: "Description here" },
  responseType: "url",
  responseFormat: "png",
});
```

| key              | required | description                                                      |
| ---------------- | -------- | ---------------------------------------------------------------- |
| `templateId`     | Yes      | ID of the template (`open-graph-image-1`, `tweet-image-1`, etc.) |
| `modifications`  | Yes      | Modifications for the selected template.                         |
| `responseType`   | No       | `base64`, `binary`, `url` (Defaults to `url`).                   |
| `responseFormat` | No       | `png`, `webp`, `pdf`, `jpg`, `jpeg` (Defaults to `png`).         |

For available templates and their modifications refer [Orshot Templates Page](https://orshot.com/templates)

## generateSignedUrl

Generate a signed URL for a template.

```js
const response = await orshot.generateSignedUrl({
  templateId: "open-graph-image-1",
  modifications: { title: "Hello World" },
  expiresAt: 1744276943,
  renderType: "images",
  responseFormat: "png",
});
```

Use `"never"` for `expiresAt` to create a non-expiring signed URL.

| key              | required | description                                                        |
| ---------------- | -------- | ------------------------------------------------------------------ |
| `templateId`     | Yes      | ID of the template.                                                |
| `modifications`  | Yes      | Modifications for the selected template.                           |
| `expiresAt`      | Yes      | Unix timestamp (number) or `"never"` for no expiration.            |
| `renderType`     | No       | `images`, `pdfs`, `videos` (Defaults to `images`).                 |
| `responseFormat` | No       | `png`, `webp`, `pdf`, `jpg`, `jpeg` (Defaults to `png`).           |

## Error Handling

The SDK throws errors with descriptive messages from the API when a request fails.

```js
try {
  const response = await orshot.renderFromStudioTemplate({
    templateId: 1234,
    modifications: { title: "Hello" },
  });
} catch (error) {
  console.error(error.message);
  // e.g. "Template not found in workspace"
  // e.g. "Subscription inactive"
  // e.g. "Invalid API Key"
}
```

## TypeScript

All types are exported from the package:

```ts
import { Orshot } from "orshot";
import type { StudioRenderOptions, VideoOptions, PdfOptions, PublishOptions } from "orshot";
```

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
