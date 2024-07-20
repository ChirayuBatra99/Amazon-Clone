

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./redux/app/store"
import Contextprovider from "./Components/context/Contextprovider"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Contextprovider>
      {/* see what is this */}
      <Provider store={store}>
        <App />
      </Provider>
    </Contextprovider>

  </React.StrictMode>

);


reportWebVitals();

