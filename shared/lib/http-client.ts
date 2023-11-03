export interface HttpResponse<T> {
  status: number;
  statusText: string;
  headers: Record<string, any>;
  data: T;
}

interface HttpObjectBody {
  [key: string]: any;
}

type HttpBody = HttpObjectBody | string;

interface HttpOptions {
  [key: string]: any;
}

export const post = async <T>(url: string, body: HttpBody, options?: HttpOptions): Promise<HttpResponse<T>> => {

  try {

    const request = {
      method: 'POST',
      body: body instanceof Object ? JSON.stringify(body) : body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      ...options,
    }

    console.log(`Request - POST ${url}`);

    const response: Response = await fetch(url, request);

    if (!response.ok) {
      console.log(`Error invoking POST ${url} - ${response.statusText}`);
    }

    console.log(`Response - POST ${url} - ${response.status} ${response.statusText}`);

    const data: T = await response.json();
    const result: HttpResponse<T> = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data
    };

    return result;
  } catch (error) {
    console.error(`POST ${url} - ${error}`);
    throw error;
  }
};

export const get = async <T>(url: string, options?: HttpOptions): Promise<HttpResponse<T>> => {
  try {

    const response: Response = await fetch(url, options);

    if (!response.ok) {
      console.log(`Error invoking GET ${url} - ${response.statusText}`);
    }

    const data: T = await response.json();

    const result: HttpResponse<T> = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data
    };

    console.log(`GET ${url} - ${response.status}, ${JSON.stringify(data)}`);
    return result;

  } catch (error) {
    console.error(`GET ${url} - ${error}`);
    throw error;
  }
};