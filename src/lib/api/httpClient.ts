export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type HttpClientOptions = {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
  timeoutMs?: number
}

export class HttpError extends Error {
  status: number
  data: unknown
  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.data = data
  }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function resolveUrl(input: string): string {
  if (/^https?:\/\//i.test(input) || !BASE_URL) return input
  return new URL(input, BASE_URL).toString()
}

export async function request<T>(input: string, opts: HttpClientOptions = {}): Promise<T> {
  const { method = 'GET', headers, body, signal, timeoutMs = 15000 } = opts
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort('timeout'), timeoutMs)
  if (signal) {
    if (signal.aborted) controller.abort(signal.reason)
    else signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true })
  }

  const init: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      ...(body != null ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    signal: controller.signal,
    body: body != null ? JSON.stringify(body) : undefined,
  }

  let res: Response
  try {
    res = await fetch(resolveUrl(input), init)
  } catch (err) {
    clearTimeout(timer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((err as any)?.name === 'AbortError') throw new HttpError('Request aborted', 0, null)
    throw new HttpError('Network error', 0, null)
  }
  clearTimeout(timer)

  let data: unknown
  const text = await res.text()
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!res.ok) {
    const message =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (data as any)?.message === 'string' ? (data as any).message : res.statusText
    throw new HttpError(message || 'HTTP error', res.status, data)
  }

  return data as T
}

export function get<T>(url: string, options?: Omit<HttpClientOptions, 'method' | 'body'>) {
  return request<T>(url, { ...options, method: 'GET' })
}

export function post<T>(
  url: string,
  body?: unknown,
  options?: Omit<HttpClientOptions, 'method' | 'body'>,
) {
  return request<T>(url, { ...options, method: 'POST', body })
}
