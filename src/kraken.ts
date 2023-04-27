import { createHash, createHmac } from 'crypto';

import { appConfig } from './config/appConfig';
import { KrakenPrivateMethod, KrakenPublicMethod, KrakenApiResponse, KrakenResult } from './types/Kraken';
import { post, get } from '../shared/lib/http-client';

const baseUrl = appConfig.get('Kraken.BaseUrl');
const apiVersion = appConfig.get('Kraken.ApiVersion');

const getKrakenSignature = (path: string, request: string, secret: string, nonce: number) => {

  const secret_buffer = Buffer.from(secret, 'base64');
  const hash = createHash('sha256');
  const hmac = createHmac('sha512', secret_buffer);
  const hash_digest = hash.update(nonce + request).digest('binary');
  const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64');

  return hmac_digest;
};

export const invokeKrakenPrivateApi = async<T extends KrakenResult>(method: KrakenPrivateMethod): Promise<T> => {

  const apiKey = appConfig.get('Kraken.ApiKey');
  const privateKey = appConfig.get('Kraken.PrivateKey');
  const endpoint = appConfig.get(`Kraken.Endpoints.${method}`);

  const url = `${baseUrl}/${apiVersion}${endpoint}`;
  const path = `/${apiVersion}${endpoint}`;

  // unique number which has to increase with each API call
  const nonce = Date.now() * 1000;
  const body = `nonce=${nonce}`;

  const signature = getKrakenSignature(path, body, privateKey, nonce);

  try {
    const options = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'API-Key': apiKey,
        'API-Sign': signature
      }
    }
    const response = await post<KrakenApiResponse>(url, body, options);

    return response.data.result as T;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const invokeKrakenPublicApi = async<T extends KrakenResult>(method: KrakenPublicMethod, queryString = ''): Promise<T> => {

  const endpoint = appConfig.get(`Kraken.Endpoints.${method}`);
  const url = `${baseUrl}/${apiVersion}${endpoint}${queryString}`;

  try {
    const response = await get<KrakenApiResponse>(url);
    return response.data.result as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
}