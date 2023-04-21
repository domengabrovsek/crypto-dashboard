import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { getAccountBalance } from "../../services/api";
import { AccountBalance } from "../../../../shared/types/Account";

export default function AccountBalanceTable() {

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
    <React.Fragment>
      <Title>Account Balance</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Ticker [K]</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Price [EUR]</TableCell>
            <TableCell>Is Staking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountBalance.map((row) => (
            <TableRow key={row.krakenTicker}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.krakenTicker}</TableCell>
              <TableCell>{row.ticker}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.currentPrice}</TableCell>
              <TableCell>{row.priceEur}</TableCell>
              <TableCell>{row.isStaking ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
