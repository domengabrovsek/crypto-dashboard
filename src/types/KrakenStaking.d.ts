export enum KrakenStakingTransactionType {
  Bonding = 'bonding',
  Reward = 'reward',
  Unbonded = 'unbonded'
}

export enum KrakenStakingTransactionStatus {
  Initial = 'Initial',
  Pending = 'Pending',
  Settled = 'Settled',
  Success = 'Success',
  Failed = 'Failed'
}

interface KrakenStakingTransaction {
  method: string; // The name of the method used to perform the action
  aclass: string; // The asset class of the asset
  asset: string; // The asset being traded
  refid: string; // Reference id for the action
  amount: string; // The amount of the asset involved in the action
  fee: string; // The fee paid for the action
  time: number; // The timestamp of the action
  status: KrakenStakingTransactionStatus; // The status of the action (e.g. Success, Failed, etc.)
  type: KrakenStakingTransactionType; // The type of action (e.g. bonding, unbonding, etc.)
  bond_start: number; // The timestamp when the bonding period started
  bond_end: number; // The timestamp when the bonding period ended
}

export type KrakenStakingTransactions = KrakenStakingTransaction[];
