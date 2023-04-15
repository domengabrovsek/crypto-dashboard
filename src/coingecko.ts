import { appConfig } from './config/appConfig';
import { Crypto, Fiat } from '../shared/constants/enums';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  lastUpdated: string;
}

export const getCurrentPrice = async (crypto: Crypto, fiat: Fiat = Fiat.EUR, test: boolean = true): Promise<CoinData> => {

  if (test) {

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

  try {
    const baseUrl = appConfig.get('CoinGecko.BaseUrl');

    const url = `${baseUrl}/?ids=${crypto}&vs_currency=${fiat}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json();

    return {
      id: data[0].id,
      symbol: data[0].symbol,
      name: data[0].name,
      price: data[0].current_price,
      lastUpdated: data[0].last_updated,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
