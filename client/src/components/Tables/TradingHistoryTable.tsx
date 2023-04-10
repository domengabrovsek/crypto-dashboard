import { useEffect, useState } from 'react';

import { getTradeHistory } from "../../services/api";
import { Trade } from "../../../../shared/types/Account";

import styles from "./Table.module.css";

export function TradingHistoryTable() {

  const [tradingHistory, setTradingHistory] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getTradeHistory();
      setTradingHistory(result);
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <h2>Trading Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Pair</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Order Type</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Cost</th>
            <th className={styles.th}>Fee</th>
            <th className={styles.th}>Volume</th>
            <th className={styles.th}>Margin</th>
            <th className={styles.th}>Leverage</th>
          </tr>
        </thead>
        <tbody>
          {tradingHistory && tradingHistory.map((row, index) => {
            return (
              <tr key={index}>
                <td className={styles.td}>{row.pair}</td>
                <td className={styles.td}>{row.type}</td>
                <td className={styles.td}>{row.orderType}</td>
                <td className={styles.td}>{new Date(row.date).toLocaleDateString()}</td>
                <td className={styles.td}>{row.price}</td>
                <td className={styles.td}>{row.cost}</td>
                <td className={styles.td}>{row.fee}</td>
                <td className={styles.td}>{row.volume}</td>
                <td className={styles.td}>{row.margin}</td>
                <td className={styles.td}>{row.leverage}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}