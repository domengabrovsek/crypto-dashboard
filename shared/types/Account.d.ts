export interface AssetInfo {
  asset: string,
  balance: number,
  price: number,
  value: number
}

export interface Balance {
  ticker: string,
  balance: number
}

export interface StakingTransaction {
  id: string
  date: string,
  asset: string,
  amount: string,
  status: string,
  type: string,
}

export interface Trade {
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