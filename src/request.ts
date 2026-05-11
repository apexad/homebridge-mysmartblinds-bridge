export interface RequestOptions {
  method: string
  uri: string
  body?: unknown
  headers?: Record<string, string>
}

export interface RequestResponse<T = unknown> {
  body: T
  headers: Headers
  status: number
}

export class RequestError extends Error {
  statusCode: number
  body: unknown
  constructor(status: number, body: unknown) {
    super(`Request failed with status ${status}`)
    this.statusCode = status
    this.body = body
  }
}

export async function request<T = unknown>(options: RequestOptions): Promise<RequestResponse<T>> {
  const response = await fetch(options.uri, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  const body = await response.json() as T

  if (!response.ok) {
    throw new RequestError(response.status, body)
  }

  return {
    body,
    headers: response.headers,
    status: response.status,
  }
}
