---
description: Core concepts and terminology for Kite's agent-native infrastructure
---

# Core Concepts & Terminology

Essential building blocks that enable autonomous agent operations in Kite's ecosystem.

## Core Entities

### User
Human principal who owns and controls AI agents:
- Manages master wallets (root of cryptographic trust)
- Delegates capabilities while maintaining ultimate authority
- Sets global policies that cascade through all agents
- Remains legally responsible for agent actions

### Agent
Autonomous program acting on behalf of a user:
- Executes complex tasks across multiple services
- Handles real money within cryptographically enforced boundaries
- Maintains own wallet and reputation
- Bound to user through BIP-32 derivation

### Service
External offerings that agents interact with:
- Data APIs, GPU providers, SaaS applications
- Integrate via MCP, A2A, or OAuth protocols
- Maintain sovereignty over access policies

### Merchant/Provider
Business operators who make services discoverable:
- Define SLAs with automatic penalties
- Establish reputation through verifiable performance
- Transform B2B services into plug-and-play agent resources

## Identity & Trust Infrastructure

### Kite Passport
Cryptographic identity card that:
- Creates complete trust chain from user to agent to action
- Binds to existing identities (Gmail, Twitter) via cryptographic proofs
- Contains capabilities: spending limits, service access
- Enables selective disclosure (prove ownership without revealing identity)

### Decentralized Identifier (DID)
Globally unique, cryptographically verifiable identifiers:
- User: `did:kite:alice.eth`
- Agent: `did:kite:alice.eth/chatgpt/portfolio-manager-v1`
- Makes authority chains instantly verifiable

### Verifiable Credentials (VCs)
Cryptographically signed attestations proving:
- Compliance training completion
- Trading licenses
- Reputation thresholds
- Enable fine-grained access control

### Proof of AI
Immutable, tamper-evident logs anchored to blockchain:
- Complete lineage from user authorization to final outcome
- Indisputable evidence for disputes
- Full transparency for regulators

## Wallet Architecture

### EOA Wallet (Externally Owned Account)
Traditional blockchain wallet controlled by private key:
- Root of authority in Kite's architecture
- Lives in secure enclaves, never exposed to agents
- Signs initial authorizations for agent operations

### AA Wallet (Smart Contract Account)
Programmable accounts with built-in logic:
- Govern spending, bundle transactions, allow third-party gas payment
- User owns single on-chain account with shared stablecoin funds
- Multiple agents operate via session keys within authorized limits

### Embedded Wallets
Self-custodial wallets integrated into applications:
- Users don't manage seed phrases but maintain complete control
- One-click agent authorization and automatic session management
- Think in dollars, not tokens

### Agent Payment Protocol
Comprehensive payment system enabling:
- Micropayments (fractions of cents)
- Streaming payments (dynamic resource consumption)
- Pay-per-inference models
- Conditional payments
- Instant settlement

## Governance & Safety

### SLA Contracts
Smart contracts with mathematically enforced guarantees:
- Response time: <100ms or automatic penalties
- Availability: 99.9% uptime with pro-rata refunds
- Accuracy: <0.1% error rate or reputation slashing
- Throughput: 1,000+ requests/second minimum

### Programmable Trust
Mathematical constraints that compile to blockchain enforcement:
- Spending caps that cannot be exceeded
- Temporal windows for operations
- Whitelisted merchants
- Conditional logic ("if volatility >20%, reduce limits by half")

### Session Keys
Temporary cryptographic keys for zero-trust session management:
- Generated for each agent task (completely random)
- Perfect forward secrecy
- Single-use authorization with time windows
- Cryptographically void after use

### Reputation System
Trust scores based on verifiable behavior:
- Successful payments increase reputation
- Failed deliveries decrease trust
- Policy violations trigger penalties
- Portable across services

## Three-Layer Identity Architecture

### User Identity (Root Authority)
- Private keys in secure enclaves, never exposed
- Instant revocation of all delegated permissions
- Global constraints that cascade through agents
- Complete monitoring via immutable proof chains

### Agent Identity (Delegated Authority)
- Deterministic address derived from user wallet (BIP-32)
- Provable ownership without key exposure
- Independent operation with own reputation
- Bounded compromise by smart contract constraints

### Session Identity (Ephemeral Authority)
- Completely random session keys
- Never derived from wallet or agent keys
- Single-use authorization for specific actions
- Automatic expiration after time window

## Protocol Compatibility

### Identity Resolution
Public resolvers for instant verification:
- `GetAgent(AgentID)` → AgentID, AgentDomain, AgentAddress
- `ResolveAgentByDomain(AgentDomain)` → AgentID, AgentDomain, AgentAddress
- `ResolveAgentByAddress(AgentAddress)` → AgentID, AgentDomain, AgentAddress
- `GetAgentBySession(SessionID)` → AgentID, AgentDomain, AgentAddress, SessionInfo

### Native Protocol Support
- **A2A Protocol**: Direct agent coordination
- **Agent Payment Protocol**: Neutral, open protocol for agent payments
- **MCP**: Model interoperability across LLM ecosystem
- **OAuth 2.1**: Enterprise compatibility
- **X402 Standard**: Agent-native payments

---

*For detailed technical specifications, see the [Kite Whitepaper](../get-started/whitepaper-references.md)*