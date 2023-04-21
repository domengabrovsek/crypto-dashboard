// import { AccountBalanceTable } from './components/Tables/AccountBalanceTable';
// import { StakingTransactionsTable } from './components/Tables/StakingTransactionsTable';
// import { TradingHistoryTable } from './components/Tables/TradingHistoryTable';
// import { Header } from './components/Header/Header';
// import { Footer } from './components/Footer/Footer';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
// import Tabs from './components/Tabs/Tabs';

function App() {

  return (
    <>
      {/* <Header /> */}

      {/* TODO: this will be used later */}
      {/* <Tabs/> */}

      <div className="main-content">

        <div className="container">

          <Dashboard/>

          {/* <div className="one">
            <AccountBalanceTable />
          </div>

          <div className="one">
            <StakingTransactionsTable />
          </div>

        </div>

        <div className="container">

          <div className="one">
            <TradingHistoryTable />
          </div> */}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  )
}

export default App
