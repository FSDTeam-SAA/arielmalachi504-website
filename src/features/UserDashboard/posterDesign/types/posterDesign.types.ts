export interface IAiGenerateRequest {
  idea: string;
}

export interface IAiGenerateResponseData {
  success: boolean;
  generated_fields: string;
}

export interface IAiGenerateResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAiGenerateResponseData;
}

export interface IAiJobDetailsResponseData {
  status: string;
  data: {
    error: string;
    raw_output: string;
  };
}

export interface IAiJobDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAiJobDetailsResponseData;
}

export interface IParsedAiPosterFields {
  title: string;
  subtitle: string;
  design_style: string;
}

export interface IPosterInitiateRequest {
  title: string;
  title_font?: string;
  subtitle: string;
  subtitle_font?: string;
  tagline?: string;
  brand_name: string;
  primary_color: string;
  secondary_color: string;
  cta?: string;
  phone?: string;
  address?: string;
  website?: string;
  design_style_prompt?: string;
  style_preset?: string;
  output_format?: string;
  language?: string;
  variations?: number;
  image?: File | null;
}

export interface IPosterInitiateResponseData {
  generationId: string;
}

export interface IPosterInitiateResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPosterInitiateResponseData;
}

export interface IPosterResultData {
  success: boolean;
  resultUrls: string[];
  remainingCredits: number;
  message: string;
  statusCode: number;
}

export interface IPosterResultResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPosterResultData;
}
