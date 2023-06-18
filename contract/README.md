# Hexagon Smart Contract

This folder contains the Solidity smart contract code for Hexagon. The smart contract is deployed on the Filecoin FVM Blockchain and provides functionalities for secure drug authentication.

## Cloning the Repo

Open up your terminal (or command prompt) and navigate to a directory you would like to store this code on. Once there type in the following command:


```
git clone https://github.com/hexdee/hexagon.git
cd hexagon/contract
yarn install
```



## Get a Private Key

You can get a private key from a wallet provider [such as Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).


## Add your Private Key as an Environment Variable

Add your private key as an environment variable by running this command:

 ```
export PRIVATE_KEY='abcdef'
```

If you use a .env file, don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!


## Get the Deployer Address

Run this command:
```
yarn hardhat get-address
```

This will show you the ethereum-style address associated with that private key and the filecoin-style f4 address (also known as t4 address on testnets)! The Ethereum address can now be exclusively used for almost all FEVM tools, including the faucet.


## Fund the Deployer Address

Go to the [Calibrationnet testnet faucet](https://faucet.calibration.fildev.network/), and paste in the Ethereum address from the previous step. This will send some calibration testnet FIL to the account.


## Run tests

```
yarn hardhat test
```

## Deploy the Contracts

Type in the following command in the terminal to deploy the smart contract:

 ```
yarn hardhat run scripts/deploy.js
```


