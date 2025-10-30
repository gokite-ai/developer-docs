---
description: The first AI payment blockchain - foundational infrastructure empowering autonomous agents to operate and transact with identity, payment, governance, and verification.
---

# The First AI Payment Blockchain

- AI agents are becoming main player of economy
- However, infrastructure is not ready
     - It is risky for users to delegate payments to AI agents since AI agent is blackbox
     - It is risky for merchants to receive payments from AI agents since there is no clear liability on those payments
- Kite is **a foundational infrastructure empowering autonomous agents to operate and transact with identity, payment, governance, and verification.**

<strong>Why Kite?</strong>

<details>
  <summary>3 tiers of ID for fine-grained governance</summary>
  The user → agent → session identity hierarchy separates root authority (user), delegated authority (agent), and ephemeral authority (session). This enables precise controls like per-agent spending limits, time windows, and whitelisted providers without exposing master keys.
</details>

<details>
  <summary>Verifiable proof of delegations</summary>
  Every operation is cryptographically signed and anchored on-chain, producing tamper-evident audit trails. Services and auditors can verify who authorized what, when, and under which constraints—no screenshots or manual logs required.
</details>

<details>
  <summary>Programmable guard rails</summary>
  Set enforceable constraints like daily budgets, provider allowlists, rate limits, or conditional rules (e.g., “halve limits if volatility > 20%”). These compile to smart contract enforcement, so agents cannot exceed policy even if compromised.
</details>

<details>
  <summary>Native agentic protocol support</summary>
  Compatible with A2A, AP2, MCP, OAuth 2.1, and emerging standards in AI agent communication.
</details>

<details>
  <summary>AI agent-native stablecoin payment</summary>
  Streaming micropayments and pay-per-call economics via state channels and stablecoin-native settlement. Agents discover, negotiate, and pay for services instantly with predictable costs and sub-100ms latency.
</details>

<details>
  <summary>Near zero gas fee</summary>
  Chain is optimized for agent throughput with near-zero fees (often <$0.000001) and ~1s block times, enabling practical microtransactions and high-frequency agent interactions at scale.
</details>

# Quick Start

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">

## Build AI Agents with Payment Capabilities
- **[Workflow Overview](../integration-guide/workflow-overview.md)** - How agentic commerce works with Kite
- **[Integration Overview](../integration-guide/api-references.md)** - SDK/API overview and integration approaches

## For Blockchain Developers
- **[Kite Chain Getting Started](../kite-chain/1-getting-started/README.md)** - Network information and tools
- **[Smart Contract Development](../kite-chain/3-developing/README.md)** - Building smart contracts on Kite
- **[Sample dApps](../kite-chain/4-building-dapps/README.md)** - Example dApp implementations

</div>



<div class="flex flex-wrap gap-4 my-6">

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/gokite-ai)

[![X](https://img.shields.io/badge/X-Follow-000000?style=for-the-badge&logo=x)](https://x.com/GoKiteAI)

[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge&logo=discord)](https://discord.gg/Gqvh6hv9qt)

</div>

---

<div class="text-center text-sm text-gray-600 mt-8">
Built with ❤️ by the Kite community
</div>
