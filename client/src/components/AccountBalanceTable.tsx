import { useEffect, useState } from 'react';

import { getAccountBalance } from "../services/api";
import { Balance } from "../../../shared/types/Account";

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
      <div className="container-fluid">
        <main>
          <h2>Account Balance</h2>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {accountBalance && accountBalance.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.asset}</td>
                      <td>{row.balance}</td>
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