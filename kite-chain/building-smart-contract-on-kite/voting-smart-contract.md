---
description: Building & deploying a smart contract on KITE AI with Remix
---

# Voting Smart contract

Please follow the below steps to build your smart contract on Kite AI:

**Step 1: Open** [Remix IDE](https://remix.ethereum.org/)

* Navigate to Remix IDE in your browser.
* Once loaded, you’ll see the file explorer on the left-hand side where you can manage your Solidity files.

**Step 2: Create a New File**

* In the Remix file explorer, click the ”+” icon to create a new file.
* Name your file voting.sol

**Step 3: Write the Solidity Code**

Copy and paste the following Solidity code into your Counter.sol file:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    uint public option1Votes;
    uint public option2Votes;
    mapping(address => bool) public hasVoted;

    function voteOption1() public {
        require(!hasVoted[msg.sender], "Already voted");
        option1Votes++;
        hasVoted[msg.sender] = true;
    }

    function voteOption2() public {
        require(!hasVoted[msg.sender], "Already voted");
        option2Votes++;
        hasVoted[msg.sender] = true;
    }

    function getVotes() public view returns (uint, uint) {
        return (option1Votes, option2Votes);
    }
}
```

This smart contract does the following:

* **option1Votes** and **option2Votes** store the vote counts.
* **hasVoted** tracks whether an address has already voted.
* **voteOption1**() and **voteOption2**() allow one-time voting.
* **getVotes**() returns the current counts for both options.

**Step 4**: **Compile** **the Contract**

* On the left sidebar, click the “Solidity Compiler” tab (the one with the “S” icon).
* Ensure the compiler version is set to ^0.8.20 version.
* Click “Compile Counter.sol”.
* Check the filename and code for typos or version mismatches, if you encounter any errors.&#x20;

**Step 5: Deploy the Contract**

* Switch to the “Deploy & Run Transactions” tab (the Ethereum icon on the left sidebar).
* Under “Environment”, select “Injected Metamask or WalletConnect”. This will connect Remix to your MetaMask (make sure MetaMask is set to the Kite AI Testnet).
* Verify that your account is correctly connected.
* In the “Contract” dropdown, select **voting**.
* Click the “Deploy” button and confirm the deployment transaction in MetaMask.
* Once deployed, your contract will appear under “Deployed Contracts”.

**Step** **6:** **Interact with Your Contract**

* Expand your deployed Counter contract in Remix.
* You can call the getCount() function to check the current counter value.
* Click the “increment” button to call the increment() function and “decrement” button to call the decrement() function. Confirm the transaction in MetaMask.
* After the transaction is confirmed, call getCount() again to see the updated counter value.

Github Link - [https://github.com/gokite-ai/kite\_voting\_dapp](https://github.com/gokite-ai/kite_voting_dapp)&#x20;
