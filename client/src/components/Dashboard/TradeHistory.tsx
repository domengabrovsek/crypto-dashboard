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
            <TableCell>Order Id</TableCell>
            <TableCell>Trade Id</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Type</TableCell>
            {/* <TableCell>Order Type</TableCell> */}
            <TableCell>Price</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingHistory.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.orderId}</TableCell>
              <TableCell>{row.tradeId}</TableCell>
              <TableCell>{row.pair}</TableCell>
              <TableCell>{new Date(row.time).toLocaleDateString()}</TableCell>
              <TableCell>{row.type}</TableCell>
              {/* <TableCell>{row.orderType}</TableCell> */}
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.cost}</TableCell>
              <TableCell>{row.fee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
