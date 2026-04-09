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
