# GoKite Account Abstraction SDK – Developer Guide

The GoKite Account Abstraction (AA) SDK enables developers to build smart contract wallets, manage transactions, and implement rule-based agent spending on the Kite AI Layer 1 chain using ERC-4337 Account Abstraction principles. 

## What is the GoKite AA SDK?

The SDK provides a simple interface to:
- Create and manage Account Abstraction wallets.
- Deploy upgradeable vaults for AI agents using proxy contracts.
- Set spending rules for token budgets and providers.
- Send gasless transactions via bundler integration.
- Integrate third-party authentication (Privy, Particle, etc.) for user signing.

**Package:** `gokite-aa-sdk` on npm

## Installation

```bash
npm install gokite-aa-sdk
```

## Quick Start

### Initialize the SDK

```typescript
import { GokiteAASDK } from 'gokite-aa-sdk';

const sdk = new GokiteAASDK(
  'kite_testnet',                                  // Network name
  'https://rpc-testnet.gokite.ai',                // Kite RPC URL
  'https://bundler-service.staging.gokite.ai/rpc/' // Bundler RPC
);
```

### Get Account Abstraction Wallet Address

```typescript
const signer = '0xYourEOAAddress';

const aaWalletAddress = sdk.getAccountAddress(signer);

console.log('AA Wallet:', aaWalletAddress);
```

## Authentication

Implement `signFunction` with your preferred wallet/auth SDK:

```typescript
// example with ethers: 
const signFunction = async (userOpHash: string): Promise<string> => {
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!);
  return signer.signMessage(ethers.getBytes(userOpHash));
};
```

## Construct and Send User Operation

```typescript
// Simple ETH transfer example
const sendEthRequest = {
  target: '0xTargetAddress',
  value: ethers.parseEther('0.001'),
  callData: '0x'
};

const signFunction = async (userOpHash: string): Promise<string> => {
  // your sign Function
};

const result = await sdk.sendUserOperationAndWait(
  signerAddress, // your aa signer address
  sendEthRequest,
  signFunction
);

if (result.status.status === 'success') {
  console.log('✅ ETH transfer successful!');
  console.log('Transaction hash:', result.status.transactionHash);
} else {
  console.log('❌ ETH transfer failed:', result.status.reason);
}
```

## Batch Operation

```typescript
const batchRequest = {
  targets: [
    '0xTargetAddress', // ETH recipient
    '0xERC20Address',  // ERC20 token contract for approve
    '0xERC20Address'   // ERC20 token contract for transfer
  ],
  values: [
    ethers.parseEther('0.01'), // Send 0.01 ETH
    0n,                        // No ETH for approve call
    0n                         // No ETH for transfer call
  ],
  callDatas: [
    // Operation 1: ETH transfer
    '0x', 

    // Operation 2: Approve spender to use 1000 tokens
    ethers.Interface.from(['function approve(address spender, uint256 amount)']).encodeFunctionData('approve', [
      '0xSpenderAddress',
      ethers.parseUnits('1000', 18)   // Approve 1000 tokens
    ]),
   
    // Operation 3: Transfer 100 tokens to recipient
    ethers.Interface.from(['function transfer(address to, uint256 amount)']).encodeFunctionData('transfer', [
      '0xRecipient', // Token recipient
      ethers.parseUnits('100', 18)  // Transfer 100 tokens
    ])
  ]
};

const signFunction = async (userOpHash: string): Promise<string> => {
  // your sign Function
};

const result = await sdk.sendUserOperationAndWait(
  signerAddress, // your aa signer address
  batchRequest,
  signFunction
);

if (result.status.status === 'success') {
  console.log('Batch operations succeeded!');
  console.log('Transaction hash:', result.status.transactionHash);
} else {
  console.log('❌ Batch operations failed:', result.status.reason);
}
```

## Core Features & General Usage

### Deploy ClientAgentVault Proxy

Create a secure, upgradeable vault for your agent.

```typescript
await sdk.sendUserOperationAndWait(eoa, {
  target: aaWalletAddress,
  value: 0n,
  callData: encodedPerformCreateCallData
}, signFunction);
```

- Uses UUPS pattern.
- Initializes with settlement token and AA wallet as admin.

### Configure Spending Rules

Define budgets & time windows for an agent's transactions.

```typescript
const rules = [
  {
    timeWindow: 86400n, // 24 hrs
    budget: ethers.parseUnits('100', 18), // 100 tokens
    initialWindowStartTime: startTimestamp,
    targetProviders: []
  }
];

await sdk.sendUserOperationAndWait(eoa, {
  target: proxyAddress,
  callData: encodedConfigureSpendingRules
}, signFunction);
```

### Withdraw Funds

Move tokens from the vault:

```typescript
await sdk.sendUserOperationAndWait(eoa, {
  target: proxyAddress,
  callData: withdrawCallData
}, signFunction);
```

### View Rules & Balances (Read-Only)

Fetch spending rules:

```typescript
const contract = new ethers.Contract(proxyAddress, abi, provider);

const rules = await contract.getSpendingRules();
```

Check token balance:

```typescript
const balance = await tokenContract.balanceOf(proxyAddress);
```

## Useful Addresses on Kite Testnet

- **Settlement Token:** `0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63`
- **Settlement Contract:** `0x8d9FaD78d5Ce247aA01C140798B9558fd64a63E3`
- **ClientAgentVault Implementation:** `0xB5AAFCC6DD4DFc2B80fb8BCcf406E1a2Fd559e23`

## Resources

- **NPM Package:** [gokite-aa-sdk](https://www.npmjs.com/package/gokite-aa-sdk)
