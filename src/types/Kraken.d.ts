import { KrakenTradesHistory } from './KrakenTradesHistory';
import { KrakenStakingTransactions } from './KrakenStaking';
import { KrakenTickerInfo } from './KrakenTicker';
import { KrakenAccountBalance } from './KrakenAccountBalance';
import { KrakenLedger } from './KrakenLedger';

export type KrakenPublicMethod = 'Ticker';
export type KrakenPrivateMethod = 'Balance' | 'TradeBalance' | 'Staking' | 'TradesHistory' | 'Ledgers';

type KrakenResult =
  KrakenTradesHistory |
  KrakenStakingTransactions |
  KrakenTickerInfo |
  KrakenAccountBalance |
  KrakenLedger

export interface KrakenApiResponse {
  result: KrakenResult;
  error: string[];
}