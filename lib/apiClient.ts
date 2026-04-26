import { logger } from "./logger";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
};

export async function apiRequest(url: string, opts: RequestOptions = {}): Promise<any> {
  const { method = "GET", headers = {}, body, timeoutMs = 10_000, retries = 3, retryDelayMs = 500 } = opts;
  const reqId = Math.random().toString(36).slice(2);
  const log = logger.child({ reqId, url, method });

  let attempt = 0;
  let lastError: any = null;

  while (attempt < retries) {
    attempt++;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      log.info({ attempt }, "starting request");
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) {
        const err: any = new Error(`HTTP ${response.status} – ${response.statusText}`);
        err.status = response.status;
        throw err;
      }
      log.info({ status: response.status }, "request succeeded");
      return data;
    } catch (err: any) {
      clearTimeout(timeout);
      lastError = err;
      log.error({ attempt, error: err.message }, "request failed");
      if (attempt >= retries) break;
      await new Promise((res) => setTimeout(res, retryDelayMs * 2 ** (attempt - 1)));
    }
  }
  throw lastError;
}
