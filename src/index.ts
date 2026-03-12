import { TemplateRenderOptions, SignedUrlOptions, StudioRenderOptions } from "./types";
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

  public async renderFromStudioTemplate(options: StudioRenderOptions) {
    const { templateId, modifications, response: responseOptions, pdfOptions, videoOptions, publish } = options;

    const endpoint = `${this.getBaseUrl()}/studio/render`;

    const body: Record<string, any> = {
      templateId,
      source: ORSHOT_SOURCE,
    };

    if (modifications) {
      body.modifications = modifications;
    }

    body.response = {
      type: responseOptions?.type ?? DEFAULT_RESPONSE_TYPE,
      format: responseOptions?.format ?? DEFAULT_RESPONSE_FORMAT,
    };

    if (responseOptions?.scale !== undefined) {
      body.response.scale = responseOptions.scale;
    }

    if (responseOptions?.includePages) {
      body.response.includePages = responseOptions.includePages;
    }

    if (responseOptions?.fileName) {
      body.response.fileName = responseOptions.fileName;
    }

    if (pdfOptions) {
      body.pdfOptions = pdfOptions;
    }

    if (videoOptions) {
      body.videoOptions = videoOptions;
    }

    if (publish) {
      body.publish = publish;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to render studio template: " + response.status);
    }

    const responseType = responseOptions?.type ?? DEFAULT_RESPONSE_TYPE;

    if (responseType === "base64" || responseType === "url") {
      const jsonData = await response.json();
      return jsonData;
    } else {
      return response;
    }
  }
}

export default Orshot;
