import { Crypto, Fiat } from '../../shared/constants/enums';
import { KrakenAsset } from '../types/Kraken';

export const mapFromKrakenAsset = (asset: KrakenAsset) => {
  switch (asset) {
    case 'XXDG':
      return Crypto.DOGE;
    case 'XXBT':
      return Crypto.BTC;
    case 'XETH':
      return Crypto.ETH;
    case 'XXLM':
      return Crypto.XLM;
    case 'ADA':
      return Crypto.ADA;
    case 'ADA.S':
      return Crypto.ADA;
    case 'DOT':
      return Crypto.DOT;
    case 'DOT.S':
      return Crypto.DOT;
    case 'DOT28.S':
      return Crypto.DOT;
    case 'MATIC.S':
      return Crypto.MATIC;
    case 'MATIC':
      return Crypto.MATIC;
    case 'ZEUR':
      return Fiat.EUR;
    case 'XZEC':
      return Crypto.ZEC;
    case 'ETHW':
      return Crypto.ETH;
    default:
      throw new Error(`Unknown asset: ${asset}`);
  }
}