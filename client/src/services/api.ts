import { Balance, StakingTransaction, Trade } from "../../../shared/types/Account";

async function get<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  throw new Error(`Request failed: ${response.status}`);
}

export const getAccountBalance = async () => {

  const url = 'http://localhost:3000/account-balance';
  const response = await get<Balance[]>(url);

  return response;
}

export const getStakingTransactions = async () => {

  const url = 'http://localhost:3000/staking';
  const response = await get<StakingTransaction[]>(url);

  return response;
}

export const getTradeHistory = async () => {

  const url = 'http://localhost:3000/trade-history';
  const response = await get<Trade[]>(url);

  return response;
}