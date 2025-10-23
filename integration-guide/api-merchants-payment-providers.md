# Merchant Integration Guide

How to integrate Kite's payment verification into your checkout system to accept agent-initiated payments.

## 🎯 What You're Building

You're building a payment processing system that can safely receive payments from AI agents. This requires integrating proof verification, stablecoin processing, and transaction management into your checkout flow.

## 🔐 Authentication

- **Developer API Key:** Required for all endpoints
- **Merchant ID:** Identifies your merchant account
- **Webhook Secret:** For verifying webhook signatures

## 📋 Core Endpoints

### Proof Verification

#### Verify Proof of Delegation
```http
POST /v1/verifications
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "proof_id": "proof_abc123",
  "merchant_id": "merchant_456",
  "amount": "25.50",
  "currency": "USDC"
}
```

**Response:**
```json
{
  "valid": true,
  "proof_details": {
    "user_id": "oauth:google:user_123",
    "agent_id": "agent_789",
    "session_id": "session_456",
    "amount": "25.50",
    "currency": "USDC",
    "expires_at": "2025-01-22T18:00:00Z",
    "guardrails": {
      "max_amount": "100.00",
      "allowed_merchants": ["merchant_456"]
    }
  },
  "verification_timestamp": "2025-01-22T10:00:00Z"
}
```

#### Get Proof Details
```http
GET /v1/verifications/{proof_id}
Authorization: Bearer {api_key}
```

### Payment Processing

#### Request Stablecoin Transfer
```http
POST /v1/transfers
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "proof_id": "proof_abc123",
  "merchant_wallet": "0x1234567890abcdef...",
  "amount": "25.50",
  "currency": "USDC",
  "order_id": "order_123",
  "callback_url": "https://your-merchant.com/webhooks/kite"
}
```

**Response:**
```json
{
  "transfer_id": "transfer_xyz789",
  "status": "pending",
  "transaction_hash": null,
  "estimated_completion": "2025-01-22T10:05:00Z",
  "tracking_url": "https://kite.ai/track/transfer_xyz789"
}
```

#### Check Transfer Status
```http
GET /v1/transfers/{transfer_id}
Authorization: Bearer {api_key}
```

**Response:**
```json
{
  "transfer_id": "transfer_xyz789",
  "status": "completed",
  "transaction_hash": "0xabcdef1234567890...",
  "completed_at": "2025-01-22T10:03:45Z",
  "amount": "25.50",
  "currency": "USDC",
  "gas_fee": "0.001",
  "net_amount": "25.499"
}
```

### Transaction History

#### Get Merchant Transactions
```http
GET /v1/transactions
Authorization: Bearer {api_key}
Query Parameters:
  - merchant_id: merchant_456
  - status: completed
  - from_date: 2025-01-01
  - to_date: 2025-01-31
  - limit: 50
  - offset: 0
```

**Response:**
```json
{
  "transactions": [
    {
      "transfer_id": "transfer_xyz789",
      "proof_id": "proof_abc123",
      "amount": "25.50",
      "currency": "USDC",
      "status": "completed",
      "created_at": "2025-01-22T10:00:00Z",
      "completed_at": "2025-01-22T10:03:45Z",
      "order_id": "order_123"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "has_more": true
  }
}
```

#### Get Transaction Details
```http
GET /v1/transactions/{transfer_id}
Authorization: Bearer {api_key}
```

## 🛠️ SDK Examples

### Python SDK
```python
from kite_sdk import KiteClient

# Initialize client
client = KiteClient(api_key="your_api_key")

# Verify proof of delegation
verification = client.verifications.verify(
    proof_id="proof_abc123",
    merchant_id="merchant_456",
    amount="25.50",
    currency="USDC"
)

if verification.valid:
    # Request stablecoin transfer
    transfer = client.transfers.create(
        proof_id="proof_abc123",
        merchant_wallet="0x1234567890abcdef...",
        amount="25.50",
        currency="USDC",
        order_id="order_123"
    )
    
    # Check transfer status
    status = client.transfers.get_status(transfer.id)
    print(f"Transfer status: {status.status}")
```

