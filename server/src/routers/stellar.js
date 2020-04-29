'use strict';

const path = require('path');

const express = require('express');
const router = new express.Router();
const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon.stellar.org')

const { readFromFile, saveToFile, exists } = require('../fs/fileHelpers');
const { accounts } = readFromFile(path.join(__dirname, '../../config.json'));

// get all payments
router.get('/public/stellar/payments', async (req, res) => {

  const filePath = path.join(__dirname, '../../db/operations.json');

  if (!exists(filePath)) {
    throw new Error('Operations file does not exist!');
  }

  const payments =
    readFromFile(filePath)
      .filter(op => op.type === 'payment');

  console.log(`Processed request.`);
  res.send(payments);

});

// get all operations
router.get('/public/stellar/operations', async (req, res) => {
  const transactionsPath = path.join(__dirname, '../../db/transactions.json');
  const filePath = path.join(__dirname, '../../db/operations.json');

  if (!exists(transactionsPath)) {
    throw new Error('Transactions file does not exist!');
  }

  if (exists(filePath)) {
    const оperations = readFromFile(filePath);

    res.send(оperations);
  }
  else {
    const transactionsIds = readFromFile(transactionsPath).records.map(tr => tr.id);

    let operations = [];

    for (let [index, value] of transactionsIds.entries()) {

      console.log(`Transaction ID: ${value}, ${index}/${transactionsIds.length}`);

      // fetch all operations for specific transaction (value)
      let { records } = await server
        .operations()
        .forTransaction(value)
        .call();

      records = records.map(rec => ({
        id: rec.id,
        pagingToken: rec.paging_token,
        successful: rec.transaction_successful,
        funder: rec.funder,
        account: rec.account,
        sourceAccount: rec.source_account,
        type: rec.type,
        typeIndex: rec.type_i,
        created: rec.created_at,
        transactionHash: rec.transaction_hash,
        assetType: rec.asset_type,
        from: rec.from,
        to: rec.to,
        amount: rec.amount
      }));

      operations.push(...records);
    }

    saveToFile({ path: filePath, data: operations, overwrite: true })

    console.log(`Processed request.`);
    res.send(operations);
  }
})

// get all transactions
router.get('/public/stellar/transactions', async (req, res) => {

  const filePath = path.join(__dirname, '../../db/transactions.json');

  // if exists read from db (json file for now)
  if (exists(filePath)) {
    const { records } = readFromFile(filePath);

    const mappedTransactions =
      records
        .filter(tr => tr.successful)
        .map(tr => ({
          id: tr.id,
          memo: tr.memo,
          successful: tr.successful,
          hash: tr.hash,
          created: tr.created_at,
          sourceAccount: tr.source_account,
          fee: tr.fee_charged
        }));

    console.log(`Processed request.`);
    res.send(mappedTransactions);
  }
  // otherwise fetch them from stellar api
  else {
    server.transactions()
      .forAccount(accounts.XLM)
      .limit(200)
      .call()
      .then(response => {
        saveToFile({ path: filePath, data: response, overwrite: true })
        console.log(`Processed request.`);
        res.send(response);
      })
      .catch(error => {
        console.error(error);
        res.send(error);
      });
  }
});

module.exports = router;
