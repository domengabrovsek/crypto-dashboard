import { Crypto } from '../../shared/constants/enums';

export const getMockedCoinGeckoResponse = (crypto: Crypto) => {
  switch (crypto) {
    case Crypto.BTC:
      return {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        price: 50000,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.ETH:
      return {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        price: 3000,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.XLM:
      return {
        id: 'stellar',
        symbol: 'xlm',
        name: 'Stellar',
        price: 0.5,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.ADA:
      return {
        id: 'cardano',
        symbol: 'ada',
        name: 'Cardano',
        price: 2,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.DOT:
      return {
        id: 'polkadot',
        symbol: 'dot',
        name: 'Polkadot',
        price: 40,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.MATIC:
      return {
        id: 'polygon',
        symbol: 'matic',
        name: 'Polygon',
        price: 2,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.ZEC:
      return {
        id: 'zcash',
        symbol: 'zec',
        name: 'Zcash',
        price: 200,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    case Crypto.DOGE:
      return {
        id: 'dogecoin',
        symbol: 'doge',
        name: 'Dogecoin',
        price: 0.5,
        lastUpdated: '2021-05-01T00:00:00.000Z',
      };
    default:
      throw new Error(`Unknown crypto: ${crypto}`);
  }
}