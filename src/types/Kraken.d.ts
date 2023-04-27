import { KrakenTradesHistory } from './KrakenTradesHistory';
import { KrakenStakingTransactions } from './KrakenStaking';

export type KrakenPublicMethod = 'Ticker';
export type KrakenPrivateMethod = 'Balance' | 'TradeBalance' | 'Staking' | 'TradesHistory' | 'Ledgers';

type KrakenResult = KrakenTradesHistory | KrakenStakingTransactions;

export interface KrakenApiResponse {
  result: KrakenResult;
  error: string[];
}

export interface KrakenTickerResponse {
  // ask: [price, whole lot volume, lot volume],
  a: string[],
  // bid: [price, whole lot volume, lot volume],
  b: string[],
  // last trade closed: [price, lot volume],
  c: string[],
  // volume: [today, last 24 hours],
  v: string[],
  // volume weighted average price: [today, last 24 hours],
  p: string[],
  // number of trades: [today, last 24 hours],
  t: number[],
  // low: [today, last 24 hours],
  l: string[],
  // high: [today, last 24 hours],
  h: string[],
  // today's opening price
  o: string
}

export type KrakenTicker =
  'XXBT' |
  'XETH' |
  'XXLM' |
  'ADA' |
  'ADA.S' |
  'DOT' |
  'DOT.S' |
  'DOT28.S' |
  'MATIC.S' |
  'MATIC' |
  'ZEUR' |
  'XZEC' |
  'ETHW' |
  'XXDG' |
  'XETC' |
  'XETC.S' |
  'XETC28.S'
  ;