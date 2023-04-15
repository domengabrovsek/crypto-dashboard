import crypto from 'crypto';

import { appConfig } from './config/appConfig';
import { KrakenMethod, KrakenBalanceResponse, KrakenStakingTransactionResponse, KrakenTradeHistoryResponse, KrakenTrade, KrakenLedgerResponse, KrakenAsset } from './types/Kraken';
import { Balance, StakingTransaction, Trade } from '../shared/types/Account';
import { mapFromKrakenAsset } from './lib/AssetMapper';

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
      const fullResponse = await response.json();

      if (fullResponse?.error?.length > 0) {
        console.error(`Kraken API error: ${JSON.stringify(fullResponse)}`);
        throw new Error(fullResponse.error.join(', '));
      }

      return fullResponse.result;
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Returns the account balance.
 */
export const getAccountBalance = async () => {
  try {
    const response: KrakenBalanceResponse = await invokeKrakenApi('Balance');

    const balances: Balance[] = Object
      .keys(response)
      // filter out ZEUR as it's not a crypto asset
      .filter((item) => item !== 'ZEUR')
      .map((asset) => ({
        asset: mapFromKrakenAsset(asset as KrakenAsset),
        balance: parseFloat(response[asset])
      }));

    return balances;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Returns the staking transactions for the account.
 */
export const getStakingTransactions = async () => {
  try {
    const response: KrakenStakingTransactionResponse = await invokeKrakenApi('Staking');

    const stakingTransactions: StakingTransaction[] = response.map((transaction) => ({
      method: transaction.method,
      asset: transaction.asset,
      amount: transaction.amount,
      fee: transaction.fee,
      date: new Date(transaction.time * 1000).toISOString(),
      status: transaction.status,
      type: transaction.type,
      bondStart: new Date(transaction.bond_start * 1000).toISOString(),
      bondEnd: new Date(transaction.bond_end * 1000).toISOString()
    }));

    return stakingTransactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Returns the trade history for the account.
 */

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

/**
 * Returns the ledger info for the account.
 */
export const getLedgerInfo = async () => {
  try {
    const response: KrakenLedgerResponse = await invokeKrakenApi('Ledgers');

    const ledgerInfo = Object
      .values(response.ledger)
      .map((ledger) => ({
        refId: ledger.refid,
        time: new Date(ledger.time * 1000).toISOString(),
        type: ledger.type,
        asset: ledger.asset,
        amount: ledger.amount,
        fee: ledger.fee,
        balance: ledger.balance
      }));

    return ledgerInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
}