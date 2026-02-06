---
description: Service provider guide for accepting Kite Agent Passport payments via x402 facilitators.
---

# Service Provider Guide

This guide explains how to integrate with Kite Agent Passport as a service provider. Kite fully supports the x402 payment protocol through our facilitator partners.

## What You're Building

By integrating with Kite Agent Passport, your service will be able to:

- Accept payments from AI agents on behalf of users
- Receive guaranteed, pre-authorized payments via x402 protocol
- Access the growing market of agentic applications
- Work seamlessly with any x402-compatible facilitator

## Prerequisites

Before you begin, ensure you have:

- [ ] A service that supports X402 and can be called via API
- [ ] A service wallet address on Kite L1 testnet

---

## Overview: The Payment Flow

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│    Agent    │─────▶│   x402      │─────▶│   Your       │
│  (via MCP)  │      │ Facilitator │      │  Service     │
└─────────────┘      └──────────────┘      └──────────────┘
       │                                          │
       │ 1. Payment Required                      │
       │    (402 response with payment details)   │
       │◀─────────────────────────────────────────┘
       │                                          │
       │ 2. Payment Token                         │
       │    (authorization + signature)           │
       │─────────────────────────────────────────▶│
       │                                          │
       │ 3. Service Response                      │
       │◀─────────────────────────────────────────┘
```

**Key Points:**
1. Your service returns a 402 Payment Required response with payment details
2. Agents obtain a signed payment authorization from the user
3. Your service receives and verifies the payment token
4. The facilitator executes the on-chain transfer to your payee address
5. You deliver the service after confirming payment

---

## Kite Facilitator Support

Kite Agent Passport fully supports the x402 protocol and works with any x402-compatible facilitator. We recommend using:

### x402 Pieverse Facilitator

| Property | Value |
|----------|-------|
| **Service** | x402 Pieverse Facilitator |
| **Version** | 2.0.0 |
| **Base URL** | https://facilitator.pieverse.io |
| **Documentation** | https://facilitator.pieverse.io/ |

**Supported Networks:**

- BSC (BNB Smart Chain)
- BSC Testnet
- Base
- Monad
- Kite Testnet
- Kite (mainnet)

**Kite Testnet Facilitator Address:**

```
0x12343e649e6b2b2b77649DFAb88f103c02F3C78b
```

**API Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2/supported` | GET | List supported networks and assets |
| `/v2/verify` | POST | Verify payment signature |
| `/v2/settle` | POST | Settle payment (execute on-chain) |

The facilitator handles the on-chain execution of payments. Once a payment is authorized, the facilitator executes the `transferWithAuthorization` call and transfers funds directly to your specified payee address.

### Demo Facilitators

We provide demo facilitators to clarify what is needed to support Kite payment. These reference implementations demonstrate how to enable x402 facilitation with Kite:

**Repository:** https://github.com/gokite-ai/x402

Service providers can open their service to AI agents through these facilitators. Use these demos as a reference for understanding the facilitator requirements and integration patterns.

---

## Implementing x402 Support

Kite provides facilitator support for x402 payments. **Implementing the x402 protocol on your service is your responsibility.** This includes:

- Returning 402 Payment Required responses with the `X-Payment-Required` header
- Verifying payment tokens when received from agents
- Managing your service wallet and received funds

### Understanding x402 Protocol

x402 is an open payment protocol using HTTP 402 (Payment Required) and EIP-712 signed authorizations.

**Payment Required Response:**

```http
HTTP/1.1 402 Payment Required
X-Payment-Required: x402; scheme="exact"; network="kite-testnet"; 
  amount="10000"; asset="USDC"; payee="0xYourServiceWallet..."; 
  facilitator="https://facilitator.pieverse.io"
```

**Authorization Format:**

```json
{
  "authorization": {
    "from": "0x857b0651...",
    "to": "0x209693Bc...",
    "value": "10000",
    "validAfter": "1740672089",
    "validBefore": "1740672154",
    "nonce": "0xf3746613..."
  },
  "signature": "0xabc..."
}
```

### Payment Settlement

Payments are executed on-chain by the facilitator directly to your payee address. Since you control this wallet address, you can transfer received tokens to any target address at any time. 

### Resources for Implementation

For detailed implementation guidance on the x402 protocol, refer to:

- **x402 Protocol Specification** - https://docs.x402.org/introduction
- **Pieverse Facilitator Docs** - https://facilitator.pieverse.io/

---

## Next Steps

1. **Review the x402 protocol** to understand implementation requirements
2. **Set up your service wallet** on Kite L1 testnet
3. **Implement x402 support** in your service
4. **Test with Kite Agent Passport** using the Kite MCP
5. **Prepare for mainnet** by reviewing the [Testnet Notice](testnet-notice.md)

***

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*

*Continue to: [Developer Guide](developer-guide.md)*
