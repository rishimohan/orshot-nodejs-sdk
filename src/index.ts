import { TemplateRenderOptions, SignedUrlOptions } from "./types";
import { DEFAULT_RESPONSE_TYPE, DEFAULT_RESPONSE_FORMAT, DEFAULT_RENDER_TYPE, ORSHOT_API_BASE_URL, ORSHOT_API_VERSION, ORSHOT_SOURCE } from "./constants";

export class Orshot {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API Key is required.")
    }
    this.apiKey = apiKey;
  }

  public getBaseUrl(version?: string) {
    const baseUrl = ORSHOT_API_BASE_URL;

    let apiVersion = ORSHOT_API_VERSION;

    if (version) {
      apiVersion = version;
    }

    return `${baseUrl}/${apiVersion}`;
  }

  public getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  public async renderFromTemplate(renderOptions: TemplateRenderOptions) {
    let { templateId, modifications, responseType, responseFormat } = renderOptions;

    if (!responseType) {
      responseType = DEFAULT_RESPONSE_TYPE;
    }

    if (!responseFormat) {
      responseFormat = DEFAULT_RESPONSE_FORMAT;
    }

    let endpoint = `${this.getBaseUrl()}/generate/images/${templateId}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        response: {
          type: responseType,
          format: responseFormat
        },
        modifications: modifications,
        source: ORSHOT_SOURCE
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image: " + response.status);
    }

    if (responseType === "base64" || responseType === "url") {
      const jsonData = await response.json();
      return jsonData;
    } else {
      return response;
    }
  }

  public async generateSignedUrl(signedUrlOptions: SignedUrlOptions) {
    let { templateId, modifications, renderType, responseFormat, expiresAt } = signedUrlOptions;

    if (!renderType) {
      renderType = DEFAULT_RENDER_TYPE;
    }

    if (!responseFormat) {
      responseFormat = DEFAULT_RESPONSE_FORMAT;
    }

    let endpoint = `${this.getBaseUrl()}/signed-url/create`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        templateId: templateId,
        renderType: renderType,
        responseFormat: responseFormat,
        modifications: modifications,
        source: ORSHOT_SOURCE,
        expiresAt: expiresAt
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image: " + response.status);
    }

    const jsonData = await response.json();
    return jsonData;
  }
}

export default Orshot;
