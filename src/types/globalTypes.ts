export type ErrorType = Error & {
  statusCode?: number;
};

export type ImageUploadPayload = {
  base64: string | undefined;
  size: number | undefined;
  name: string | undefined;
  type: string | undefined;
};
