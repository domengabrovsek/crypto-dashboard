import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { getAccountBalance } from "../../services/api";
import { AccountBalance } from "../../../../shared/types/Account";
import AccountBalanceSummary from './AccountBalanceSummary';
import Title from './Title';

export default function AccountBalanceTable() {

  const [accountBalances, setAccountBalances] = useState<AccountBalance>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAccountBalance();
      setAccountBalances(response);
    }

    fetchData();
  }, []);

  if (!accountBalances || accountBalances.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <>

      <AccountBalanceSummary
        totalValue={accountBalances.reduce((acc, cur) => acc + cur.priceEur, 0)}
        numberOfAssets={accountBalances.length}
      />

      <Title>Account Balance</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Value [EUR]</TableCell>
            <TableCell>Is Staking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountBalances.map((row) => (
            <TableRow key={row.krakenTicker}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.krakenTicker} {`(${row.ticker.toUpperCase()})`}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.currentPrice}</TableCell>
              <TableCell>{row.priceEur}</TableCell>
              <TableCell>{row.isStaking ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
