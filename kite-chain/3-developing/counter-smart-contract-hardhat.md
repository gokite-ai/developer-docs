Build & Deploy a Counter Contract on Kite AI using Hardhat

What is Hardhat?

Hardhat is a local development environment for Ethereum-style (EVM) blockchains. It lets you:
	•	Compile, test, and deploy contracts from your machine.
	•	Script deployments and verifications (great for CI/CD).
	•	Fork networks locally, run a local node, and debug with stack traces and console logging.
	•	Use a rich plugin ecosystem (ethers.js, Etherscan-style verification, gas reporters, coverage, etc.).

In this section, we will go over Hardhat workflow:
    
    - Set up & Scaffold project
    - Write contract
    - Compile
    - Configure network
    - Deploy via script
    - Interact via console/scripts

Prerequisites:

	•	Node.js 18+ and npm (or pnpm/yarn)
	•	A funded wallet (for Kite testnet/mainnet)
	•	MetaMask (optional -  recommended for managing keys)
	•	Git (recommended)

### 1. Create a Hardhat Project:

- Create and enter a new folder:

    `mkdir kite-counter-hardhat && cd kite-counter-hardhat`

- Initialize a Node project:
    
    `npm init -y`

- Install Hardhat and tooling:

    `npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv`

- Scaffold a Hardhat project (choose “Create a TypeScript project” when prompted):

    `npx hardhat`

This creates a hardhat.config.ts, sample tests, and a basic project structure.

### 2. Add Envrironment variable:

Create a .env file in the project root

`touch.env`
 
Put your secrets and Kite endpoints in it (replace placeholders):

Wallet private key (no 0x prefix or with 0x — Hardhat supports either):
    
    PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE

Kite AI network (testnet or mainnet) RPC:

    KITE_RPC_URL=https://rpc-testnet.gokite.ai/

Chain ID (number):

    KITE_CHAIN_ID=2368

KITE EXPLORER URL:

    KITE_EXPLORER_BROWSER_URL=https://testnet.kitescan.ai/ 

.gitignore (ensure secrets aren’t committed):

    node_modules
    .env
    cache
    artifacts
    typechain-types

### 3. Configure hardhat

Open hardhat.config.ts and replace with:

```
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const KITE_RPC_URL = process.env.KITE_RPC_URL || "";
const KITE_CHAIN_ID = process.env.KITE_CHAIN_ID ? Number(process.env.KITE_CHAIN_ID) : undefined;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    // Rename to "kite" or "kiteMainnet" as you prefer
    kiteTestnet: {
      url: KITE_RPC_URL,
      chainId: KITE_CHAIN_ID,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  // Optional: If Kite explorer is Etherscan-compatible, enable this
  etherscan: {
    apiKey: {
      kiteTestnet: process.env.EXPLORER_API_KEY || "",
    },
    customChains: [
      {
        network: "kiteTestnet",
        chainId: KITE_CHAIN_ID || 0,
        urls: {
          apiURL: process.env.KITE_EXPLORER_API_URL || "",
          browserURL: process.env.KITE_EXPLORER_BROWSER_URL || "",
        },
      },
    ],
  },
};

export default config;
```

### 4. Write the Counter Contract

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Counter cannot be negative");
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
```

### 5. Compile

```npx hardhat compile```

### 6. Write a Deployment Script

Create scripts/deploy.ts:

```
import { ethers } from "hardhat";

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();

  const address = await counter.getAddress();
  console.log("Counter deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 7. Fund Your Deployer & Add the Network (MetaMask)

	- Add the Kite AI network to MetaMask using the same RPC URL and Chain ID you placed in .env.
	- Fund the deployer address with KITE (or test KITE on testnet) to cover gas.
	- Ensure the private key in .env matches the funded account.

### 8. Deploy to Kite AI

```npx hardhat run scripts/deploy.ts --network kiteTestnet```

Output example:
` Counter deployed to: 0xABCDEF1234567890abcdef1234567890ABCDEF12` 

Important - Copy and save this address on your notepad. 

### 9. Verify if deployment went through successfully

    -  VIsit the explorer site - https://testnet.kitescan.ai/ 
    - Copy and paste the deplotment contract from previous step on the search bar
    - Look up the deployer details ( your public key) and contract details on the results page. 

### 10. Troubleshooting

	•	Insufficient funds for gas * price + value - Fund your deployer wallet with KITE (or test KITE).
	•	Invalid sender / nonce too low - Reset your account nonce in MetaMask or wait for pending txs to clear; you can also specify a higher nonce manually.
	•	Unsupported chainId - Ensure KITE_CHAIN_ID in .env matches the network’s actual chain ID.
	•   No PRIVATE_KEY set - Add PRIVATE_KEY to .env and restart your command.


### 11. Security & Best Practices
	•	Never commit secrets (.env in .gitignore).
	•	Use a deployment-only wallet with limited funds.
	•	For teams, consider multi-sig for production keys and use a deployer bot with restricted permissions.
	•	Pin exact versions in package.json to ensure reproducibility.
	•	Keep compiler optimizations consistent across environments.

If you wish to integrate this deployed contract to a front-end with a user interface, visit the below link and follow the steps:
-   [Counter dApp Tutorial](../4-building-dapps/counter-dapp.md)