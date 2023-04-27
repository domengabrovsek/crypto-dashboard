import {
  invokeKrakenPrivateApi,
  // invokeKrakenPublicApi 
} from '../kraken';

/**
 * Returns the ledger entries for the account.
 * @param cryptoTicker The crypto ticker to filter by.
 * @param fiatTicker The fiat ticker to filter by.
 */
// export const getTickerInfo = async (cryptoTicker: KrakenTicker, fiatTicker: Fiat) => {

//   interface Response {
//     ticker: string,
//     price: number
//   }

//   try {
//     const pair = `${cryptoTicker}${fiatTicker}`;
//     const queryString = `?pair=${pair}`;
//     const result: Record<string, Record<string, string[] | string>> = await invokeKrakenPublicApi('Ticker', queryString);

//     const response: Response = {
//       ticker: cryptoTicker,
//       price: parseFloat(result?.[pair]?.a?.[0])
//     }

//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// /**
//  * Returns the account balance.
//  */
// export const getAccountBalance = async () => {
//   try {
//     const response: KrakenBalanceResponse = await invokeKrakenPrivateApi('Balance');

//     writeFileSync('balance.json', JSON.stringify(response));

//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// /**
//  * Returns the staking transactions for the account.
//  */
// export const getStakingTransactions = async () => {
//   try {
//     const response: KrakenStakingTransactionResponse = await invokeKrakenPrivateApi('Staking');

//     writeFileSync('staking.json', JSON.stringify(response));

//     const stakingTransactions: StakingTransaction[] = response.map((transaction) => ({
//       method: transaction.method,
//       asset: transaction.asset,
//       amount: transaction.amount,
//       fee: transaction.fee,
//       date: new Date(transaction.time * 1000).toISOString(),
//       status: transaction.status,
//       type: transaction.type,
//       bondStart: new Date(transaction.bond_start * 1000).toISOString(),
//       bondEnd: new Date(transaction.bond_end * 1000).toISOString()
//     }));

//     return stakingTransactions;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// /**
//  * Returns the trade history for the account.
//  */

export const getTradesHistory = async () => {
  try {
    const response = await invokeKrakenPrivateApi('TradesHistory');

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// /**
//  * Returns the ledger info for the account.
//  */
// export const getLedgerInfo = async () => {
//   try {
//     const response: KrakenLedgerResponse = await invokeKrakenPrivateApi('Ledgers');

//     const ledgerInfo = Object
//       .values(response.ledger)
//       .map((ledger) => ({
//         refId: ledger.refid,
//         time: new Date(ledger.time * 1000).toISOString(),
//         type: ledger.type,
//         asset: ledger.asset,
//         amount: ledger.amount,
//         fee: ledger.fee,
//         balance: ledger.balance
//       }));

//     return ledgerInfo;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }