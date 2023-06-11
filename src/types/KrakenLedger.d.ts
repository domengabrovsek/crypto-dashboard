interface LedgerInfo {
  aclass: string,
  amount: number,
  asset: string,
  balance: number,
  fee: number
  refid: string,
  time: string,
  type: string
  subtype: string
}

interface Ledger {
  [ledger: string]: LedgerInfo
}

export interface KrakenLedger {
  ledger: Ledger,
  count: number
}