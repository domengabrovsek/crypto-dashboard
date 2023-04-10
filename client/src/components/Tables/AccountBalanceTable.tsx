import { useEffect, useState } from 'react';

import { getAccountBalance } from "../../services/api";
import { Balance } from "../../../../shared/types/Account";

import styles from "./Table.module.css";

export function AccountBalanceTable() {

  const [accountBalance, setAccountBalance] = useState<Balance[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getAccountBalance()
      setAccountBalance(result);
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <h2>Account Balance</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Asset</th>
            <th className={styles.th}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accountBalance && accountBalance.map((row, index) => {
            return (
              <tr key={index}>
                <td className={styles.td}>{row.asset}</td>
                <td className={styles.td}>{row.balance}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}