# End-user OAuth API

Authentication and account management for end-users connecting to Kite.

## 🎯 Overview

End-users use OAuth to connect their existing accounts (Google, Coinbase, PayPal) to Kite for secure delegation and payment authorization. Kite does not store user credentials directly.

## 🔐 Supported OAuth Providers

| Provider | OAuth 2.0 | OpenID Connect | Use Case |
|----------|------------|----------------|----------|
| **Google** | ✅ | ✅ | General authentication |
| **Coinbase** | ✅ | ❌ | Crypto wallet connection |
| **PayPal** | ✅ | ❌ | Payment method integration |
| **Apple** | ✅ | ✅ | iOS/macOS integration |
| **Microsoft** | ✅ | ✅ | Enterprise authentication |

## 📋 Core Endpoints

### OAuth Authorization

#### Initiate OAuth Flow
```http
POST /v1/oauth/authorize
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "provider": "google",
  "redirect_uri": "https://your-app.com/oauth/callback",
  "scopes": ["profile", "email", "payment"],
  "state": "random_state_string"
}
```

**Response:**
```json
{
  "auth_url": "https://accounts.google.com/oauth/authorize?client_id=...",
  "state": "random_state_string",
  "expires_in": 600
}
```

#### Complete OAuth Flow
```http
POST /v1/oauth/token
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "code": "oauth_authorization_code",
  "state": "random_state_string",
  "provider": "google"
}
```

**Response:**
```json
{
  "access_token": "kite_user_token_123",
  "refresh_token": "kite_refresh_token_456",
  "user_id": "oauth:google:user_123",
  "provider": "google",
  "expires_in": 3600,
  "scopes": ["profile", "email", "payment"]
}
```

### User Account Management

#### Get User Profile
```http
GET /v1/users/me
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
```

**Response:**
```json
{
  "user_id": "oauth:google:user_123",
  "provider": "google",
  "profile": {
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://lh3.googleusercontent.com/..."
  },
  "connected_at": "2025-01-22T10:00:00Z",
  "last_active": "2025-01-22T15:30:00Z"
}
```

#### Refresh Access Token
```http
POST /v1/oauth/refresh
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "refresh_token": "kite_refresh_token_456"
}
```

**Response:**
```json
{
  "access_token": "kite_user_token_789",
  "expires_in": 3600
}
```

### Wallet Connection

#### Connect Crypto Wallet
```http
POST /v1/wallets/connect
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
Content-Type: application/json

{
  "wallet_address": "0x1234567890abcdef...",
  "wallet_type": "ethereum",
  "signature": "0xabcdef1234567890..."
}
```

**Response:**
```json
{
  "wallet_id": "wallet_123",
  "address": "0x1234567890abcdef...",
  "type": "ethereum",
  "verified": true,
  "connected_at": "2025-01-22T10:00:00Z"
}
```

#### Get Connected Wallets
```http
GET /v1/wallets
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
```

**Response:**
```json
{
  "wallets": [
    {
      "wallet_id": "wallet_123",
      "address": "0x1234567890abcdef...",
      "type": "ethereum",
      "verified": true,
      "balance": "1.5",
      "currency": "ETH"
    }
  ]
}
```

### Delegation Management

#### Get Active Delegations
```http
GET /v1/delegations
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
Query Parameters:
  - status: active
  - agent_id: agent_123
  - limit: 20
```

**Response:**
```json
{
  "delegations": [
    {
      "delegation_id": "delegation_123",
      "agent_id": "agent_456",
      "agent_name": "Shopping Assistant",
      "status": "active",
      "amount_limit": "100.00",
      "currency": "USDC",
      "expires_at": "2025-01-22T18:00:00Z",
      "created_at": "2025-01-22T10:00:00Z"
    }
  ]
}
```

#### Revoke Delegation
```http
DELETE /v1/delegations/{delegation_id}
Authorization: Bearer {api_key}
X-User-Token: {user_access_token}
```

**Response:**
```json
{
  "delegation_id": "delegation_123",
  "status": "revoked",
  "revoked_at": "2025-01-22T15:00:00Z"
}
```

## 🛠️ SDK Examples

### Python SDK
```python
from kite_sdk import KiteClient

# Initialize client
client = KiteClient(api_key="your_api_key")

# Initiate OAuth flow
auth_url = client.oauth.get_authorization_url(
    provider="google",
    redirect_uri="https://your-app.com/oauth/callback",
    scopes=["profile", "email", "payment"]
)

# Complete OAuth flow (after user redirect)
user_token = client.oauth.exchange_code(
    code="oauth_authorization_code",
    provider="google"
)

# Get user profile
profile = client.users.get_profile(user_token=user_token.access_token)

# Connect wallet
wallet = client.wallets.connect(
    user_token=user_token.access_token,
    wallet_address="0x1234567890abcdef...",
    wallet_type="ethereum"
)
```

