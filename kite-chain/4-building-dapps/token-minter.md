# Token Minter

## Deploying an ERC-20 Token on the KiteAI Testnet

### Overview

This guide provides a comprehensive walkthrough for deploying an ERC-20 token on the KiteAI Testnet. It covers two primary methods:

1. Remix IDE: A beginner-friendly, browser-based approach.
2. Foundry: A command-line toolchain suitable for advanced users.

Before diving into the deployment steps, it's essential to understand the KiteAI network and the significance of deploying on this platform.

***

### Understanding the KiteAI Network

#### What is KiteAI?

KiteAI is an EVM-compatible L1 blockchain designed to empower decentralized AI economies using, powered by Proof of AI (PoAI). This innovative consensus mechanism that ensures fair attribution and transparent rewards for contributors across agents, models, and data.

#### Key Features:

* Chain ID: 2368 (0x940)
* Native Currency: KITE
* Block Gas Limit: 400,000,000
* Testnet Faucet: [https://faucet.gokite.ai/](https://faucet.gokite.ai/)
* Network Addition: [Chainlist - KiteAI Testnet](https://chainlist.org/chain/2368)

#### Why Deploy on KiteAI?

Deploying on the KiteAI network allows developers to:

* Test and validate smart contracts in an AI-enhanced environment.
* Participate in a forward-thinking ecosystem that combines blockchain and AI technologies.

***

### What You Will Do

* Create an ERC-20 token smart contract using OpenZeppelin's standard implementation.
* Deploy the contract to the KiteAI Testnet using:
*
  * Remix IDE (beginner-friendly)
  * Foundry (advanced CLI tool)

***

### What You Will Need

* A Web3 wallet (e.g., MetaMask)
* Test Kite tokens (claim from [faucet.gokite.ai](https://faucet.gokite.ai/))
* Access to the KiteAI Testnet via MetaMask. (via [Chainlist](https://chainlist.org/chain/2368))
* Basic knowledge of Solidity and smart contract development.

***

### Understanding ERC-20 Token?

An ERC-20 token is a standardized smart contract on Ethereum and EVM-compatible blockchains that defines a set of rules for fungible tokens. These rules include how tokens are transferred, how users can access data about a token, and the total supply of tokens.

#### Key Functions:

* totalSupply(): Returns the total token supply.
* balanceOf(address): Returns the account balance of another account with address address.
* transfer(address, uint256): Transfers amount of tokens to address recipient.
* approve(address, uint256): Allows spender to withdraw from your account multiple times, up to the amount.
* transferFrom(address, address, uint256): Transfers amount tokens from address sender to address recipient.
* allowance(address, address): Returns the amount which spender is still allowed to withdraw from the owner.

***

### Method 1: Deploying via Remix IDE

#### Step 1: Add KiteAI Testnet to MetaMask

1. Visit [Chainlist - KiteAI Testnet](https://chainlist.org/chain/2368).
2. Connect your MetaMask wallet.
3. Add the KiteAI Testnet to your networks.

#### Step 2: Obtain Test Kite Tokens

1. Visit the [KiteAI Faucet](https://faucet.gokite.ai/).
2. Connect your MetaMask wallet.
3. Request 0.5 Kite tokens.

#### Step 3: Write the Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org).
2. Create a new file named ”MyToken.sol”.

Paste the following code:

| <p>// SPDX-License-Identifier: MIT<br>pragma solidity ^0.8.20;<br><br>import "@openzeppelin/contracts/token/ERC20/ERC20.sol";<br><br>contract MyToken is ERC20 {<br>    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {<br>        _mint(msg.sender, initialSupply);<br>    }<br>}</p> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

3. This contract uses OpenZeppelin's ERC-20 implementation to create a token named "MyToken" with the symbol "MTK".

#### Step 4: Compile the Contract

1. Navigate to the "Solidity Compiler" tab in Remix.
2. Ensure the compiler version is set to 0.8.20 or higher.
3. Click "Compile MyToken.sol".



#### Step 5: Deploy the Contract

1. Go to the "Deploy & Run Transactions" tab.
2. Set the environment to "Injected Provider - MetaMask".
3. Ensure MetaMask is connected to the KiteAI Testnet.
4. Enter the initial supply (e.g., 1000000 for 1 million tokens).
5. Click "Deploy".
6. Confirm the transaction in MetaMask.

Once deployed, your ERC-20 token will be live on the KiteAI Testnet.

***

### Method 2: Deploying via Foundry

#### Step 1: Install Foundry

If you haven't installed Foundry:

| <p>curl -L https://foundry.paradigm.xyz | bash<br>foundryup</p> |
| --------------------------------------------------------------- |

\


#### Step 2: Initialize the Project

| <p>forge init MyTokenProject<br>cd MyTokenProject</p> |
| ----------------------------------------------------- |

\


#### Step 3: Install OpenZeppelin Contracts

| forge install OpenZeppelin/openzeppelin-contracts |
| ------------------------------------------------- |

\


#### Step 4: Configure Remappings

In foundry.toml, add:

| <p>[profile.default]<br>remappings = ["@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/"]</p> |
| ----------------------------------------------------------------------------------------------------------- |

\


#### Step 5: Write the Smart Contract

Create a new file at src/MyToken.sol:

| <p>// SPDX-License-Identifier: MIT<br>pragma solidity ^0.8.20;<br><br>import "@openzeppelin/contracts/token/ERC20/ERC20.sol";<br><br>contract MyToken is ERC20 {<br>    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {<br>        _mint(msg.sender, initialSupply);<br>    }<br>}<br><br></p> |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

#### Step 6: Create Deployment Script

Create a new file at script/Deploy.s.sol:

| <p>// SPDX-License-Identifier: MIT<br>pragma solidity ^0.8.20;<br><br>import "forge-std/Script.sol";<br>import "../src/MyToken.sol";<br><br>contract DeployScript is Script {<br>    function run() external {<br>        vm.startBroadcast();<br>        new MyToken(1000000 * 10 ** 18);<br>        vm.stopBroadcast();<br>    }<br>}<br><br></p> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

#### Step 7: Set Environment Variables

Create a .env file in the root directory:

| <p>PRIVATE_KEY=your_private_key<br>RPC_URL=https://rpc-testnet.gokite.ai</p> |
| ---------------------------------------------------------------------------- |

Replace your\_private\_key with your wallet's private key that holds Kite tokens.

#### Step 8: Build and Deploy

| <p>source .env<br>forge build<br>forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast</p> |
| -------------------------------------------------------------------------------------------------------------------------------------------- |

\


After deployment, Foundry will provide the contract address and transaction details.

***

### Conclusion

Deploying an ERC-20 token on the KiteAI Testnet is straightforward using either Remix IDE or Foundry. By following this guide, developers can:

* Understand the KiteAI network and its unique features.
* Write and deploy ERC-20 tokens efficiently.
* Choose the deployment method that best suits their experience level.

For further exploration, consider integrating additional functionalities into your token, such as minting, burning, or pausing transfers, using OpenZeppelin's extensive library of smart contract modules.

\
