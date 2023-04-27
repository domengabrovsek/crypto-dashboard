import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Title from './Title';

import { getStakingTransactions } from "../../services/api";
import { StakingTransaction } from "../../../../shared/types/Account";

const round = (value: number, decimals = 5) => {
  return parseFloat(value.toFixed(decimals));
}

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
    <TableContainer component={Paper}>
      <Title>Staking Transactions</Title>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Asset</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stakingTransactions.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{round(row.amount, 5)}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
