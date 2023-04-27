import { invokeKrakenPrivateApi, invokeKrakenPublicApi } from '../kraken';
import { KrakenTradesHistory } from '../types/KrakenTradesHistory';
import { KrakenStakingTransactions } from '../types/KrakenStaking';
import { KrakenTickerInfo } from '../types/KrakenTicker';
import { KrakenAccountBalance } from '../types/KrakenAccountBalance';

interface AssetPrices {
  [price: string]: number
}

export const getAssetPrices = async () => {

  try {
    const response = await invokeKrakenPublicApi<KrakenTickerInfo>('Ticker');

    const assetPrices: AssetPrices = {};

    for (const [key, value] of Object.entries(response)) {

      // take only EUR prices
      if (key.includes('EUR')) {

        let asset = key;

        // replace all XX with X
        if (asset.includes('XX')) {
          asset = asset.replace('XX', 'X');
        }

        // replace all ZEUR with EUR
        if (asset.includes('ZEUR')) {
          asset = asset.replace('ZEUR', 'EUR');
        }

        // set price
        assetPrices[asset] = Number(value.a[0]);

        // hack for staking assets
        // DOT DOT.S DOT28.S
        const [crypto] = asset.split('EUR');
        assetPrices[`${crypto}28.SEUR`] = Number(value.a[0]);
        assetPrices[`${crypto}.SEUR`] = Number(value.a[0]);

        // hack for base currency
        assetPrices['EUREUR'] = 1;
      }
    }

    return assetPrices;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface AssetInfo {
  asset: string,
  balance: number,
  price: number,
  value: number
}

export const getAccountBalance = async () => {
  try {
    const response = await invokeKrakenPrivateApi<KrakenAccountBalance>('Balance');

    // get prices in base currency from cache
    const assetPrices = await getAssetPrices();

    const accountBalance: AssetInfo[] = Object.entries(response)
      .filter(([, balance]) => Number(balance) > 0)
      .map(([asset, balance]) => {

        const normalizedAsset = asset.replace('XX', 'X').replace('ZEUR', 'EUR');
        const normalizedBalance = Number(balance);
        const price = assetPrices[`${normalizedAsset}EUR`];

        return {
          asset: normalizedAsset,
          balance: normalizedBalance,
          price: price,
          value: normalizedBalance * price
        }
      });

    return accountBalance;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface StakingTransaction {
  id: string,
  date: string,
  type: string,
  asset: string,
  amount: string,
  status: string
}

export const getStakingTransactions = async () => {
  try {
    const response = await invokeKrakenPrivateApi<KrakenStakingTransactions>('Staking');

    const stakingTransactions: StakingTransaction[] = response
      .map((staking) => ({
        id: staking.refid,
        date: new Date(staking.time * 1000).toISOString(),
        type: staking.type,
        asset: staking.asset,
        amount: staking.amount,
        status: staking.status
      }));

    return stakingTransactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface Trade {
  orderId: string,
  tradeId: string,
  pair: string,
  time: string,
  type: string,
  orderType: string,
  price: string,
  volume: string,
  cost: string,
  fee: string
}

export const getTradesHistory = async () => {
  try {
    const response = await invokeKrakenPrivateApi<KrakenTradesHistory>('TradesHistory');

    const trades: Trade[] = Object
      .values(response.trades)
      .map((trade) => ({
        orderId: trade.ordertxid,
        tradeId: trade.postxid,
        pair: trade.pair,
        time: new Date(trade.time * 1000).toISOString(),
        type: trade.type,
        orderType: trade.ordertype,
        price: trade.price,
        volume: trade.vol,
        cost: trade.cost,
        fee: trade.fee
      }));

    return trades;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
