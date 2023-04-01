import { useEffect, useState } from 'react';

import { getTradeHistory } from "../services/api";
import { Trade } from "../../../shared/types/Account";

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
      <div className="container-fluid">
        <main>
          <h2>Trading Transactions</h2>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Type</th>
                  <th>Order Type</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Cost</th>
                  <th>Fee</th>
                  <th>Volume</th>
                  <th>Margin</th>
                  <th>Leverage</th>
                </tr>
              </thead>
              <tbody>
                {tradingHistory && tradingHistory.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.pair}</td>
                      <td>{row.type}</td>
                      <td>{row.orderType}</td>
                      <td>{new Date(row.date).toLocaleDateString()}</td>
                      <td>{row.price}</td>
                      <td>{row.cost}</td>
                      <td>{row.fee}</td>
                      <td>{row.volume}</td>
                      <td>{row.margin}</td>
                      <td>{row.leverage}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div >
    </>
  )
}