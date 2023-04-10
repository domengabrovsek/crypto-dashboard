import { AccountBalanceTable } from './components/Tables/AccountBalanceTable';
import { StakingTransactionsTable } from './components/Tables/StakingTransactionsTable';
import { TradingHistoryTable } from './components/Tables/TradingHistoryTable';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {

  return (
    <>
      <Header />

      <div className="main-content">

        <div className="container">
          <div className="one">
            <AccountBalanceTable />
          </div>

          <div className="one">
            <StakingTransactionsTable />
          </div>

        </div>

        <div className="container">
          <div className="one">
            <AccountBalanceTable />
          </div>

          <div className="one">
            <TradingHistoryTable />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default App
