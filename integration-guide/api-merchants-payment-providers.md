# Merchant Integration Guide

Integrate Kite’s payment verification API into your checkout system to accept **agent-initiated stablecoin payments** with full proof-based security.

---

## 🎯 What You’re Building

You’re enabling your checkout system to:

- **Accept payments from AI agents** acting on behalf of verified users  
- **Validate delegation proofs** issued by Kite Chain  
- **Trigger stablecoin transfers** from authorized agent-managed wallets  
- **Track transaction receipts** for settlement and reconciliation  

Kite provides APIs that handle verification and payment coordination — **you never custody or manage user funds directly**.

---

## 🔐 Authentication

All merchant endpoints use your **Developer API Key** for authentication.  
User authentication and delegation are managed separately by the Kite network.

---

## 📘 Core Endpoints

### 1. Proof Verification

#### `POST /v1/proof/verify`

Validate a proof of delegation received from an AI agent during checkout.
Ensures the proof was issued by Kite Chain, has not expired, and is within authorized limits.

**Request Example**
```json
{
  "proof_id": "proof_12345",
  "signature": "0xabc123...",
  "merchant_id": "merchant_001"
}
```

**Response Example**
```json
{
  "valid": true,
  "delegated_amount": "100 USDC",
  "expires_at": "2025-10-30T23:59:59Z",
  "agent_id": "0xdef456..."
}
```

### 2. Payment Processing

#### `POST /v1/payments/request`

Initiate a stablecoin transfer to your designated merchant wallet based on a verified proof.

**Request Example**
```json
{
  "proof_id": "proof_12345",
  "signature": "0xabc123...",
  "destination_wallet": "0xmerchantWallet...",
  "amount": "100 USDC"
}
```

**Response Example**
```json
{
  "transaction_id": "tx_789",
  "status": "processing"
}
```

#### `GET /v1/payments/{transaction_id}`

Retrieve the current status or final receipt of a transfer.

**Response Example**
```json
{
  "transaction_id": "tx_789",
  "status": "confirmed",
  "confirmed_at": "2025-10-22T08:31:02Z",
  "tx_hash": "0xdef456..."
}

```