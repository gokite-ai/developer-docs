# LayerZero Integration on Kite AI

LayerZero is natively supported on Kite AI Mainnet, enabling secure omnichain messaging, asset transfers, and cross-chain application composition. This page provides architectural context and operational guidance for developers building cross-chain applications on Kite AI using LayerZero v2.

## Execution Model and Network Guarantees

Kite AI nodes form the backbone of the network. They power consensus, secure transactions, propagate state, and ensure deterministic execution for agents, users, and applications deployed on Kite Chain. LayerZero integrations operate directly on top of this core infrastructure:

- Inbound and outbound omnichain messages are executed by Kite nodes
- Validators secure cross-chain execution and state transitions
- Executors rely on Kite's EVM compatibility and gas semantics
- Applications depend on deterministic execution for settlement and agent workflows

As a result, the reliability and security guarantees of Kite's node and execution model are fundamental to the correct operation of omnichain applications.

Understanding Kite's execution environment is therefore an important prerequisite when deploying:

- LayerZero-based applications
- Omnichain fungible tokens (OFTs)
- Cross-chain agent-driven settlement flows

## Supported LayerZero Version

Kite AI supports LayerZero v2, which enables smart contracts deployed on Kite AI to communicate with contracts on other supported chains without custodial bridges.

LayerZero provides:

- Verifiable message delivery
- Independent validation via oracle + relayer
- Deterministic execution guarantees

This makes it suitable for production-grade DeFi, payments, governance, and agent-based systems.

## What Developers Can Build

Using LayerZero on Kite AI, developers and partners can build:

- Omnichain applications with cross-chain function calls
- Omnichain fungible tokens (OFTs) and bridged ERC-20 assets
- Cross-chain governance, automation, and settlement flows
- Agent-native workflows spanning execution and payment across multiple chains

These patterns are commonly used in DeFi, programmable payments, automation pipelines, and agent orchestration systems.

## Architecture Overview

LayerZero enables cross-chain communication through a combination of on-chain and off-chain components:

- **Endpoint (v2)** - The on-chain contract on Kite AI that serves as the entry and exit point for all LayerZero messages.
- **Send and Receive ULNs (Ultra-Light Nodes)** - Verification libraries that validate cross-chain state without requiring full light clients.
- **Executor** - A contract responsible for executing verified messages on the destination chain with controlled gas and safety limits.

Messages are verified independently by an oracle and a relayer. This separation preserves security while remaining lightweight and efficient.

## Deployed LayerZero Contracts on Kite AI (Mainnet)

LayerZero core contracts are already deployed on Kite AI Mainnet.

The canonical and always up-to-date source for contract addresses is maintained by LayerZero: https://docs.layerzero.network/v2/deployments/deployed-contracts?chains=kite

### Kite Mainnet Deployment Metadata

- **Chain ID:** 2366
- **Endpoint ID (eid):** 30406
- **Network:** Mainnet

**Important:**

- Endpoint IDs (eid) are not related to EVM Chain IDs.
- `30xxx` → Mainnet endpoints
- `40xxx` → Testnet endpoints

### Contracts

| Contract | Address | Description |
|----------|---------|-------------|
| EndpointV2 | `0x6F475642a6e85809B1c36Fa62763669b1b48DD5B` | Primary entry point into LayerZero v2. Manages message sending, receiving, and configuration for OApps. |
| SendUln302 | `0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7` | Message library used for sending cross-chain messages securely. |
| ReceiveUln302 | `0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043` | Message library used for receiving and verifying cross-chain messages. |
| Blocked Message Library | `0xc1ce56b2099ca68720592583c7984cab4b6d7e7a` | Safety library for blocking misconfigured or invalid message paths. |
| LZ Executor | `0x4208D6E27538189bB48E603D6123A94b8Abe0A0b` | Executes verified messages on Kite AI with a defined gas limit and msg.value. |
| LZ Dead DVN | `0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842` | Placeholder DVN used when default configs are inactive and manual configuration is required. |

To check whether a destination chain is supported, use the `isSupportedEid()` method on the Endpoint contract.

## Omnichain Fungible Tokens (OFT)

Kite AI supports Omnichain Fungible Tokens (OFTs) via LayerZero. Common OFT use cases include:

- Bridged ERC-20 representations of assets from other chains
- Native omnichain tokens with a unified total supply
- Agent-controlled settlement assets used across multiple networks

Depending on the asset design, OFTs typically follow:

- Lock-and-mint patterns, or
- Burn-and-release patterns

## Testing and Deployment Flow

A typical LayerZero deployment workflow on Kite AI:

1. Deploy the application or token contract on Kite AI
2. Deploy corresponding contracts on destination chains
3. Configure trusted peers on all chains
4. Fund sender accounts with native KITE for gas
5. Send test messages and verify execution
6. Monitor delivery and handle failures if needed

## Security and Best Practices

When integrating LayerZero on Kite AI:

- Always verify and strictly configure trusted peer addresses
- Use reentrancy guards when modifying state
- Version message payloads to support upgrades
- Keep receive handlers minimal and auditable
- Monitor failed or reverted message executions

These practices are essential for production-grade omnichain deployments.

## References

- [LayerZero documentation](https://docs.layerzero.network/v2)
- [Kite AI LayerZero Deployment Registry](https://docs.layerzero.network/v2/deployments/deployed-contracts?chains=kite)
