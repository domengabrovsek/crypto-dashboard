export interface AssetInfo {
  name: string,
  ticker: string,
  krakenTicker: string,
  balance: number,
  currentPrice: number,
  priceEur?: number,
  valueUsd?: number,
  isStaking: boolean
}

export interface AccountBalance extends Array<AssetInfo> {}

export interface Balance {
  ticker: string,
  balance: number
}

export interface StakingTransaction {
  method: string,
  asset: string,
  amount: string,
  fee: string,
  date: string,
  status: string,
  type: string,
  bondStart: string,
  bondEnd: string
}

export interface Trade {
  pair: string,
  date: string,
  type: string,
  orderType: string,
  price: string,
  cost: string,
  fee: string,
  volume: string,
  margin: string,
  leverage: string
}