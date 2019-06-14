import React from "react";
import ReactDOM from "react-dom";
import "@babel/polyfill";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import App from "./App";

import "./i18n";
import { socketClient} from './socket/connection'

socketClient()
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("app")
);