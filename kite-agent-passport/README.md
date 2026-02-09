---
description: Kite Agent Passport enables autonomous AI agents to make secure payments on behalf of users. Learn how to use, integrate, or build with Kite Agent Passport.
---

# Kite Agent Passport

Welcome to the Kite Agent Passport documentation. Kite Agent Passport provides the infrastructure for autonomous AI agents to make secure, delegated payments on behalf of users. It combines identity management, authentication, delegation, and on-chain payment processing into a unified system.

## What You'll Find Here

- **[Introduction](introduction.md)** - Learn what Kite Agent Passport is and how it fits into the agentic internet
- **[Testnet Notice](testnet-notice.md)** - Current status, known limitations, and expectations
- **[End User Guide](end-user-guide.md)** - Set up and use Kite Agent Passport to fund and manage agent spending
- **[Service Provider Guide](service-provider-guide.md)** - Accept Kite Passport payments via x402 facilitators
- **[Developer Guide](developer-guide.md)** - Build Kite Agent Passport into your agentic applications

## 🎯 Quick Start

### For End Users

{% hint style="warning" %}
> **Important — Invitation Only:** Kite Agent Passport is currently available by invitation only during the testnet phase. If you have not received an invitation, you may not be able to complete all of the steps below. See the [Testnet Notice](testnet-notice.md) for more details.
{% endhint %}

1. Use your invitation link to access the [Kite Portal](https://x402-portal-eight.vercel.app/) and configure your account
2. Connect your wallet and complete signature authentication
3. On-ramp testnet tokens to your wallet
4. Create an agent and configure its spending rules
5. Connect the MCP server to your AI client

### For Service Providers

1. Review the [Service Provider Guide](service-provider-guide.md)
2. Set up your x402 facilitator integration
3. Configure the Kite Service Payment API
4. Test payments on the Kite L1 testnet

### For Developers

1. Start with the [Developer Guide](developer-guide.md)
2. Register your agent ID via the Kite API
3. Integrate the Kite MCP Tool into your agent framework
4. Implement `kite.pay(...)` in your agent logic

## 🚀 By Audience

| You Are | Start Here | Key Resources |
|---------|------------|---------------|
| **End User** | [End User Guide](end-user-guide.md) | Kite Portal, MCP Configuration |
| **Service Provider** | [Service Provider Guide](service-provider-guide.md) | x402 Integration, Service Payment API |
| **Developer** | [Developer Guide](developer-guide.md) | Kite MCP Tool, Agent Registration API |

## Understanding the Architecture

Kite Agent Passport consists of three core components:

1. **Passport** - Identity, authentication, and delegation infrastructure
   - User IDs and Agent IDs registered on-chain
   - Sessions (master budgets with spending rules)
   - Delegations (specific, signed intents for payments)

2. **Payment** - On-chain value transfer infrastructure
   - Secure token transfers on Kite L1
   - x402 facilitator integration
   - Service redemption APIs

3. **MCP Tool** - Integration layer for AI agents
   - Simple `kite.pay(...)` API for agents
   - Automatic session and delegation management
   - User prompt handling for signature requests

## Next Steps

- **New to Kite?** Start with the [Introduction](introduction.md) to understand the concepts
- **Ready to try it?** Jump to the [End User Guide](end-user-guide.md)
- **Building integration?** See the [Service Provider Guide](service-provider-guide.md) or [Developer Guide](developer-guide.md)

## Need Help?

- **[Testnet Notice](testnet-notice.md)** - Check current status and known issues
- **[Kite Portal](https://x402-portal-eight.vercel.app/)** - Access your dashboard and monitor transactions
- **[Report an Issue](https://github.com/gokite-ai/developer-docs/issues/new/choose)** - Found a bug or have feedback?

***

*Part of the Kite blockchain documentation. For more on Kite's architecture and core concepts, see [Get Started](../get-started/).*
