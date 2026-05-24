export type HttpClientOptions = {
  params?: Record<string, string | number | boolean | null | undefined>;
};

export type HttpErrorPayload = {
  message?: string;
  status: number;
  url: string;
};

export class HttpError extends Error {
  payload: HttpErrorPayload;

  constructor(payload: HttpErrorPayload) {
    super(payload.message ?? `Request failed with status ${payload.status}`);
    this.name = "HttpError";
    this.payload = payload;
  }
}
