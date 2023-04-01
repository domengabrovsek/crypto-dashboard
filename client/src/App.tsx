import 'bootstrap/dist/css/bootstrap.min.css';

import { AccountBalanceTable } from './components/AccountBalanceTable';
import { StakingTransactionsTable } from './components/StakingTransactionsTable';
import { TradingHistoryTable } from './components/TradingHistoryTable';

function App() {

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <AccountBalanceTable />
        </div>
        <div className="row">
          <StakingTransactionsTable />
        </div>
        <div className="row">
          <TradingHistoryTable />
        </div>
      </div>
    </>
  )
}

export default App
