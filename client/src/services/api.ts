import { AssetInfo, StakingTransaction, Trade } from "../../../shared/types/Account";
import { config } from '../../../shared/config/config';

const port = config.port;
const host = config.host;

async function get<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  const error = await response.text();

  throw new Error(`Request failed: ${response.status} ${error}`,);
}

export const getAccountBalance = async () => {

  const url = `${host}:${port}/account-balance`;
  const response = await get<AssetInfo[]>(url);

  return response;
}

export const getStakingTransactions = async () => {

  const url = `${host}:${port}/staking`;
  const response = await get<StakingTransaction[]>(url);

  return response;
}

export const getTradeHistory = async () => {

  const url = `${host}:${port}/trade-history`;
  const response = await get<Trade[]>(url);

  return response;
}

export const getStakingRewards = async () => {

  const url = `${host}:${port}/account/staking/rewards`;
  const response = await get<StakingTransaction[]>(url);

  return response;
}