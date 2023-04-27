import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Title from './Title';

import { getTradeHistory } from "../../services/api";
import { Trade } from "../../../../shared/types/Account";

const round = (value: number, decimals = 5) => {
  return parseFloat(value.toFixed(decimals));
}

export default function TradeHistory() {

  const [tradingHistory, setTradingHistory] = useState<Trade[]>([]);
  const [sortedHistory, setSortedHistory] = useState<Trade[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<keyof Trade | ''>('');

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getTradeHistory();
      setTradingHistory(result);
      setSortedHistory(result);
    };

    fetchDataAsync();
  }, []);

  const compare = (a: string | number, b: string | number) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    const aString = String(a);
    const bString = String(b);
    return aString.localeCompare(bString, undefined, { numeric: true });
  };


  const handleSort = (column: keyof Trade) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortColumn(column);
    const sorted = [...sortedHistory].sort((a, b) =>
      newSortOrder === 'asc'
        ? compare(a[column], b[column])
        : compare(b[column], a[column])
    );
    setSortedHistory(sorted);
  };

  if (!sortedHistory || sortedHistory.length === 0) {
    return <p>Loading...</p>
  }

  const tableCellStyles = {
    cursor: 'pointer',
    textDecoration: 'underline',
    transition: 'background-color 0.2s ease-in-out',
    backgroundColor: 'transparent',
    color: '#000',
    '&:hover': {
      backgroundColor: '#eee',
      color: '#00f'
    }
  };

  return (
    <React.Fragment>
      <Title>Trading History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('tradeId')} align="right">
              {sortColumn === 'tradeId' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'tradeId' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Trade Id
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('pair')} align="right">
              {sortColumn === 'pair' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'pair' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Pair
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('time')} align="right">
              {sortColumn === 'time' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'time' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Time
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('type')} align="right">
              {sortColumn === 'type' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'type' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Type
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('price')} align="right">
              {sortColumn === 'price' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'price' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Price
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('volume')} align="right">
              {sortColumn === 'volume' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'volume' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Volume
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('cost')} align="right">
              {sortColumn === 'cost' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'cost' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Cost
            </TableCell>
            <TableCell sx={tableCellStyles} onClick={() => handleSort('fee')} align="right">
              {sortColumn === 'fee' && sortOrder === 'asc' && <ArrowUpwardIcon />}
              {sortColumn === 'fee' && sortOrder === 'desc' && <ArrowDownwardIcon />}
              Fee
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedHistory.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="right">{row.tradeId}</TableCell>
              <TableCell align="right">{row.pair}</TableCell>
              <TableCell align="right">{new Date(row.time).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{round(row.price, 5)}</TableCell>
              <TableCell align="right">{round(row.volume, 5)}</TableCell>
              <TableCell align="right">{round(row.cost, 5)}</TableCell>
              <TableCell align="right">{round(row.fee, 5)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
