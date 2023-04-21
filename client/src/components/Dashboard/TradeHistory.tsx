import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { getTradeHistory } from "../../services/api";
import { Trade } from "../../../../shared/types/Account";

export default function TradeHistory() {

  const [tradingHistory, setTradingHistory] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getTradeHistory();
      setTradingHistory(result);
    };

    fetchDataAsync();
  }, []);

  if (!tradingHistory || tradingHistory.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <Title>Trading History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Pair</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Order Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Margin</TableCell>  
            <TableCell>Leverage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingHistory.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.pair}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.orderType}</TableCell>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.cost}</TableCell>
              <TableCell>{row.fee}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.margin}</TableCell>
              <TableCell>{row.leverage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
