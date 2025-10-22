# Agent Builders API

Complete API documentation for building AI agents that can make payments autonomously.

## 🎯 Overview

Agent Builders use these APIs to create AI agents that can autonomously make payments on behalf of users. This includes agent registration, user authentication, session management, and delegation proof generation.

## 🔐 Authentication

- **Developer API Key:** Required for all endpoints
- **OAuth Token:** Required for user-specific operations
- **Session Token:** Required for delegation operations

## 📋 Core Endpoints

### Agent Management

#### Create Agent
```http
POST /v1/agents
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "name": "Shopping Assistant",
  "description": "AI agent for autonomous shopping",
  "capabilities": ["payment", "delegation"],
  "webhook_url": "https://your-app.com/webhooks/kite"
}
```

**Response:**
```json
{
  "agent_id": "agent_123456",
  "api_key": "kite_live_...",
  "status": "active",
  "created_at": "2025-01-22T10:00:00Z"
}
```

#### Get Agent Details
```http
GET /v1/agents/{agent_id}
Authorization: Bearer {api_key}
```

### User Authentication

#### Initiate OAuth Flow
```http
POST /v1/oauth/authorize
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "agent_id": "agent_123456",
  "redirect_uri": "https://your-app.com/callback",
  "scopes": ["payment", "delegation"]
}
```

**Response:**
```json
{
  "auth_url": "https://kite.ai/oauth/authorize?client_id=...",
  "state": "random_state_string"
}
```

#### Complete OAuth Flow
```http
POST /v1/oauth/token
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "code": "oauth_code_from_callback",
  "state": "random_state_string"
}
```

**Response:**
```json
{
  "access_token": "user_access_token",
  "user_id": "oauth:google:user_123",
  "expires_in": 3600
}
```

### Session Management

#### Create KitePass Session
```http
POST /v1/sessions
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
Content-Type: application/json

{
  "agent_id": "agent_123456",
  "user_id": "oauth:google:user_123",
  "guardrails": {
    "max_amount": "100.00",
    "currency": "USDC",
    "expires_at": "2025-01-22T18:00:00Z",
    "allowed_merchants": ["merchant_456", "merchant_789"],
    "blocked_categories": ["adult", "gambling"]
  }
}
```

**Response:**
```json
{
  "session_id": "session_789",
  "status": "active",
  "guardrails": {
    "max_amount": "100.00",
    "currency": "USDC",
    "expires_at": "2025-01-22T18:00:00Z"
  },
  "created_at": "2025-01-22T10:00:00Z"
}
```

#### Get Session Status
```http
GET /v1/sessions/{session_id}
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
```

### Delegation Proof Generation

#### Generate Proof of Delegation
```http
POST /v1/delegations
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
Content-Type: application/json

{
  "session_id": "session_789",
  "merchant_id": "merchant_456",
  "amount": "25.50",
  "currency": "USDC",
  "product_details": {
    "name": "Wireless Headphones",
    "category": "electronics",
    "sku": "WH-001"
  },
  "metadata": {
    "order_id": "order_123",
    "shipping_address": "123 Main St, City, State"
  }
}
```

**Response:**
```json
{
  "proof_id": "proof_abc123",
  "signature": "0x1a2b3c4d5e6f...",
  "merkle_root": "0x7f8e9d0c1b2a...",
  "expires_at": "2025-01-22T18:00:00Z",
  "verification_url": "https://kite.ai/verify/proof_abc123"
}
```

#### Verify Proof Status
```http
GET /v1/delegations/{proof_id}/status
Authorization: Bearer {api_key}
```

## 🛠️ SDK Examples

### Python SDK
```python
from kite_sdk import KiteClient

# Initialize client
client = KiteClient(api_key="your_api_key")

# Create agent
agent = client.agents.create({
    "name": "Shopping Assistant",
    "description": "AI agent for autonomous shopping"
})

# Authenticate user
auth_url = client.oauth.get_authorization_url(
    agent_id=agent.id,
    redirect_uri="https://your-app.com/callback"
)

# Create session with guardrails
session = client.sessions.create(
    agent_id=agent.id,
    user_id="oauth:google:user_123",
    guardrails={
        "max_amount": "100.00",
        "currency": "USDC",
        "expires_at": "2025-01-22T18:00:00Z"
    }
)

# Generate delegation proof
proof = client.delegations.create(
    session_id=session.id,
    merchant_id="merchant_456",
    amount="25.50",
    currency="USDC"
)
```

### Node.js SDK
```javascript
const { KiteClient } = require('@kite/sdk');

const client = new KiteClient({
  apiKey: 'your_api_key'
});

// Create agent
const agent = await client.agents.create({
  name: 'Shopping Assistant',
  description: 'AI agent for autonomous shopping'
});

// Create session
const session = await client.sessions.create({
  agentId: agent.id,
  userId: 'oauth:google:user_123',
  guardrails: {
    maxAmount: '100.00',
    currency: 'USDC',
    expiresAt: '2025-01-22T18:00:00Z'
  }
});

// Generate delegation proof
const proof = await client.delegations.create({
  sessionId: session.id,
  merchantId: 'merchant_456',
  amount: '25.50',
  currency: 'USDC'
});
```

## 🔒 Security Considerations

### Session Guardrails
- **Spending Limits:** Enforce maximum amounts per session
- **Time Windows:** Set expiration times for sessions
- **Merchant Restrictions:** Allow/block specific merchants
- **Category Filtering:** Block certain product categories

### Proof Validation
- All proofs are cryptographically signed
- Proofs include session constraints and user authorization
- Proofs are tamper-evident and verifiable
- Each proof is unique and non-reusable

## 📊 Error Handling

### Common Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request payload |
| 401 | Unauthorized | Invalid API key or user token |
| 403 | Forbidden | Insufficient permissions |
| 422 | Unprocessable Entity | Invalid session or delegation parameters |
| 429 | Rate Limited | Too many requests |

### Example Error Response
```json
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "User balance insufficient for requested amount",
    "details": {
      "available": "50.00",
      "requested": "100.00",
      "currency": "USDC"
    }
  }
}
```

## 🔄 Webhook Events

### Session Events
- `session.created` - New session created
- `session.updated` - Session guardrails updated
- `session.expired` - Session expired

### Delegation Events
- `delegation.created` - New proof generated
- `delegation.used` - Proof used for payment
- `delegation.expired` - Proof expired

### Webhook Payload Example
```json
{
  "event": "delegation.created",
  "timestamp": "2025-01-22T10:00:00Z",
  "data": {
    "proof_id": "proof_abc123",
    "session_id": "session_789",
    "user_id": "oauth:google:user_123",
    "amount": "25.50",
    "currency": "USDC"
  }
}
```