### Node.js SDK
```javascript
const { KiteClient } = require('@kite/sdk');

const client = new KiteClient({
  apiKey: 'your_api_key'
});

// Verify proof
const verification = await client.verifications.verify({
  proofId: 'proof_abc123',
  merchantId: 'merchant_456',
  amount: '25.50',
  currency: 'USDC'
});

if (verification.valid) {
  // Request transfer
  const transfer = await client.transfers.create({
    proofId: 'proof_abc123',
    merchantWallet: '0x1234567890abcdef...',
    amount: '25.50',
    currency: 'USDC',
    orderId: 'order_123'
  });
  
  // Monitor transfer
  const status = await client.transfers.getStatus(transfer.id);
  console.log(`Transfer status: ${status.status}`);
}
```

## 🔒 Security & Compliance

### Proof Verification Process
1. **Cryptographic Validation:** Verify digital signature
2. **Session Validation:** Check session is active and authorized
3. **Guardrail Enforcement:** Ensure transaction within limits
4. **Merchant Authorization:** Verify merchant is allowed
5. **Expiration Check:** Ensure proof hasn't expired

### Fraud Prevention
- **Real-time Verification:** All proofs verified before payment
- **Session Tracking:** Monitor for suspicious patterns
- **Amount Limits:** Enforce spending constraints
- **Merchant Whitelisting:** Restrict to authorized merchants

## 📊 Webhook Integration

### Webhook Events
- `transfer.initiated` - Transfer request received
- `transfer.processing` - Transfer in progress
- `transfer.completed` - Transfer successful
- `transfer.failed` - Transfer failed
- `verification.failed` - Proof verification failed

### Webhook Payload Example
```json
{
  "event": "transfer.completed",
  "timestamp": "2025-01-22T10:03:45Z",
  "data": {
    "transfer_id": "transfer_xyz789",
    "proof_id": "proof_abc123",
    "merchant_id": "merchant_456",
    "amount": "25.50",
    "currency": "USDC",
    "transaction_hash": "0xabcdef1234567890...",
    "order_id": "order_123"
  }
}
```

### Webhook Security
```python
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)
```

## 🔄 Integration Patterns

### Pull Payment Flow
```python
# 1. Receive checkout request with proof
proof_id = request.json['proof_id']

# 2. Verify proof
verification = client.verifications.verify(
    proof_id=proof_id,
    merchant_id=merchant_id,
    amount=amount,
    currency=currency
)

# 3. Request transfer if valid
if verification.valid:
    transfer = client.transfers.create(
        proof_id=proof_id,
        merchant_wallet=merchant_wallet,
        amount=amount,
        currency=currency
    )
    
    # 4. Process order
    process_order(transfer.id)
```

### Webhook-based Processing
```python
@app.route('/webhooks/kite', methods=['POST'])
def handle_kite_webhook():
    # Verify webhook signature
    signature = request.headers.get('X-Kite-Signature')
    if not verify_webhook_signature(request.data, signature, webhook_secret):
        return 'Unauthorized', 401
    
    # Process webhook event
    event = request.json
    if event['event'] == 'transfer.completed':
        transfer_id = event['data']['transfer_id']
        fulfill_order(transfer_id)
    
    return 'OK', 200
```

## 📈 Error Handling

### Common Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request payload |
| 401 | Unauthorized | Invalid API key |
| 403 | Forbidden | Insufficient permissions |
| 422 | Invalid Proof | Proof verification failed |
| 429 | Rate Limited | Too many requests |
| 500 | Server Error | Internal server error |

### Example Error Response
```json
{
  "error": {
    "code": "INVALID_PROOF",
    "message": "Proof of delegation is invalid or expired",
    "details": {
      "proof_id": "proof_abc123",
      "reason": "expired",
      "expired_at": "2025-01-22T09:00:00Z"
    }
  }
}
```

## 🚀 Best Practices

### Performance Optimization
- **Async Processing:** Use webhooks for non-blocking operations
- **Batch Verification:** Verify multiple proofs in single request
- **Caching:** Cache verification results for repeated proofs
- **Rate Limiting:** Implement client-side rate limiting

### Security Best Practices
- **Webhook Verification:** Always verify webhook signatures
- **HTTPS Only:** Use HTTPS for all API communications
- **API Key Rotation:** Regularly rotate API keys
- **Audit Logging:** Log all API interactions for compliance
