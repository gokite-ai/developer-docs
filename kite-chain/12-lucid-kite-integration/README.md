---
description: Kite Integration with Lucid - Native yield-generating USDC liquidity for the Kite ecosystem
---

# Kite Integration with Lucid

Lucid has integrated with Kite to bring native yield-generating stablecoin liquidity (USDC) to the Kite ecosystem. This integration enables developers, apps, and ecosystem partners to use canonical, cross-chain stablecoins that automatically generate yield while remaining fully redeemable across supported networks.

## Lucid's Native Yield Layer for Stablecoin Liquidity

Lucid's Kite is a native yield layer for stablecoin liquidity that transforms idle USDC into yield-bearing assets without changing their usability. Kite introduces L-USDC, a bridge-agnostic, yield-generating version of USDC designed to operate seamlessly across chains.

This integration provides ecosystems with a canonical stablecoin layer that works from day one—without fragmentation or custom bridge logic, a unified stablecoin primitive for cross-chain apps, DeFi protocols, and infrastructure partners building on Kite.

## High-Level Architecture

Kite consists of four core components:

### 1. Lock Contracts

Each Kite asset has a dedicated lock contract that holds native USDC on a selected lock chain.

* Default lock chains:
  * USDC → Arbitrum
* Configurable per ecosystem or deployment
* Manages collateral custody, withdrawals, and yield deposits
* Supports isolated pools for custom deployments

### 2. Yield Layer

* 90% of collateral is deposited into Aave v3 to generate yield
* 10% remains on-chain as an immediate withdrawal buffer
* Automated rebalancing maintains buffer thresholds
* Supports future expansion to additional money markets
* Optional isolated strategies for ecosystems requiring custom risk profiles

### 3. Mint & Burn System

* L-USDC is minted and burned via Lucid's multi-bridge routing architecture
* Supports all major bridge ecosystems
* Minting occurs once collateral reaches the lock chain
* Burning releases collateral back to the user via routed settlement

### 4. Multi-Hop Routing Engine

* Enables single-flow transactions across multiple bridges
* Users can start on any supported chain and mint L-stables on their target chain
* Eliminates the need for direct canonical bridge paths
* Improves UX and liquidity accessibility across fragmented ecosystems

## Liquidity & Risk Management

### Liquidity Buffer

* Maintains a minimum 10% on-chain buffer for immediate redemptions

### Automated Rebalancing

* Continuously rebalances between Aave and lock contracts
* Ensures buffer availability while maximizing capital efficiency

### Just-In-Time Liquidity

* If withdrawals exceed buffer capacity, liquidity is pulled from Aave automatically
* Settles within standard bridge timelines

### Utilization Monitoring

* Monitors Aave pool utilization in real time
* Dynamically increases buffer size during high-stress periods

## Minting & Redemption Flow

### Minting

1. User sends USDC on any supported chain
2. Multi-hop routing moves funds to the lock chain
3. Lock contract registers collateral
4. L-USDC is minted on the destination chain
5. Yield generation begins automatically

### Redemption

1. User burns L-USDC
2. Collateral is released from the lock contract
3. JIT liquidity is used if buffer is insufficient
4. Native stablecoin is routed back to the user

## Security & Audits

* Audited smart contracts
* Lock contracts, mint/burn controllers, and yield logic audited by Halborn
* Continuous monitoring and operational safeguards
* Designed for institutional-grade deployments

## Controller Contracts for Kite

### KiteAI (chain id: 2366)

#### USDC

* **Controller:** `0x92E2391d0836e10b9e5EAB5d56BfC286Fadec25b`
* **Deployed Chains:** Avalanche, KiteAI
* **Activated bridge adapters:** LayerZero
* **Token on Avalanche:** `0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e`
* **Token on KiteAI:** `0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e`

#### WETH

* **Controller:** `0x638d1c70c7b047b192eB88657B411F84fAc74681`
* **Deployed Chains:** Avalanche, KiteAI
* **Activated bridge adapters:** LayerZero
* **Token on Avalanche:** `0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB`
* **Token on KiteAI:** `0x3D66d6c3201190952e8EA973F59c4428b32D5F9b`

#### USDT

* **Controller:** `0x80bA7204f060Fd321BFE8d4F3aB2E2bF4e6fCe49`
* **Deployed Chains:** Celo, KiteAI
* **Activated bridge adapters:** LayerZero
* **Token on KiteAI:** `0x3Fdd283C4c43A60398bf93CA01a8a8BD773a755b`

For technical details, please visit [Lucid Labs documentation](https://docs.lucidlabs.fi/developer-reference/deployed-contracts/controller-contracts#kiteai-chain-id-2366).

## Summary

Kite brings yield-generating, bridge-agnostic stablecoins to the Kite ecosystem through Lucid's infrastructure. With automated liquidity management, multi-hop routing, isolated deployment support, and audited smart contracts, Kite provides a production-ready stablecoin layer for developers, protocols, and ecosystem partners building cross-chain applications.
