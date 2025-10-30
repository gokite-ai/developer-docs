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
- **Root of authority** in Kite's architecture
- Lives in secure enclaves, hardware security modules, or protected device storage
- **Never exposed** to agents, services, or the Kite platform itself
- Signs initial authorizations that delegate specific powers to agent operations
- Users maintain ultimate control with ability to instantly revoke all delegated permissions

### AA Wallet (Smart Contract Account)
Programmable accounts with built-in logic enabling revolutionary agent payment capabilities:

**Account Abstraction Features**:
- Write smart contract code that governs spending
- Bundle transaction execution for efficiency
- Allow third parties to pay gas fees (gasless transactions)
- Interact with multiple accounts simultaneously
- Perform cross-program communications
- Integrate customized logic for complex workflows

**Unified Account Model**:
- User owns a **single on-chain AA account** holding shared funds in stablecoins
- Multiple agents (Claude, ChatGPT, Cursor) operate this account via their own session keys
- Each agent operates only within its authorized limits enforced by smart contracts
- Result: One treasury, per-session risk isolation, fine-grained auditable control
- No fund fragmentation, no complex reconciliation, elegant unified management

**Implementation**:
```javascript
addSessionKeyRule(
    address sessionKeyAddress,  // Newly generated session key
    bytes32 agentId,           // Agent performing the actions
    bytes4 functionSelector,    // Allowed function (e.g., pay())
    uint256 valueLimit          // Maximum transaction value
)
```

### Embedded Wallets
Self-custodial wallets integrated directly into applications:
- Users don't manage seed phrases or private keys, yet maintain complete control
- **One-click agent authorization** and automatic session management
- Transparent fund flows - users think in dollars, not tokens
- Makes blockchain invisible while preserving cryptographic guarantees

### Agent Payment Protocol
Comprehensive system enabling payment flows impossible with traditional infrastructure:

**Capabilities**:
- **Micropayments**: Down to fractions of cents ($0.000001 per message)
- **Streaming payments**: Flow continuously based on usage (per-second, per-token)
- **Pay-per-inference models**: Every API call carries value
- **Conditional payments**: Release based on performance verification
- **Instant settlement**: No waiting periods, real-time value transfer
- **Global reach**: Borderless payments without currency conversion

**Integration**:
- Programmatic commerce where every interaction becomes a micropayment
- Works seamlessly with state channels for off-chain efficiency
- Supports both on-chain and off-chain settlement patterns

### On/Off-Ramp API
The bridge between traditional finance and the agent economy:

**Capabilities**:
- Integration with providers like PayPal and banking partners
- Users fund agent wallets with credit cards
- Merchants withdraw earnings to bank accounts
- Handles compliance, fraud prevention, and currency conversion invisibly

**User Experience**:
- Users never need to understand blockchain
- Think in dollars in and dollars out
- Makes agent payments accessible to billions who will never own crypto

## Governance & Safety

### SLA (Service-Level Agreement) Contracts
Smart contracts that transform vague service promises into mathematically enforced guarantees:

**Unlike Traditional SLAs** (legal enforcement, manual claims):
Kite SLAs **automatically execute** penalties and rewards through smart contract code.

**Example Guarantees**:
- **Response time**: <100ms with automatic penalties for violations
- **Availability**: 99.9% uptime with automatic pro-rata refunds for downtime
- **Accuracy**: <0.1% error rate or reputation slashing for errors
- **Throughput**: 1,000+ requests/second minimum guaranteed capacity

**Implementation Details**:
- SLA metrics (latency, uptime, accuracy, throughput) measured off-chain by service telemetry
- Oracle submits signed attestations or zk/TEE proofs translating off-chain readings to on-chain facts
- Contracts evaluate oracle reports to trigger refunds, penalties, or reputation slashing automatically

**Result**: Trust through code rather than courts. No legal disputes, just programmatic execution.

### Programmable Trust / Intent-Based Authorization
Users express intentions through mathematical constraints that compile to blockchain enforcement:

**Spending Rules (On-Chain)**:
Asset or stablecoin-related rules leveraging programmable money:
- **Spending caps**: Cannot be exceeded even if agent tries
- **Rolling windows**: "$1,000 per day" enforced at protocol level
- **Whitelisted merchants**: Only authorized recipients can receive funds
- **Conditional logic**: "If volatility >20%, reduce limits by half"

Evaluated entirely on-chain through smart contracts for transparency and decentralization. Integrates with any on-chain account. Common use cases: spending limits, temporal constraints, merchant restrictions.

