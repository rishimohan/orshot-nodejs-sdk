export type ResponseType = "base64" | "binary" | "url";
export type ResponseFormat = "png" | "webp" | "pdf" | "jpg" | "jpeg" ;
export type RenderType = "images" | "pdfs";

export type TemplateRenderOptions = {
  templateId: string;
  modifications: any;
  responseType?: ResponseType;
  responseFormat?: ResponseFormat;
};

export type SignedUrlOptions = {
  templateId: string;
  modifications: any;
  renderType?: RenderType;
  responseFormat?: ResponseFormat;
  expiresAt: number;
};
