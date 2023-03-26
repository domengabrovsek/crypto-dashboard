import crypto from 'crypto';

import { appConfig } from './config/appConfig';
import { KrakenMethod, KrakenBalanceResponse, KrakenStakingTransactionResponse, KrakenTradeHistoryResponse, KrakenTrade } from './types/Kraken';

const getKrakenSignature = (path: string, request: string, secret: string, nonce: number) => {

  const secret_buffer = Buffer.from(secret, 'base64');
  const hash = crypto.createHash('sha256');
  const hmac = crypto.createHmac('sha512', secret_buffer);
  const hash_digest = hash.update(nonce + request).digest('binary');
  const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64');

  return hmac_digest;
};

const invokeKrakenApi = async (method: KrakenMethod) => {

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

  console.log(`Invoking Kraken API - '${url}'`);

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

      console.log(`Kraken API response: ${status}`);
      return result;
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getAccountBalance = async () => {
  try {
    const response: KrakenBalanceResponse = await invokeKrakenApi('Balance');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getStakingTransactions = async () => {
  try {
    const response: KrakenStakingTransactionResponse = await invokeKrakenApi('Staking');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface Trade {
  pair: string,
  date: string,
  type: string,
  orderType: string,
  price: string,
  cost: string,
  fee: string,
  volume: string,
  margin: string,
  leverage: string
}

export const getTradeHistory = async () => {
  try {
    const response: KrakenTradeHistoryResponse = await invokeKrakenApi('TradesHistory');
    const trades: Trade[] = Object
      .values(response.trades)
      .map((trade: KrakenTrade) => ({
        pair: trade.pair,
        date: new Date(trade.time * 1000).toISOString(),
        type: trade.type,
        orderType: trade.ordertype,
        price: trade.price,
        cost: trade.cost,
        fee: trade.fee,
        volume: trade.vol,
        margin: trade.margin,
        leverage: trade.leverage
      }));
    return trades;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
