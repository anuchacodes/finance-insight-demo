import { HttpError, type HttpClientOptions } from "@/lib/http/types";

const DEFAULT_BASE_URL = "https://api.frankfurter.dev/v2";

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL).replace(
    /\/$/,
    "",
  );
}

function buildUrl(path: string, params?: HttpClientOptions["params"]) {
  const url = new URL(`${getBaseUrl()}${path}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url;
}

export const httpClient = {
  async get<TResponse>(path: string, options?: HttpClientOptions) {
    const url = buildUrl(path, options?.params);
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new HttpError({
        message: response.statusText,
        status: response.status,
        url: url.toString(),
      });
    }

    return response.json() as Promise<TResponse>;
  },
};
