export type KrakenMethod = 'Balance' | 'TradeBalance' | 'Staking' | 'TradesHistory' | 'Ledgers'
export type KrakenStakingTransactionType = 'bonding' | 'reward' | 'unbonded';
export type KrakenStakingTransactionStatus = 'Initial' | 'Pending' | 'Settled' | 'Success' | 'Failed';
export type KrakenBalanceResponse = Record<string, string>;

export interface KrakenTrade {
  ordertxid: string,
  postxid: string,
  pair: string,
  time: number,
  type: string,
  ordertype: string,
  price: string,
  cost: string,
  fee: string,
  vol: string,
  margin: string,
  leverage: string,
  misc: string,
  trade_id: number
}

export interface KrakenTradeHistoryResponse {
  count: number,
  trades: Record<string, KrakenTrade>
}

export type KrakenStakingTransactionResponse = KrakenStakingTransaction[];

export interface KrakenStakingTransaction {
  method: string,
  aclass: string,
  asset: string,
  refid: string,
  amount: string,
  fee: string,
  time: number,
  status: KrakenStakingTransactionStatus,
  type: KrakenStakingTransactionType,
  bond_start: number,
  bond_end: number
}

export interface KrakenLedger {
  aclass: string,
  amount: string,
  asset: string,
  balance: string,
  fee: string,
  refid: string,
  time: number,
  type: string
  subtype: string
}

export interface KrakenLedgerResponse {
  count: number,
  ledger: Record<string, KrakenLedger>
}

