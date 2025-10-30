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
  "recipient_wallet": "0xmerchantWallet..."
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

### 3. Transaction History

#### `GET /v1/payments/history`

Retrieve paginated transaction history filtered by wallet addresses.

**Query Parameters**
- `from_address`: Filter payments from specific wallet (optional)
- `to_address`: Filter payments to specific wallet (optional)
- `limit`: Number of transactions (default: 50, max: 100)
- `offset`: Pagination offset
- `status`: Filter by status (pending, confirmed, failed)

**Note**: Use `from_address` to see payments from specific users/agents, `to_address` to see payments to your merchant wallet, or both to find specific payment flows.

**Response Example**
```json
{
  "transactions": [
    {
      "transaction_id": "tx_789",
      "amount": "100 USDC",
      "status": "confirmed",
      "created_at": "2025-10-22T08:31:02Z",
      "agent_id": "0xdef456..."
    }
  ],
  "total": 150,
  "has_more": true
}
```