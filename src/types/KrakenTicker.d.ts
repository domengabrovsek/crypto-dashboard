interface KrakenTicker {
  a: string[]; // ask: [price, whole lot volume, lot volume]
  b: string[]; // bid: [price, whole lot volume, lot volume]
  c: string[]; // last trade closed: [price, lot volume]
  v: string[]; // volume: [today, last 24 hours]
  p: string[]; // volume weighted average price: [today, last 24 hours]
  t: number[]; // number of trades: [today, last 24 hours]
  l: string[]; // low: [today, last 24 hours]
  h: string[]; // high: [today, last 24 hours]
  o: string;  // today's opening price
}

export interface KrakenTickerInfo {
  [txid: string]: KrakenTicker;
}