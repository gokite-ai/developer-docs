---
description: >-
  The first AI payment blockchain - foundational infrastructure empowering
  autonomous agents to operate and transact with identity, payment, governance,
  and verification.
---

# Introduction & Mission

#### Current State of Internet <a href="#current-state-of-internet" id="current-state-of-internet"></a>

Today's internet was designed only for humans, but AI agents will have even more significant roles in near future. Without a new approach, it will suffer from lack of identity, trust, and scalable payments.

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

<p align="center"><sub>Human Centric vs Agentic Internet</sub></p>

## <sup><sub>Kite - The First AI Payment Blockchain<sub></sup>

* AI agents are becoming main player of economy
* However, infrastructure is not ready
  * It is risky for users to delegate payments to AI agents since AI agent is blackbox
  * It is risky for merchants to receive payments from AI agents since there is no clear liability on those payments
* Kite is **a foundational infrastructure empowering autonomous agents to operate and transact with identity, payment, governance, and verification.**

## <sup><sub>Why Kite ?<sub></sup>

Kite introduces, the first infrastructure system designed from first principles for the agentic economy. We present the **SPACE framework** as the complete solution:

* **Stablecoin-native:** Every transaction settles in stablecoins with predictable sub-cent fees
* **Programmable constraints:** Spending rules enforced cryptographically, not through trust
* **Agent-first authentication:** Hierarchical wallets with cryptographic principal binding
* **Compliance-ready:** Immutable audit trails with privacy-preserving selective disclosure
* **Economically viable micropayments:** True pay-per-request economics at global scale

**Our Core Innovations**

**Three-Layer Identity Architecture**\
We introduce the first hierarchical identity model that separates user (root authority), agent (delegated authority), and session (ephemeral authority) identities. Each agent receives its own deterministic address derived from the user's wallet using BIP-32, while session keys are completely random and expire after use. This defense-in-depth architecture ensures graduated security: compromising a session affects only one delegation; compromising an agent remains bounded by user-imposed constraints; and user keys secured in local enclaves inaccessible to any external third parties, which are thus highly unlikely to be compromised, represent the only point of potential unbounded loss. While funds remain compartmentalized for security, reputation flows globally across the system. Every transaction and interaction contributes to a unified reputation score, establishing a cryptographic root of trust that spans users, agents, and services throughout the Kite platform.

**Programmable Governance Beyond Smart Contracts**\
While smart contracts enable programmable money, agents require compositional rules that span multiple services. Kite implements a unified smart contract account model where users own a single on-chain account holding shared funds. Multiple verified agents operate through session keys with cryptographically enforced spending rules: "ChatGPT limit $10,000/month, Cursor limit $2,000/month, other agents limit $500/month." Rules can be temporal (e.g., increase limits over time), conditional (e.g., reduce limits if volatility spikes), and hierarchical (cascade through delegation levels). These aren't policies, but programmatically enforced boundaries.

**Agent-Native Payment Rails with State Channels**\
Beyond stablecoins and payments-first blockchains, the real revolution goes deeper. Kite creates agent-first transaction types. Beyond simple transfers, Kite implements programmable micropayment channels optimized for agent patterns. Instead of the traditional over-complicated multi-party card rails of authenticate, request, pay, wait, and verify, payments are instantly settled during agent interaction within the same channel. Two on-chain transactions (open and close) enable thousands of off-chain signed updates, achieving sub-hundred-millisecond latency at $1 per million requests. This architectural inversion, treating per-request and streaming micropayments as first-class behaviors with sub-cent precision and instant finality, unlocks agent-native economics which were previously impossible.

In the following chapters, we will detail how Kite's architecture, protocols, and implementations solve each infrastructure failure, transforming the promise of the agentic economy into operational reality.

The agentic future isn't waiting for better models. It's waiting for infrastructure that treats agents as first-class economic actors.

**Footnote:** - Kite is fully **x402-compatible**, enabling standardized agent-to-agent (A2A) intents, verifiable message passing, escrowed execution, and cross-protocol settlement. This ensures seamless interoperability across emerging agentic ecosystems and intent-based coordination protocols.

## <sup>Quick Start</sup>

### Build AI Agents with Payment Capabilities

* [**Workflow Overview**](../integration-guide/workflow-overview/) - How agentic commerce works with Kite
* [**Integration Overview**](../integration-guide/sdk-api-overview-for-developers/) - SDK/API overview and integration approaches

### For Blockchain Developers

* [**Kite Chain Getting Started**](../kite-chain/1-getting-started/) - Network information and tools
* [**Smart Contract Development**](../kite-chain/3-developing/) - Building smart contracts on Kite
* [**Sample dApps**](../kite-chain/4-building-dapps/) - Example dApp implementations

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/gokite-ai)

[![X](https://img.shields.io/badge/X-Follow-000000?style=for-the-badge\&logo=x)](https://x.com/GoKiteAI)

[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge\&logo=discord)](https://discord.gg/Gqvh6hv9qt)

***

Built with ❤️ by the Kite community
