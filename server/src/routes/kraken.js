'use strict';

// Public/Private method names
const methods = {
  public: ['Time', 'Assets', 'AssetPairs', 'Ticker', 'Depth', 'Trades', 'Spread', 'OHLC'],
  private: ['Balance', 'TradeBalance', 'OpenOrders', 'ClosedOrders', 'QueryOrders', 'TradesHistory', 'QueryTrades', 'OpenPositions', 'Ledgers', 'QueryLedgers', 'TradeVolume', 'AddOrder', 'CancelOrder', 'DepositMethods', 'DepositAddresses', 'DepositStatus', 'WithdrawInfo', 'Withdraw', 'WithdrawStatus', 'WithdrawCancel', 'GetWebSocketsToken'],
};

const express = require('express');
const router = new express.Router();
const config = require('../config/index');

const KrakenClient = require('kraken-api');
const kraken = new KrakenClient(config.kraken.apiKey, config.kraken.apiPrivateKey);
const Logger = require('../loaders/logger');

router.get('/kraken/balance', async (req, res) => {
  kraken.api('Balance')
    .then(data => res.send(data.result))
    .catch(err => {
      Logger.error(err);
      res.status(500).send();
    });
});

router.get('/kraken/tradeHistory', async (req, res) => {
  kraken.api('TradesHistory')
    .then(data => {

      // add formatted date to response
      Object.keys(data.result.trades)
        .forEach(x => {
          data.result.trades[x].date = new Date(data.result.trades[x].time * 1000);
        });

      res.send(data.result);
    })
    .catch(err => {
      Logger.error(err);
      res.status(500).send();
    });
});

router.get('/kraken/assetPairs', async (req, res) => {
  kraken.api('AssetPairs')
    .then(data => {
      const filteredData = [];

      Object.keys(data.result)
        .forEach(asset => {
          filteredData.push({
            name: asset,
            fullName: data.result[asset].wsname,
            base: data.result[asset].base,
            quote: data.result[asset].quote
          });
        });
      res.send(filteredData);
    })
    .catch(err => {
      Logger.error(err);
      res.status(500).send();
    });
});

router.get('/kraken/trade', async (req, res) => {
  kraken.api('QueryTrades', { txid: req.query.tradeId })
    .then(data => res.send(data.result))
    .catch(err => {
      Logger.error(err);
      res.status(500).send();
    });
});

router.get('/kraken/ledgers', async (req, res) => {

  // withdrawal|deposit|trade|margin|all (default is all)
  const type = req.query.type || 'all';

  kraken.api('Ledgers', { type })
    .then(data => res.send(data.result))
    .catch(err => {
      Logger.error(err);
      res.status(500).send();
    });
});

router.get('/kraken/ledgers', async (req, res) => {

  kraken.api('QueryLedgers', { id: req.query.id })
    .then(data => res.send(data.result))
    .catch(err => {
      Logger.error(err);
      res.status(500).send();
    });
});

module.exports = router;
