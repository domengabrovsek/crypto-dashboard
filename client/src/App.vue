<template>
  <div id="app">

      <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a class="navbar-brand" href="#">Dashboard</a>
          <button class="btn-default" @click="getTransactions()">Get Transactions</button>
          <button class="btn-default" @click="getOperations()">Get Operations</button>
          <button class="btn-default" @click="getPayments()">Get Payments</button>
        </nav>
      </header>

      <div class ="container-fluid justify-content-center " >
        <table v-if="response" class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col" v-for="column in response.columns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in response.data" :key="row.id">
              <td v-for="column in response.columns" :key="column">{{ row[column] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

</template>

<script>
import axios from 'axios';

const host = 'http://localhost:3030';

export default {
  data() {
    return {
      response: {
        columns: null,
        data: null,
      },
    };
  },
  methods: {
    getTransactions() {
      axios.get(`${host}/public/stellar/transactions`).then((response) => {
        this.response = {
          columns: Object.keys(response.data[0]),
          data: response.data,
        };
      });
    },
    getPayments() {
      axios.get(`${host}/public/stellar/payments`).then((response) => {
        this.response = {
          columns: Object.keys(response.data[0]),
          data: response.data,
        };
      });
    },
    getOperations() {
      axios.get(`${host}/public/stellar/operations`).then((response) => {
        this.response = {
          columns: Object.keys(response.data[0]),
          data: response.data,
        };
      });
    },
  },
};
</script>

<style>

table {
  margin-top: 56px
}
</style>
