---
description: Technical integration guide for service providers to accept Kite Agent Passport payments via x402 facilitators.
---

# Service Provider Guide

This guide explains how to integrate Kite Agent Passport payments into your service using the x402 facilitator protocol. After completing this guide, your service will be able to accept payments from AI agents securely and reliably.

## What You're Building

By integrating Kite Agent Passport, your service will be able to:

- Accept payments from AI agents on behalf of users
- Receive guaranteed, pre-authorized payments
- Leverage x402 facilitators for standardized payment processing
- Access the growing market of agentic applications

## Prerequisites

Before you begin, ensure you have:

- [ ] A service that can be called via API
- [ ] Basic understanding of REST APIs
- [ ] A service wallet address on Kite L1 testnet
- [ ] Familiarity with asynchronous payment processing
- [ ] [TODO: Add any additional prerequisites]

---

## Overview: The Payment Flow

Understanding the complete payment flow will help you integrate effectively:

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│    Agent    │─────▶│   x402      │─────▶│   Your       │
│  (via MCP)  │      │ Facilitator │      │  Service     │
└─────────────┘      └──────────────┘      └──────────────┘
                            │
                            │ 1. Payment Token
                            │    (authorization + signature)
                            ▼
                    ┌──────────────┐
                    │   Kite       │
                    │  Service     │
                    │ Payment API  │
                    └──────────────┘
                            │
                            │ 2. On-chain Transfer
                            ▼
                    ┌──────────────┐
                    │  Kite L1     │
                    │  Testnet     │
                    └──────────────┘
```

**Key Points:**
1. Agents send payment tokens (not direct payments) to your service
2. Your service redeems tokens via the Kite Service Payment API
3. Kite executes the on-chain transfer to your service wallet
4. You deliver the service after successful redemption

---

## Understanding x402 Facilitation

### What is x402?

x402 is a payment protocol that enables standardized agent-to-service payments. It uses **facilitators** to:

- Validate payment authorizations off-chain
- Execute `transferWithAuthorization` calls on-chain
- Provide standardized payment interfaces for services

### The Authorization Format

When an agent makes a payment, it generates an EIP-712 signed authorization containing:

```json
{
  "authorization": {
    "from": "0x857b0651...",      // Payer (user) wallet
    "to": "0x209693Bc...",        // Service wallet
    "value": "10000",             // Amount in smallest token unit
    "validAfter": "1740672089",   // Payment valid from (timestamp)
    "validBefore": "1740672154",  // Payment valid until (timestamp)
    "nonce": "0xf3746613..."      // Unique identifier
  },
  "signature": "0xabc..."         // User's signature
}
```

### Facilitator Flow

1. **Receive** the authorization fields + signature from the agent
2. **Verify** the signature and time window off-chain
3. **Execute** `USDC.transferWithAuthorization(...)` on-chain
4. **Return** transaction receipt to the service

### Kite Facilitator: x402 Pieverse Facilitator

Kite Agent Passport uses the **x402 Pieverse Facilitator** for payment processing. This facilitator supports multiple networks including Kite testnet and mainnet.

**Facilitator Details:**

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

---

## API Reference: Kite Service Payment API

The Kite Service Payment API is your interface for redeeming agent payments.

### Base URL

```
[TODO: Add production/testnet Service Payment API base URL]
```

Example: `https://api.dev.gokite.ai/v1/service`

### Authentication

Include your service API key in the request headers:

```http
Authorization: Bearer YOUR_SERVICE_API_KEY
Content-Type: application/json
```

**[TODO: Add information about obtaining a service API key]**

---

## Endpoints

### Redeem Payment

Redeem a payment token from an agent and trigger on-chain transfer.

#### `POST /service/redeem-payment`

**Description**

Redeems a payment authorization token and executes the on-chain transfer to your service wallet.

