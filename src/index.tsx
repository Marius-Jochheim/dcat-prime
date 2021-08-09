import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";
import { DAppProvider } from "@usedapp/core";
import { ColorModeScript } from "@chakra-ui/react"

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <ColorModeScript initialColorMode="dark" />
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
