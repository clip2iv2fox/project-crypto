import * as React from "react";

import * as ReactDom from "react-dom/client";

import App from "./App";
import "@styles/styles.scss";
import { CoinProvider } from "./configs/CoinContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDom.createRoot(rootElement).render(
    <React.StrictMode>
      <CoinProvider>
        <App />
      </CoinProvider>
    </React.StrictMode>
  );
}