**Request Body**

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
  "signature": "0xabc...",
  "serviceId": "your-service-id"
}
```

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `authorization` | object | Yes | EIP-712 authorization object |
| `authorization.from` | string | Yes | Payer wallet address |
| `authorization.to` | string | Yes | Your service wallet address |
| `authorization.value` | string | Yes | Payment amount (in smallest unit) |
| `authorization.validAfter` | string | Yes | Valid from timestamp (seconds) |
| `authorization.validBefore` | string | Yes | Valid until timestamp (seconds) |
| `authorization.nonce` | string | Yes | Unique identifier for this payment |
| `signature` | string | Yes | User's signature over the authorization |
| `serviceId` | string | Yes | Your registered service identifier |

**Response (Success)**

```json
{
  "status": "success",
  "transactionHash": "0x123...",
  "from": "0x857b0651...",
  "to": "0x209693Bc...",
  "value": "10000",
  "timestamp": "1740672100"
}
```

**Response (Error)**

```json
{
  "status": "error",
  "code": "INVALID_SIGNATURE",
  "message": "Signature verification failed"
}
```

**Error Codes**

| Code | Description |
|------|-------------|
| `INVALID_SIGNATURE` | Signature does not match the authorization |
| `EXPIRED_AUTHORIZATION` | Current time is outside validAfter/validBefore window |
| `INSUFFICIENT_FUNDS` | Payer wallet lacks sufficient balance |
| `NONCE_ALREADY_USED` | This nonce has already been used (double-spend protection) |
| `INVALID_SERVICE` | Service ID is not registered |
| `NETWORK_ERROR` | Temporary network issue, retry the request |

---

## Integration Example

### Step 1: Register Your Service

1. Contact the Kite team to register your service [TODO: Add registration process/link]
2. Provide:
   - Service name and description
   - Service wallet address
   - Pricing model (per-call, subscription, etc.)
3. Receive your `serviceId` and API key

### Step 2: Receive Payment Token from Agent

When your service endpoint is called, expect the payment token in the request body:

```javascript
// Example: Express.js endpoint
app.post('/api/execute-service', async (req, res) => {
  const { paymentToken, serviceRequest } = req.body;

  // paymentToken contains:
  // {
  //   authorization: { from, to, value, validAfter, validBefore, nonce },
  //   signature: "0xabc..."
  // }

  // Proceed to redemption...
});
```

### Step 3: Redeem the Payment

```javascript
async function redeemPayment(paymentToken) {
  const response = await fetch(
    'https://api.dev.gokite.ai/v1/service/redeem-payment',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.KITE_SERVICE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...paymentToken.authorization,
        signature: paymentToken.signature,
        serviceId: process.env.KITE_SERVICE_ID
      })
    }
  );

  const result = await response.json();

  if (result.status === 'success') {
    console.log('Payment redeemed:', result.transactionHash);
    return result;
  } else {
    throw new Error(`Payment failed: ${result.message}`);
  }
}
```

### Step 4: Execute Your Service

After successful redemption, deliver your service:

```javascript
app.post('/api/execute-service', async (req, res) => {
  try {
    // 1. Redeem the payment
    const paymentResult = await redeemPayment(req.body.paymentToken);

    // 2. Execute your service logic
    const serviceResult = await executeServiceLogic(req.body.serviceRequest);

    // 3. Return the result
    res.json({
      status: 'success',
      payment: {
        transactionHash: paymentResult.transactionHash,
        amount: paymentResult.value
      },
      result: serviceResult
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});
```

---

## Testing Your Integration

### Testnet Setup

1. **Get testnet tokens:**
   - Create a service wallet on Kite L1 testnet
   - Request tokens from the faucet [TODO: Add faucet link]

2. **Use a test agent:**
   - Set up a test agent with Kite MCP
   - Create a test Session with your service
   - Make a test payment

3. **Verify redemption:**
   - Check your service wallet balance
   - Confirm transaction on the testnet explorer [TODO: Add explorer link]

### Test Scenarios

| Scenario | Expected Result |
|----------|-----------------|
| Valid payment token | Successful redemption, balance increases |
| Invalid signature | `INVALID_SIGNATURE` error returned |
| Expired token | `EXPIRED_AUTHORIZATION` error returned |
| Reused nonce | `NONCE_ALREADY_USED` error returned |
| Insufficient funds | `INSUFFICIENT_FUNDS` error returned |

### Debugging Tools

- **Testnet Explorer:** [TODO: Add link] - Verify transactions on-chain
- **API Logs:** Check Kite Service Payment API logs for detailed error information
- **Service Dashboard:** [TODO: Add link] - Monitor your service's payment activity

---

## Security Considerations

### Verify Before Serving

Always redeem the payment **before** delivering your service:

```javascript
// ❌ Don't do this
const result = await executeService(request);
await redeemPayment(paymentToken); // Too late!

// ✅ Do this instead
await redeemPayment(paymentToken);
const result = await executeService(request);
```

### Validate Authorization Fields

Before calling the redemption API, verify:

- [ ] `to` address matches your service wallet
- [ ] `value` matches your expected pricing
- [ ] Time window (`validAfter`/`validBefore`) is acceptable
- [ ] `nonce` is unique (store and check used nonces)

### Handle Race Conditions

Multiple agents could potentially send payments with the same nonce:

```javascript
// Use a database with unique constraints
async function recordNonce(nonce) {
  try {
    await db.nonces.insert({ nonce, usedAt: Date.now() });
  } catch (error) {
    if (error.code === 'DUPLICATE_KEY') {
      throw new Error('Nonce already used');
    }
    throw error;
  }
}
```

---

## Pricing Models

### Per-Call Pricing

Charge for each individual service call:

```json
{
  "authorization": {
    "value": "5000"  // $0.005 per call (example)
  }
}
```

### Tiered Pricing

Different prices for different service levels:

```javascript
function getPricingTier(serviceRequest) {
  const tiers = {
    'basic': '1000',      // $0.001
    'premium': '5000',    // $0.005
    'enterprise': '20000' // $0.02
  };
  return tiers[serviceRequest.tier] || tiers['basic'];
}
```

### Subscription Model

**[TODO: Clarify if subscription model is supported]**

For subscriptions, consider:
- Pre-authorized monthly payments
- Session-based recurring authorizations
- Service-specific tracking of subscription status

---

## Advanced Topics

### Webhook Notifications

**[TODO: Add information about webhook support for payment confirmations]**

Receive notifications when:
- A payment is successfully redeemed
- A payment fails
- A payment is pending network confirmation

### Metadata in Payments

**[TODO: Clarify if metadata can be included in payments]**

Attach contextual information to payments for better tracking:

```javascript
{
  authorization: { /* ... */ },
  metadata: {
    userId: "user_123",
    serviceTier: "premium",
    requestId: "req_abc"
  }
}
```

### Batch Redemptions

**[TODO: Add information about batch payment redemption if supported]**

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Payment redemption fails | Invalid signature | Verify signature format and authorization object |
| "Nonce already used" | Double-spend attempt | Return error to agent, do not execute service |
| "Insufficient funds" | User wallet empty | Return clear error, suggest user adds funds |
| Slow redemption | Network congestion | Implement retry logic with exponential backoff |

### Monitoring

Set up monitoring for:
- Redemption success rate
- Error frequency by type
- Average redemption time
- Revenue metrics

**[TODO: Add information about available monitoring dashboards or webhooks]**

---

## Next Steps

Once your integration is complete:

1. **Test thoroughly** with various payment scenarios
2. **Deploy to testnet** and verify end-to-end flows
3. **Monitor transactions** using the Kite Portal
4. **Prepare for mainnet** by reviewing the [Testnet Notice](testnet-notice.md)
5. **List your service** on the Kite AI Agent App Store [TODO: Add link]

---

## Additional Resources

- **x402 Protocol:** [TODO: Add x402 documentation link]
- **Testnet Explorer:** [TODO: Add explorer link]
- **Service Dashboard:** [TODO: Add dashboard link]
- **Developer Discord:** [TODO: Add Discord link]

***

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*

*Continue to: [Developer Guide](developer-guide.md)*
