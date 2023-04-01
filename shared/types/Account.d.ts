export interface Balance {
  asset: string,
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