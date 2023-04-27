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

const round = (value: number, decimals = 5) => {
  return parseFloat(value.toFixed(decimals));
}

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
        totalValue={round(accountBalances.reduce((acc, cur) => acc + cur.value, 0), 2)}
        numberOfAssets={accountBalances.filter((row) => row.value > 1).length}
      />

      <Title>Account Balance</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right">Asset</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Value [EUR]</TableCell>
            <TableCell align="right">Is Staking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountBalances
            .filter((row) => row.value > 1)
            .sort((a, b) => b.value - a.value)
            .map((row) => (
              <TableRow key={row.asset}>
                <TableCell align="right">{row.asset}</TableCell>
                <TableCell align="right">{round(row.balance)}</TableCell>
                <TableCell align="right">{round(row.price)}</TableCell>
                <TableCell align="right">{round(row.value)}</TableCell>
                <TableCell align="right">{row.asset.includes('.S') ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
