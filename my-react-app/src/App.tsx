import React from "react";
import { BrowserRouter } from "../node_modules/react-router-dom/dist/index";
import { Routing } from "./router/index";
import { Provider } from 'react-redux';
import { store } from './app/store';


const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>
);

export default App;
