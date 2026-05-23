export type ResponseType = "base64" | "binary" | "url";
export type ResponseFormat = "png" | "webp" | "pdf" | "jpg" | "jpeg" | "avif" | "mp4" | "webm" | "gif";
export type RenderType = "images" | "pdfs" | "videos";

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
  expiresAt: number | "never";
};

export type StudioResponseOptions = {
  type?: ResponseType;
  format?: ResponseFormat;
  scale?: number;
  quality?: number;
  includePages?: number[];
  fileName?: string;
};

export type PdfOptions = {
  margin?: string;
  rangeFrom?: number | null;
  rangeTo?: number | null;
  colorMode?: "rgb" | "cmyk";
  dpi?: number;
};

export type VideoOptions = {
  trimStart?: number;
  trimEnd?: number;
  muted?: boolean;
  loop?: boolean;
  duration?: number;
  fps?: number;
  quality?: number;
  audioSource?: string | Array<{ url: string; pageId?: string; page?: number; track?: string }>;
  subtitleSource?: string;
  combinePages?: boolean;
  pageTransition?: string;
  pageTransitionDuration?: number;
};

export type PublishSchedule = {
  scheduledFor?: string;
};

export type PublishOptions = {
  accounts: number[];
  content?: string;
  isDraft?: boolean;
  schedule?: PublishSchedule;
  timezone?: string;
  platformOptions?: Record<string, any>;
};

export type StudioRenderOptions = {
  templateId: number | string;
  modifications?: Record<string, any>;
  response?: StudioResponseOptions;
  pdfOptions?: PdfOptions;
  videoOptions?: VideoOptions;
  publish?: PublishOptions;
};
