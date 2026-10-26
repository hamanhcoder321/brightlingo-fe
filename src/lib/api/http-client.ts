const getAccessToken = () => (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);

export class HttpError extends Error {
  constructor(public readonly status: number, statusText: string) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.name = 'HttpError';
  }
}

export async function httpClient<T>(
  url: string,
  options: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {}
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  headers.set('Content-Type', 'application/json');

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  return response.json() as Promise<T>;
}
