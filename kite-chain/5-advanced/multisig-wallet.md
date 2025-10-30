---
description: Ash Multisig Wallet for Kite AI L1
---

# Multisig Wallet

A Safe-style technical guide for GoKite.ai builders & operators that bring all the features of Safe to Kite L1 & Avalanche ecosystem. The Support includes contract deployment, gas estimation, and contract-powered multisig.

#### Why Kite + Ash wallet

| Category       | Kite (Layer-1)                                                                                                                             | Ash Wallet (Safe Fork)                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Purpose        | Sovereign, EVM-compatible Layer-1 optimized for AI workloads and Proof of Artificial Intelligence (PoAI).                                  | Battle-tested Safe fork bringing upgradeable, multi-sig smart-accounts to Kite AI for treasury, governance, and agent-ops.    |
| Native assets  | $KITE gas & fee token; AI-agent fees; data & model NFTs.                                                                                   | Secures any ERC-20/721/1155 issued on Kite AI, plus cross-chain bridged assets.                                               |
| Core use-cases | <ul><li>DAO &#x26; protocol treasury</li><li>Agent-service escrow</li><li>Upgrade council</li><li>Foundation &#x26; investor use</li></ul> | <ul><li>Multi-party control</li><li>Spending limits</li><li>Module extensibility</li><li>Batching &#x26; automation</li></ul> |

Ash Wallet gives Kite AI teams the same guarded-control surface Safe users enjoy on Ethereum, now on a high-performance AI chain.

#### Key Features (Kite AI Edition)

1. Multi-Signer Smart-Accounts
   1. Any n-of-m ownership configuration; change owners or threshold any time.
   2. Nonce-protected, replay-safe execution.
2. Optimized Gas Model - Contracts re-compiled against Kite AI’s AVM runtime → lower execution fees than Avalanche C-Chain.
3. Agent-Aware Modules (Roadmap end of 2025) - Pre-built modules for agent stipend streaming, model-licence royalties, and PoAI reward-splitting.
4. LayerZero Bridge Guard - Optional hook that halts outbound transfers until multi-sig quorum approves the destination chain & address.
5. dApp Registry - Curated list of Kite-native DeFi, data pools, and model marketplaces surfaced inside the Apps tab.

#### Getting Started

#### Prerequisites

| Tool                 | Notes                                                                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MetaMask ≥ v11       | <p>Chain name: KiteAI Testnet</p><p>Default RPC URL -<a href="https://rpc-testnet.gokite.ai/"> https://rpc-testnet.gokite.ai/</a></p><p>Chain ID: 2368</p><p>Token: KITE</p><p>Block Explorer URL -<a href="https://testnet.kitescan.ai/"> https://testnet.kitescan.ai/</a></p> |
| $KITE testnet tokens | Get from[ Faucet](https://faucet.gokite.ai) (Testnet Ozone).                                                                                                                                                                                                                    |
| Ash Wallet URL       | [https://wallet.ash.center/?network=kite](https://wallet.ash.center/?network=kite)                                                                                                                                                                                              |

#### Create a Multisig

1. Connect wallet → Create new Smart Account.
2. Owners: paste each signer’s Kite address (hardware wallets recommended).
3. Threshold: Kite Foundation = 3 of 5; small team = 2 of 3.
4. Review gas (≈ 0.11 $KITE).
5. Deploy – transaction mined on Kite AI L1 in \~1 s.

#### Import an Existing Safe / Ash

Click “Add existing” → supply multisig address → Ash auto-detects Kite AI contracts; owners need no redeploy.

#### Day-to-Day Ops

| Task                | Flow                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| Propose token spend | New Tx → Send funds → choose ERC-20 → input amount & recipient → Post.           |
| Approve             | Each owner sees pending tx → Sign → gasless off-chain signature stored.          |
| Execute             | When signatures ≥ threshold, any owner pays gas (can reimburse later).           |
| Batch agent payouts | New Tx → Contract interaction → select BatchTransfer module → CSV of recipients. |
| Upgrade protocol    | Use Module → TimelockGuard: delay = 48 h, gives DAO time to veto.                |

#### Security Best-Practices

1. Hardware keys for all signers.
2. Signer Rotation Playbook – store off-chain; test quarterly.
3. Alert Webhooks → route Ash event logs to Slack/Prometheus.
4. 2-Layer Governance – combine on-chain timelock with off-chain Snapshot vote for non-emergency upgrades.

#### Troubleshooting

| Symptom                          | Likely Cause            | Fix                                           |
| -------------------------------- | ----------------------- | --------------------------------------------- |
| Tx stuck in “Awaiting Execution” | Not enough signatures   | Ping owners; check threshold.                 |
| “Network not supported” popup    | MetaMask on wrong chain | Switch to Kite AI RPC.                        |
| Gas estimate fails               | Node lag / mempool full | Retry                                         |
| UI missing dApps                 | Apps list cached        | Hard-refresh or Clear dApp cache in settings. |

#### Resources

* Kite Documentation 
* Ash Wallet –[ https://wallet.ash.center/?network=kite](https://wallet.ash.center/?network=kite)
* Discord – discord.gg/gokiteai
* Contracts –[ ](https://github.com/ash-avax/ash-kite)https://github.com/safe-global/safe-smart-account/tree/v1.3.0GPLv
* SDK – https://github.com/safe-global/safe-core-sdk

#### Audit information

* https://github.com/safe-global/safe-smart-account/blob/v1.3.0-libs.0/docs/audit\_1\_3\_0.md