**Policies (Off-Chain)**:
Full control and flexibility for complex logic:
- Evaluated securely off-chain in user's local environment or Kite's TEE (Trusted Execution Environment)
- Platform-specific but can integrate third-party systems
- Common use cases: Session TTL, operation categories, recipient allowlists

**Key Distinction**:
- **Spending Rules**: Blockchain-enforced, unstoppable, decentralized
- **Policies**: Flexible, complex, platform-optimized

**Intent Characteristics**:
- Automatically expire preventing forgotten authorizations
- Cannot be exceeded regardless of agent behavior or model hallucination
- User's intent becomes immutable law enforced mathematically

### Session Keys / Ephemeral Keys
Temporary cryptographic keys implementing zero-trust session management:

**Generation**:
- Created for each agent task
- **Completely random**, never derived from permanent keys
- Ensures **perfect forward secrecy**

**Authorization Scope**:
Example: "Transfer maximum $10 to providers A, B, or C for data feeds between 2:00 PM and 2:05 PM today"
- Specific amount limits
- Defined recipient set
- Narrow time window
- Single operation purpose

**Security Properties**:
- Session executes its authorized operation then becomes **cryptographically void forever**
- Total session compromise affects only one operation for minutes with bounded value
- Prevents cascading failures that plague traditional API key systems
- One breach ≠ total compromise

**Local Generation**:
- Happens entirely locally without server communication
- No private key transmission
- DID session registers in agent network with self-contained proof of authority

### Programmable Escrow Contracts
Kite extends beyond direct payments with programmable escrow mechanisms embedding smart contracts between agents and merchants:

**Framework**:
- Buyers issue cryptographically signed payment intents
- Funds authorized into escrow accounts with defined expiry conditions
- Escrows can be partially or fully released based on verified outcomes
- Supports complete lifecycle: authorization, capture, charge, void, reclaim, refund

**Key Properties**:
- **Noncustodial**: Users retain full control over assets throughout process
- **Permissionless**: No central authority required
- **Additional operators**: Third-party entities can relay transactions or cover gas costs
- **Cryptographically constrained**: All operators bound by payer's signed hash

**Standards Integration**:
- Leverages ERC-3009 for signature-based gasless preapprovals
- Streamlines execution and user experience

**Programmability**:
As implemented in code, can be extended with:
- Dynamic revenue sharing
- Token swaps
- Conditional privacy modules
- Integration with other smart contracts

**Result**: Every transaction becomes auditable, reversible, and composable financial primitive.

### Reputation System
Trust scores accumulated based on verifiable behavior, not self-reported ratings:

**How Reputation Accumulates**:
- **Successful payments**: Increase reputation score
- **Fast responses**: Boost ratings
- **Failed deliveries**: Decrease trust
- **SLA violations**: Trigger penalties
- **Policy violations**: Reputation slashing

**Key Difference from Traditional Systems**:
Unlike traditional ratings that can be gamed, Kite's reputation derives from **cryptographic proofs of actual behavior**. Every interaction is verified and immutable.

**Benefits of High Reputation**:
- Access to better rates
- Higher spending limits
- Premium services
- Preferential treatment

**Portability**:
- Reputation is **portable across services**
- Solves cold-start problem where new relationships begin from zero trust
- Agent with proven history on one platform presents verifiable credentials to new services
- Bootstrap trust through cryptographic proof rather than promises

**Trust Dynamics**:
- **Progressive Authorization**: New agents start with minimal permissions ($10 daily limits)
- **Behavioral Adjustment**: Successful operations automatically expand capabilities over time
- **Verification Economics**: Expensive verification avoided for high-reputation agents

## Three-Layer Identity Architecture

The three-tier identity model provides defense-in-depth security where compromising a session affects only one delegation, compromising an agent remains bounded by user-imposed constraints, and user keys are highly unlikely to be compromised as they're secured in local enclaves.

### User Identity (Root Authority)
The cryptographic root of trust with ultimate control:

**Key Management**:
- Private keys live in **secure enclaves, hardware security modules, or protected device storage**
- **Never exposed** to agents, services, or the Kite platform itself
- Users maintain exclusive control over digital wealth

**Authority**:
- Can **instantly revoke** all delegated permissions with single transaction
- Sets **global constraints** that cascade through all agents
- Represents the only point of potential unbounded loss (highly unlikely to occur)

