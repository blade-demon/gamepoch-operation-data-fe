import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import rootReducers from "./reducers";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(rootReducers);

const StoreApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<StoreApp />, document.getElementById("root"));

registerServiceWorker();
