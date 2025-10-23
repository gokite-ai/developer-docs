---
description: A sample counter dApp built with KITE AI testnet & React
---

# Counter dApp

## Building the dApp with React

We will create a simple React app to interact with our counter contract using[ Ethers.js](https://docs.ethers.org/).

A sample counter dApp built with KITE AI testnet & React -  [https://kite-counter-dapp.vercel.app/](https://kite-counter-dapp.vercel.app/)&#x20;

**Step 1: Set Up React Application**

In your project directory, create a new React app using Create React App:

```
npx create-react-app counter-dapp-frontend  
cd counter-dapp-frontend  
npm install ethers
```

**Step 2: Create a Counter Component**

Replace the content of **src/App.js** with the following code:

```
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
// Replace with your deployed contract address
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
// ABI from your Counter contract
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "count",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
function App() {
  const [count, setCount] = useState(0);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  // Initialize provider and contract
  useEffect(() => {
    if (window.ethereum) {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      const tempContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, tempProvider.getSigner());
      setContract(tempContract);
      // Request account access if needed
      window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      alert("Please install MetaMask!");
    }
  }, []);
  // Fetch count from contract
  const fetchCount = async () => {
    if (contract) {
      const currentCount = await contract.getCount();
      setCount(currentCount.toNumber());
    }
  };
  // Call increment function
  const incrementCount = async () => {
    if (contract) {
      const tx = await contract.increment();
      await tx.wait();
      fetchCount();
    }
  };
  useEffect(() => {
    fetchCount();
  }, [contract]);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Kite AI Counter DApp</h2>
        <p>Current Count: {count}</p>
        <button onClick={incrementCount}>Increment</button>
      </header>
    </div>
  );
}
export default App;
```

**Important:** Replace "YOUR\_DEPLOYED\_CONTRACT\_ADDRESS" with the actual contract address you received when deploying your contract from the previous step [Developing Smart Contracts](../3-developing/README.md)

**Step 3: Run the Frontend**

Start your React development server:

```
npm start
```

Open your browser and navigate to[ http://localhost:3000](http://localhost:3000). With MetaMask connected to the KiteAI Testnet, you should see your counter value and a button to increment it. See Metamask settings for [KITE AI here. ](../kite-testnet-tools.md#kite-ai-metamask-settings)

Congratulations on building your basic counter dApp on the Kite AI blockchain testnet! You’ve successfully.&#x20;

Github Link - [https://github.com/gokite-ai/kite\_counter\_dapp](https://github.com/gokite-ai/kite_counter_dapp)&#x20;
