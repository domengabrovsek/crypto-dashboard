import { useEffect, useState } from 'react';

import { getStakingTransactions } from "../services/api";
import { StakingTransaction } from "../../../shared/types/Account";

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
      <div className="container-fluid">
        <main>
          <h2>Staking Transactions</h2>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Balance</th>
                  <th>Fee</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {stakingTransactions && stakingTransactions.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.asset}</td>
                      <td>{row.amount}</td>
                      <td>{row.fee}</td>
                      <td>{new Date(row.date).toLocaleDateString()}</td>
                      <td>{row.status}</td>
                      <td>{row.type}</td>
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