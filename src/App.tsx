import { useState } from "react";
import Balance from "./component/Balance/Balance";
import TransactionList from "./component/Transaction/TransactionList";

function App() {
  return (
    <div className='p-5'>
      <div className="max-w-screen-lg mx-auto">
        <Balance/>
        <TransactionList/>
      </div>
    </div>
  );
};

export default App
