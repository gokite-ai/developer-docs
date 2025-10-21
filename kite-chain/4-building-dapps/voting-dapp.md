---
description: A sample voting dApp built with KITE AI testnet & React
---

# Voting dApp

## Building the dApp with React

We will create a simple React app to interact with our voting contract using[ Ethers.js](https://docs.ethers.org/).

A sample voting dApp built with KITE AI testnet & React -  [kite-voting-dapp.vercel.app/](https://kite-voting-dapp.vercel.app/)

**Step 1: Set Up React Application**

In your project directory, create a new React app using Create React App:

In your project directory, create a new React app using Create React App:

```
npx create-react-app voting-dapp  
cd voting-dapp
npm install ethers
```

**Step 2: Create a Voting Component**

Replace the content of **src/App.js** with the following code:

```
import { useState } from "react";
import { ethers } from "ethers";
import CONTRACT_ABI from "../abis/Voting.json";
import "./index.css";

const CONTRACT_ADDRESS = "0x10AD19ad5589Ba45fa8225B41C79021519f64501";
const KITE_TESTNET_CHAIN_ID = 2368;

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });
  const [hasVoted, setHasVoted] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const { chainId } = await provider.getNetwork();

    if (parseInt(chainId) !== KITE_TESTNET_CHAIN_ID) {
      setError("Wrong network! Please switch to Kite Testnet.");
      return;
    }

    const address = await signer.getAddress();
    setProvider(provider);
    setWallet(address);

    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    setContract(contractInstance);
    setError("");

    const voted = await contractInstance.hasVoted(address);
    setHasVoted(voted);

    const [opt1, opt2] = await contractInstance.getVotes();
    setVotes({ option1: Number(opt1), option2: Number(opt2) });
  };

  const voteForOption = async (option) => {
    if (!contract || hasVoted) return;

    try {
      const tx =
        option === 1
          ? await contract.voteOption1()
          : await contract.voteOption2();
      await tx.wait();

      const [opt1, opt2] = await contract.getVotes();
      setVotes({ option1: Number(opt1), option2: Number(opt2) });
      setHasVoted(true);
    } catch (err) {
      setError(err.reason || "Transaction failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between mainbg">
      <div className="flex flex-col items-center p-6 flex-1 w-full">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!wallet ? (
          <button
            onClick={connectWallet}
            className="btn-secondary cursor-pointer mt-24"
          >
            Connect Wallet
          </button>
        ) : (
          <div><p className="wallet-address"> Wallet: {wallet}</p>

      <div className="card">
        <h2>
          🗳️ <span>Voting</span>
        </h2>
        <p className="vote-count">Option 1: {votes.option1} votes</p>
        <p className="vote-count">Option 2: {votes.option2} votes</p>
{!hasVoted ? (
    <div className="button-group">
      <button onClick={() => voteForOption(1)} className="btn-primary">
        Vote Option 1
      </button>
      <button onClick={() => voteForOption(2)} className="btn-primary">
        Vote Option 2
      </button>
    </div>
  ) : (
    <p className="vote-status">You have already voted!</p>
  )}  
</div>
</div>
        )}
      </div>
    </div>
  );
}

export default App;
```

**Important:** Replace "YOUR\_DEPLOYED\_CONTRACT\_ADDRESS" with the actual contract address you received when deploying your contract from the previous step [Developing Smart Contracts](../3-developing/README.md)

**Step 3: Run the Frontend**

Start your React development server:

Copy

```
npm run dev
```

Open your browser and navigate to[ http://localhost:3000](http://localhost:3000/). With MetaMask connected to the KiteAI Testnet, you should see your vote updated on the screen. See Metamask settings for [KITE AI here. ](../kite-testnet-tools.md#kite-ai-metamask-settings)

Congratulations on building your basic voting dApp on the Kite AI blockchain testnet! You’ve successfully.

Github Link & Code - [https://github.com/gokite-ai/kite\_voting\_dapp](https://github.com/gokite-ai/kite_voting_dapp)
