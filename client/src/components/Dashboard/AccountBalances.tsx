import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { getAccountBalance } from "../../services/api";
import { AssetInfo } from "../../../../shared/types/Account";
import AccountBalanceSummary from './AccountBalanceSummary';
import Title from './Title';

export default function AccountBalanceTable() {

  const [accountBalances, setAccountBalances] = useState<AssetInfo[]>([]);

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
        totalValue={accountBalances.reduce((acc, cur) => acc + cur.value, 0)}
        numberOfAssets={accountBalances.length}
      />

      <Title>Account Balance</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Value [EUR]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountBalances.map((row) => (
            <TableRow key={row.asset}>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
