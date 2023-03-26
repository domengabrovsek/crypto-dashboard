# Crypto Dashboard

## About

Crypto Dashboard is a TypeScript-based web application built with Node.js and Fastify that fetches data from multiple cryptocurrency exchanges, including Kraken and Binance, and displays it in a centralized dashboard. The purpose of this application is to provide a comprehensive view of your cryptocurrency assets, including spot and staking assets, in one place.

## Getting Started

To run the application, you will need to have Node.js and NPM installed on your machine.

Clone the repository and install the dependencies by running the following commands:

```javascript
~ git clone https://github.com/<username>/crypto-dashboard.git
~ npm install
```

Create a .env file in the root directory of the project and add your API keys for each exchange. The following variables are required:

```javascript
KRAKEN_API_KEY=<your-kraken-api-key>
KRAKEN_SECRET=<your-kraken-secret>
```

Start the application by running the following command:

```javascript
npm run start
```

This will start the server on port 3000 by default.

## Usage

Once the server is running, you can access the dashboard at http://localhost:3000. The dashboard will display your cryptocurrency assets from each exchange, grouped by asset type and exchange. You can click on each asset to view more details, including the current price, trading volume, and price history.

### Currently supported exchanges (just API for now)

- [Kraken](https://www.kraken.com/)

### Currently supported endpoints

```javascript
POST /kraken/balance
POST /kraken/staking
POST /kraken/trade-history
POST /kraken/ledgers
```

## Contributing

Contributions are welcome! If you have any ideas or suggestions for improving the application, please open an issue or submit a pull request.