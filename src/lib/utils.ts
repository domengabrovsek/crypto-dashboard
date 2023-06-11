import { createHash } from 'crypto';

/**
 * Converts a parameters object into a URL-encoded query string.
 * 
 * The function encodes both the keys and values using encodeURIComponent() to ensure
 * that they are safe to include in a URL. The resulting string can be used in the body of
 * a `x-www-form-urlencoded` POST request.
 * 
 * @param params - An object containing the parameters to be included in the query string.
 *   The keys in this object should be the names of the parameters, and the values should be
 *   the corresponding values.
 * 
 * @returns A URL-encoded query string where keys and values are separated by '=', and key-value pairs are separated by '&'.
 * 
 * @example
 * 
 *   const params = { a: 1, b: 2, c: 'hello world' };
 *   console.log(toQueryString(params));  // prints "a=1&b=2&c=hello%20world"
 */
export const toQueryString = (params: { [key: string]: any }): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

/**
 * Generates a SHA-256 hash of the input data.
 *
 * This function uses Node.js' built-in 'crypto' module to create a SHA-256 hash of the
 * input data. The data is first converted to a JSON string using `JSON.stringify()`, 
 * ensuring a consistent string representation. The resulting hash is encoded in base64 format.
 * This function is often used for ensuring the integrity and uniqueness of data.
 *
 * @param data - The input data to be hashed. This can be any object.
 *
 * @returns The base64-encoded SHA-256 hash of the input data.
 *
 * @example
 *
 *   const data = { message: 'Hello, world!' };
 *   const hash = toSHA256(data);
 *   console.log(hash);  // prints the base64-encoded SHA-256 hash of the input data
 */
export const toSHA256 = (data: { [key: string]: any }) => createHash('sha256').update(JSON.stringify(data)).digest('base64');
