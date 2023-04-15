import { appConfig } from './config/appConfig';
import { Crypto, Fiat } from '../shared/constants/enums';
import { getMockedCoinGeckoResponse } from './mocks/coingecko-mock';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  lastUpdated: string;
}

export const getTokenInfo = async (crypto: Crypto, fiat: Fiat = Fiat.EUR): Promise<CoinData> => {

  const isTest = appConfig.get('IsTest');

  if (isTest) {
    return getMockedCoinGeckoResponse(crypto);
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
