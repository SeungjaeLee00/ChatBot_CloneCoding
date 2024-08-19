import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk";


import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from "./_reducers";

const creatStoreWithMiddleware = configureStore({
  reducer: reducers,
  middleware: () => {
    return [thunk, promiseMiddleware];
  },
  devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <Provider store={creatStoreWithMiddleware}>
        <App />
      </Provider>
);

reportWebVitals();
