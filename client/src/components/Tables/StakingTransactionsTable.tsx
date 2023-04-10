import { useEffect, useState } from 'react';

import { getStakingTransactions } from "../../services/api";
import { StakingTransaction } from "../../../../shared/types/Account";

import styles from "./Table.module.css";

export function StakingTransactionsTable() {

  const [stakingTransactions, setStakingTransactions] = useState<StakingTransaction[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getStakingTransactions();
      setStakingTransactions(result);
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <h2>Staking Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Asset</th>
            <th className={styles.th}>Balance</th>
            <th className={styles.th}>Fee</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Type</th>
          </tr>
        </thead>
        <tbody>
          {stakingTransactions && stakingTransactions.map((row, index) => {
            return (
              <tr key={index}>
                <td className={styles.td}>{row.asset}</td>
                <td className={styles.td}>{row.amount}</td>
                <td className={styles.td}>{row.fee}</td>
                <td className={styles.td}>{new Date(row.date).toLocaleDateString()}</td>
                <td className={styles.td}>{row.status}</td>
                <td className={styles.td}>{row.type}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </>
  )
}