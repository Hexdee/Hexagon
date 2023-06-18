


# Hexagon Frontend

This folder contains the code for the frontend of the Hexagon. The frontend is built using React, a popular JavaScript library for building user interfaces.

## Setup

1. Ensure that Node.js and npm (Node Package Manager) are installed on your machine.
2. Clone this repository and navigate to the `frontend` folder.
3. Install the required dependencies by running the following command:
   ```
   npm install
   ```

## Configuration

Before running the frontend, make sure to configure the connection to the backend and blockchain. Update the necessary variables in the `.env` file with the appropriate values:

```
REACT_APP_BACKEND_URL=<backend_url>
REACT_APP_BLOCKCHAIN_PROVIDER=<blockchain_provider>
REACT_APP_CONTRACT_ADDRESS=<contract_address>
```

Replace `contract address` in [hexagon.js](./src/utils/hexagon.js) with the deployed smart contract address.

## Running the Frontend

To start the frontend, run the following command from the `frontend` folder:

```
npm start
```

The frontend should now be accessible at `http://localhost:3000` in your web browser.