**Monitoring**:
- Complete monitoring via **immutable proof chains**
- Independent access to funds through standard blockchain interfaces
- Cryptographic guarantee of sovereignty regardless of Kite's availability

**Legal Responsibility**:
- Remains legally responsible entity for all agent actions
- Bridge between traditional legal frameworks and autonomous systems

### Agent Identity (Delegated Authority)
Each AI agent receives its own cryptographic identity with bounded authority:

**Key Derivation**:
- **Deterministic address** mathematically derived from user's wallet using **BIP-32** hierarchical key derivation
- Example: ChatGPT portfolio manager might have address `0x891h42Kk9634C0532925a3b844Bc9e7595f0eB8C`
- Anyone can verify agent belongs to user through cryptographic proof
- Agent **cannot reverse derivation** to access user's private key

**Capabilities**:
- Executes complex tasks across multiple services
- Handles real money within cryptographically enforced boundaries
- Maintains **own wallet** with own balance
- Accumulates **own reputation** score
- Coordinates with other agents autonomously

**Security Properties**:
- **Provable ownership** without key exposure
- Independent operation within user-defined boundaries
- Even **total agent compromise** remains bounded by smart contract constraints
- Cannot exceed spending limits or violate user policies

**Identity Resolution**:
- Human-readable identifiers: `did:kite:alice.eth/chatgpt/portfolio-manager-v1`
- Makes authority chains instantly verifiable
- Serves as on-chain identity for authorization

### Session Identity (Ephemeral Authority)
For each task execution, completely random session keys provide perfect forward secrecy:

**Generation**:
- **Completely random** session key (e.g., `0x333n88Pq5544D0643036b4c955Cc8f8706g1dD9E`)
- **Never derived** from wallet or agent keys
- Ensures **perfect forward secrecy**
- Generated entirely locally without server communication

**Authorization**:
- Single-use authorization tokens executing specific actions
- No exposure of permanent credentials
- Self-contained proof of authority, chain of trust, and validity period

**Expiration**:
- Session validates through its time window then becomes **permanently invalid**
- Even quantum computers cannot resurrect expired sessions
- Automatic cleanup prevents forgotten sessions from becoming vulnerabilities

**Security Impact**:
- Compromising session key affects **only that session's operations**
- Past and future sessions remain secure due to independent key generation
- Minimizes blast radius of any security breach

### Unified Reputation Flow
While funds remain compartmentalized for security, **reputation flows globally**:
- Every transaction and interaction contributes to unified reputation score
- Reputation accumulated by user-agent pair benefits both entities
- Establishes **cryptographic root of trust** spanning users, agents, and services
- Creates portable trust that transfers across platforms

## Cryptographic Security Components

### Standing Intent (SI)
The root of cryptographic authority representing the user's signed declaration of what an agent may do:

**Structure**:
```javascript
SI = sign_user(
    iss: user_address,      // Issuer: the authorizing user
    sub: agent_did,         // Subject: the authorized agent
    caps: {                 // Capabilities: hard limits
        max_tx: 100,        // Maximum per transaction
        max_daily: 1000     // Maximum daily aggregate
    },
    exp: timestamp          // Expiration: automatic revocation
)
```

**Properties**:
- Signed with user's private key becomes **immutable root of trust**
- Every subsequent operation must trace back to valid SI
- Capabilities define **mathematical boundaries** that cannot be exceeded
- Expiration ensures forgotten authorizations cannot persist indefinitely
- Cannot be forged without user's private key (cryptographic hardness of ECDSA/EdDSA)

### Delegation Token (DT)
Agent authorization for specific sessions enabling operations without exposing permanent credentials:

**Structure**:
```javascript
DT = sign_agent(
    iss: agent_did,               // Issuer: the delegating agent
    sub: session_pubkey,          // Subject: the session key
    intent_hash: H(SI),           // Link: hash of Standing Intent
    operation: op_details,        // Scope: specific operation
    exp: now + 60s                // Expiration: short lived (typically 60s)
)
```

**Properties**:
- Cryptographically proves agent authorized this session for this operation
- Hash linkage ensures agent cannot exceed user-defined Standing Intent limits
- Short expiration minimizes exposure from compromised sessions
- Operation scope prevents session reuse for unauthorized actions

### Session Signature (SS)
Final cryptographic proof for transaction execution:

**Structure**:
```javascript
SS = sign_session(
    tx_details,  // Complete transaction data
    nonce,       // Replay prevention
    challenge    // Freshness proof
)
```

