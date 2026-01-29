# Stablecoin Gasless Transfer: Integration Guide

This page provides practical integration instructions for using Kite's Stablecoin Gasless Transfer service. It is intended for developers who want to implement gasless token transfers using signed authorizations (EIP-3009).

**Design & Architecture** - For protocol rationale, trust model, and design considerations, refer to [Stablecoin Gasless Transfer – Design Guide](https://docs.gokite.ai/kite-chain/stablecoin-gasless-transfer) Kite Stablecoin

## Overview

Kite's Gasless Transfer service allows users to transfer supported stablecoins without holding native gas tokens. Instead, transactions are authorized off-chain using EIP-3009 signed messages, and executed on-chain by Kite's relayer infrastructure.

This model enables:

- Gasless UX for users
- Secure, replay-protected transfers
- Wallet and agent-based payment flows
- Enterprise-friendly stablecoin payments

## Supported Networks

- **Testnet**
- **Mainnet**

Network selection is done via the request path:

**Service endpoint** - `https://gasless.gokite.ai`

## API Reference

### List Supported Tokens

Retrieve the list of tokens enabled for gasless transfers on each network.

**Endpoint** - `GET /supported_tokens`

**Example Request:**

```bash
curl https://gasless.gokite.ai/supported_tokens | jq .
```

**Example Response:**

```json
{
  "mainnet": [
    {
      "address": "0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e",
      "balance_threshold": "0",
      "decimals": 6,
      "eip712_name": "Bridged USDC (Kite AI)",
      "eip712_version": "2",
      "minimum_transfer_amount": "10000",
      "name": "Bridged USDC (Kite AI)",
      "symbol": "USDC.e"
    }
  ],
  "testnet": [
    {
      "address": "0x8E04D099b1a8Dd20E6caD4b2Ab2B405B98242ec9",
      "balance_threshold": "0",
      "decimals": 18,
      "eip712_name": "PYUSD",
      "eip712_version": "1",
      "minimum_transfer_amount": "10000000000000000",
      "name": "PYUSD",
      "symbol": "PYUSD"
    }
  ]
}
```

**Response Fields:**

- `address`: The contract address of the token
- `balance_threshold`: The minimum balance required for the sender to use this service (in token's smallest unit)
- `decimals`: The number of decimals used by the token
- `eip712_name`: The EIP-712 domain name used for signature generation
- `eip712_version`: The EIP-712 domain version used for signature generation
- `minimum_transfer_amount`: The minimum transfer amount allowed (in token's smallest unit, e.g., wei)
- `name`: The display name of the token
- `symbol`: The token symbol

### Submit Transfer Request

Submit a gasless transfer request using EIP-3009 signed authorization.

**Endpoint:** `POST /testnet` or `POST /mainnet`

**Request Path:**

- Use `/testnet` for testnet network transfers
- Use `/mainnet` for mainnet network transfers

**Request Method:** `POST`

**Request Body Example:**

```json
{
  "from": "0x570DEDa407f5fC26Fc2016E19FD4B65Cb8446914F",
  "to": "0x2Ba214b0AfCa4Cad5A6A9b8AF05032cE574F16e6",
  "value": "1000",
  "validAfter": "1768925639",
  "validBefore": "1768925888",
  "tokenAddress": "0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e",
  "nonce": "0x55ce4241653a0efe60c6272d39dd7b13eba92b482bf46e101b3af92af6443a2c",
  "v": 27,
  "r": "0x82cf40577c6520f48a57f089c9ea48bdeb7cb3f687b5fdbaf495a582d137c12e",
  "s": "0x06be1848101880d34337cebb5fc535ffa2d462b8cca92e9784b62835bbc46d17"
}
```

**Request Parameters:**

All parameters follow the EIP-3009 specification:

- **Network Path**: Use `/testnet` or `/mainnet` according to your target network
- `tokenAddress`: Must be a token address listed in the `/supported_tokens` API response
- `value`: The transfer amount in the token's smallest unit (e.g., wei for 18-decimal tokens)
- `validAfter`: The timestamp after which the transfer is valid. Must be greater than the latest block timestamp of the associated Kite network, otherwise the transaction simulation will fail
- `validBefore`: The timestamp before which the transfer must be executed. Currently, transfers are only accepted within 30 seconds from the current time
- `nonce`: A unique nonce for this transfer. Each nonce can only be used once
- `v`, `r`, `s`: ECDSA signature components. See EIP-3009 for detailed signature generation instructions

**Response Fields:**

- `txHash`: The transaction hash for the gasless transfer.

## Implementation Reference

For a complete TypeScript implementation example demonstrating how to generate the EIP-3009 signature and submit the request, refer to: [GitHub EIP-3009 example](https://gist.github.com/thor-wong/2438c0e3970e22c75f4302ac2d75ac1b)