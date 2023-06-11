export enum EventType {
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
  Buy = 'Buy',
  Sell = 'Sell',
  Staking = 'Staking',
  Trade = 'Trade',
  Margin = 'Margin',
  Rollover = 'Rollover',
  Credit = 'Credit',
  Transfer = 'Transfer',
  Settled = 'Settled',
  Sale = 'Sale'
}

export enum Exchange {
  Binance = 'Binance',
  Kraken = 'Kraken'
}

interface Event {
  eventId: string;
  eventType: EventType;
  timestamp: string;
  payload: any;
}

export interface LedgerEvent extends Event {
  payload: {
    accountId: string;
    exchange: Exchange;
    asset: string;
    amount: string;
    balance: string;
    refid: string;
  }
}