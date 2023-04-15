import { useEffect, useState } from 'react';

import { getAccountBalance } from "../../services/api";
import { AccountBalance } from "../../../../shared/types/Account";

import styles from "./Table.module.css";

export function AccountBalanceTable() {

  const [accountBalance, setAccountBalance] = useState<AccountBalance>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAccountBalance();
      setAccountBalance(response);
    }

    fetchData();
  }, []);

  if (!accountBalance || accountBalance.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h2>Account Balance</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Ticker[K]</th>
            <th className={styles.th}>Ticker</th>
            <th className={styles.th}>Balance</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Value [EUR]</th>
            <th className={styles.th}>Staking</th>
          </tr>
        </thead>
        <tbody>
          {accountBalance.map((row, index) => {
            return (
              <tr key={index}>
                <td className={styles.td}>{row.name}</td>
                <td className={styles.td}>{row.krakenTicker}</td>
                <td className={styles.td}>{row.ticker}</td>
                <td className={styles.td}>{row.balance}</td>
                <td className={styles.td}>{row.currentPrice}</td>
                <td className={styles.td}>{row.priceEur}</td>
                <td className={styles.td}>{row.isStaking ? 'Yes' : 'No'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}