import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { getStakingTransactions } from "../../services/api";
import { StakingTransaction } from "../../../../shared/types/Account";

export default function StakingTransactions() {

  const [stakingTransactions, setStakingTransactions] = useState<StakingTransaction[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getStakingTransactions();
      setStakingTransactions(result);
    };

    fetchDataAsync();
  }, []);

  if (!stakingTransactions || stakingTransactions.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <Title>Staking Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stakingTransactions.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.fee}</TableCell>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}