### Node.js SDK
```javascript
const { KiteClient } = require('@kite/sdk');

const client = new KiteClient({
  apiKey: 'your_api_key'
});

// Initiate OAuth flow
const authUrl = await client.oauth.getAuthorizationUrl({
  provider: 'google',
  redirectUri: 'https://your-app.com/oauth/callback',
  scopes: ['profile', 'email', 'payment']
});

// Complete OAuth flow
const userToken = await client.oauth.exchangeCode({
  code: 'oauth_authorization_code',
  provider: 'google'
});

// Get user profile
const profile = await client.users.getProfile({
  userToken: userToken.accessToken
});

// Connect wallet
const wallet = await client.wallets.connect({
  userToken: userToken.accessToken,
  walletAddress: '0x1234567890abcdef...',
  walletType: 'ethereum'
});
```

## 🔒 Security & Privacy

### Data Protection
- **No Credential Storage:** Kite never stores user passwords
- **Token-based Auth:** All authentication via secure tokens
- **Encrypted Storage:** User data encrypted at rest
- **GDPR Compliance:** Full data portability and deletion

### OAuth Security
- **PKCE Support:** Proof Key for Code Exchange
- **State Parameter:** CSRF protection
- **Scope Limitation:** Minimal required permissions
- **Token Expiration:** Short-lived access tokens

## 📊 Webhook Events

### User Events
- `user.connected` - User connected via OAuth
- `user.disconnected` - User disconnected
- `user.profile.updated` - User profile updated

### Wallet Events
- `wallet.connected` - Wallet connected
- `wallet.disconnected` - Wallet disconnected
- `wallet.balance.updated` - Wallet balance changed

### Delegation Events
- `delegation.created` - New delegation created
- `delegation.updated` - Delegation limits updated
- `delegation.revoked` - Delegation revoked

### Webhook Payload Example
```json
{
  "event": "delegation.created",
  "timestamp": "2025-01-22T10:00:00Z",
  "data": {
    "user_id": "oauth:google:user_123",
    "delegation_id": "delegation_456",
    "agent_id": "agent_789",
    "amount_limit": "100.00",
    "currency": "USDC"
  }
}
```

## 🔄 Integration Patterns

### OAuth Flow Implementation
```python
@app.route('/oauth/authorize')
def oauth_authorize():
    # Generate state parameter for CSRF protection
    state = generate_random_string()
    session['oauth_state'] = state
    
    # Get authorization URL
    auth_url = client.oauth.get_authorization_url(
        provider="google",
        redirect_uri=request.url_root + "oauth/callback",
        state=state
    )
    
    return redirect(auth_url)

@app.route('/oauth/callback')
def oauth_callback():
    # Verify state parameter
    if request.args.get('state') != session.get('oauth_state'):
        return 'Invalid state', 400
    
    # Exchange code for token
    user_token = client.oauth.exchange_code(
        code=request.args.get('code'),
        provider="google"
    )
    
    # Store user token securely
    session['user_token'] = user_token.access_token
    
    return redirect('/dashboard')
```

### Wallet Connection Flow
```python
@app.route('/connect-wallet', methods=['POST'])
def connect_wallet():
    user_token = session.get('user_token')
    if not user_token:
        return 'Not authenticated', 401
    
    # Get wallet address from request
    wallet_address = request.json.get('wallet_address')
    
    # Connect wallet
    wallet = client.wallets.connect(
        user_token=user_token,
        wallet_address=wallet_address,
        wallet_type="ethereum"
    )
    
    return jsonify({
        'wallet_id': wallet.wallet_id,
        'address': wallet.address,
        'verified': wallet.verified
    })
```

## 📈 Error Handling

### Common Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request payload |
| 401 | Unauthorized | Invalid or expired token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | User or resource not found |
| 422 | Unprocessable Entity | Invalid OAuth parameters |
| 429 | Rate Limited | Too many requests |

### Example Error Response
```json
{
  "error": {
    "code": "INVALID_OAUTH_CODE",
    "message": "OAuth authorization code is invalid or expired",
    "details": {
      "provider": "google",
      "code": "invalid_code_123"
    }
  }
}
```

## 🚀 Best Practices

### OAuth Implementation
- **State Parameter:** Always use state for CSRF protection
- **HTTPS Only:** Use HTTPS for all OAuth redirects
- **Token Storage:** Store tokens securely (encrypted)
- **Scope Limitation:** Request only necessary permissions

### User Experience
- **Clear Permissions:** Explain why permissions are needed
- **Easy Revocation:** Allow users to revoke permissions
- **Progress Indicators:** Show OAuth flow progress
- **Error Handling:** Provide clear error messages
