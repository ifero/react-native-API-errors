export class HttpError extends Error {
  status = 400;
  info: object | string = {};
  constructor(status: number, info: object | string) {
    super();
    this.status = status;
    this.info = info;
  }
}

export const fetcher = async (path: string) => {
  const response = await fetch(`https://api.chucknorris.io/jokes${path}`);

  if (!response.ok) {
    const error =
      response.headers.get('Content-Type') === 'text/plain'
        ? new HttpError(response.status, await response.text())
        : new HttpError(response.status, await response.json());

    throw error;
  }

  return response.headers.get('Content-Type') === 'text/plain'
    ? await response.text()
    : await response.json();
};
