import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './router';
import { store } from './app/store';
import NotificationManager from './shared/components/NotificationManager/NotificationManager';

// // const App: React.FC = () => {
// //   return (
// //     <div className="app">
// //       <div className="background-blur"></div>
// //       <MainPage/>
// //     </div>
// //   );
// }
const App: React.FC = () => (
  <Provider store={store}>
    <NotificationManager/>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>
);


export default App;