import React from 'react';
import OrderType from './pages/OrderType/ui/OrderType';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <OrderType/>
    </div>
  );
}

export default App;