import crypto from 'crypto';

import { appConfig } from './config/appConfig';

type KrakenMethod = 'Balance' | 'TradeBalance' | 'Staking';

const getKrakenSignature = (path: string, request: string, secret: string, nonce: number) => {
  const secret_buffer = Buffer.from(secret, 'base64');
  const hash = crypto.createHash('sha256');
  const hmac = crypto.createHmac('sha512', secret_buffer);
  const hash_digest = hash.update(nonce + request).digest('binary');
  const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64');

  return hmac_digest;
};

export const invokeKrakenApi = async (method: KrakenMethod) => {

  const baseUrl = appConfig.get('Kraken.BaseUrl');
  const apiVersion = appConfig.get('Kraken.ApiVersion');

  const apiKey = appConfig.get('Kraken.ApiKey');
  const privateKey = appConfig.get('Kraken.PrivateKey');
  const endpoint = appConfig.get(`Kraken.Endpoints.${method}`);

  const url = `${baseUrl}/${apiVersion}${endpoint}`;
  const path = `/${apiVersion}${endpoint}`;

  // unique number which has to increase with each API call
  const nonce = Date.now() * 1000;
  const body = `nonce=${nonce}`;

  const signature = getKrakenSignature(path, body, privateKey, nonce);

  console.log('Invoking Kraken API', { url, path });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'API-Key': apiKey,
        'API-Sign': signature
      },
      body: body
    });

    if (response.ok) {
      const { result } = await response.json();
      const status = response.status;

      console.log(`Kraken API response: ${status}, ${result}`);
      return result;
    }

    console.log(response);

  } catch (error) {
    console.error(error);
    throw error;
  }
}

type Assets = Record<string, string>;
export const getAccountBalance = async () => {

  const response: Assets = await invokeKrakenApi('Balance');
  return response;
}

type StakingTransactionType = 'bonding' | 'reward' | 'unbonded';
type StakingTransactionStatus = 'Initial' | 'Pending' | 'Settled' | 'Success' | 'Failed';

interface StakingTransaction {
  method: string,
  aclass: string,
  asset: string,
  refid: string,
  amount: string,
  fee: string,
  time: number,
  status: StakingTransactionStatus,
  type: StakingTransactionType,
  bond_start: number,
  bond_end: number
};

export const getStakingTransactions = async () => {

  const response: StakingTransaction[] = await invokeKrakenApi('Staking');

  return response;
};
