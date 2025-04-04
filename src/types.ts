export type ResponseType = "base64" | "binary" | "url";
export type ResponseFormat = "png" | "webp" | "pdf" | "jpg" | "jpeg" ;

export type TemplateRenderOptions = {
  templateId: string;
  modifications: any;
  responseType?: ResponseType;
  responseFormat?: ResponseFormat;
};
