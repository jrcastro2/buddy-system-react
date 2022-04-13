import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "semantic-ui-less/semantic.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MediaContextProvider } from "./components/Media/media";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import history from "@history";
import RoutesSwitch from "./routes/RoutesSwitch";

export const ReduxStore = configureStore();

ReactDOM.render(
  <BrowserRouter history={history}>
    <MediaContextProvider>
      <Provider store={ReduxStore}>
        <App />
        <RoutesSwitch />
      </Provider>
    </MediaContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
