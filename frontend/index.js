// React
import React from "react";
import * as ReactDOM from 'react-dom';
import App from "../frontend/src/App"
import { BrowserRouter } from "react-router-dom";
import "@fontsource/josefin-sans";
import "@fontsource/roboto";
import "./index.css";

// NEAR
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  // ReactDOM.render(
  //   <App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />,
  //   document.getElementById('root')
  // );

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}