**Verification Flow**:
Services verify **all three signatures** before accepting operations:
1. **Standing Intent** proves user authorization
2. **Delegation Token** proves agent delegation
3. **Session Signature** proves current execution

This **triple verification** makes unauthorized actions cryptographically impossible (not merely prohibited).

## Protocol Compatibility

### Identity Resolution
Public resolvers enable instant verification without contacting Kite or the user:

**Resolution Functions**:
- `GetAgent(AgentID)` → AgentID, AgentDomain, AgentAddress
- `ResolveAgentByDomain(AgentDomain)` → AgentID, AgentDomain, AgentAddress
- `ResolveAgentByAddress(AgentAddress)` → AgentID, AgentDomain, AgentAddress
- `GetAgentBySession(SessionID)` → AgentID, AgentDomain, AgentAddress, SessionInfo

**Benefits**:
- Any service can verify complete authority chain
- No API calls to central authority required
- Enables permissionless interoperability
- Instant trust verification based on cryptographic proof

### Native Protocol Support

**A2A Protocol (Agent-to-Agent)**:
- Direct agent coordination across platforms
- Google's protocol for inter-agent communication
- Kite agents speak A2A fluently with agents from any ecosystem

**Agent Payment Protocol (AP2)**:
- Neutral, open protocol defining how agent payments should be expressed
- Similar to ERC-20 for payments
- Kite plays the execution layer: enforces AP2 intents on-chain with programmable spend rules

**MCP (Model Context Protocol)**:
- Model interoperability across entire LLM ecosystem (Anthropic's protocol)
- Claude, GPT, and emerging models interact through same protocol layer
- Makes model choice business decision rather than technical constraint

**OAuth 2.1**:
- Enterprise compatibility with existing authentication systems
- Backward compatibility means existing services accepting OAuth today can accept Kite agents tomorrow
- Minimal changes required for service integration

**X402 Standard**:
- Agent-native payments for future developments
- Forward compatibility with emerging payment standards

**Integration Approach**:
Rather than creating isolated protocol, Kite embraces existing standards as first principles. Developers don't choose between Kite and existing stack—they add Kite to enhance what already works.

## State Channels and Micropayments

### Payment Channel Architecture
Direct money transfers work for occasional payments but fail for agent patterns. State channels enable off-chain transactions with two on-chain anchors:

**Mechanics**:
- **Open**: Lock funds on-chain
- **Transact**: Exchange thousands of signed updates off-chain
- **Close**: Settle final state on-chain

**Performance**:
- High throughput (thousands of transactions per channel)
- Low latency (sub-100ms)
- Fees amortized across millions of interactions
- AI inference at $1 per million requests becomes economically viable

### Channel Variants

**Unidirectional Channels**:
- Flow value from user to merchant
- Perfect for API consumption, data feeds, inference requests
- Value flows one direction with simple metering

**Bidirectional Channels**:
- Enable refunds, credits, two-way value exchange
- Services can pay agents for data
- Agents can receive rebates
- Errors trigger automatic refunds

**Programmable Escrow Channels**:
- Embed custom logic in state transitions
- EVM developers write arbitrary rules
- Conditional releases, multi-party splits, time-locked vesting
- Channel becomes mini smart contract

**Virtual Channels**:
- Route value through intermediaries without new on-chain contracts
- Agent A pays Agent C through hub B
- Network effects without setup overhead

**Privacy-Preserving Channels**:
- Only channel opens and closes appear on-chain
- Thousands of micropayments remain private between participants
- Protects competitive intelligence and usage patterns

### How Channel Limitations Become Advantages
State channels have known limitations from Ethereum origins, but agent use patterns transform these into features:

**Open/Close Overhead**:
- Agents send hundreds of inferences to same service over minutes
- Setup costs amortize perfectly across concentrated bursts
- "Overhead" becomes negligible

**Liveness Assumption**:
- Professional services with reputation at stake won't risk fraud for micropayments
- Services maintain high availability in their best interest

**Griefing Attacks**:
- Agents and services maintain reputation scores
- Griefing destroys reputation for minimal gain (economically irrational)

**Fixed Participants**:
- Agent interactions naturally have fixed participants (user, agent, service)
- Relationships determined at task initiation
- Inability to change participants adds security

**Sequential Processing**:
- Agent interactions inherently turn-based: request → response → request
- Limitation perfectly matches use case

*For detailed technical specifications, flows, and use cases, see the [Kite Whitepaper](../get-started/whitepaper-references.md)*
