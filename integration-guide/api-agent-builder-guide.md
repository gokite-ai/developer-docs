# Agent Builder Guide

Complete guide for building AI agents with Kite's payment capabilities - from agent registration to OAuth integration.

## 🎯 What You're Building

You're building an AI agent that can make payments autonomously on behalf of users. This requires:
1. **Agent Registration** - Register your agent with Kite
2. **MCP Integration** - Connect to Kite's remote MCP server
3. **OAuth Integration** - Let users authenticate and configure spending sessions
4. **Payment Processing** - Enable autonomous payments through your agent

## 🔐 Authentication Overview

- **Developer API Key** - For agent registration and management
- **User OAuth** - For end-user authentication and session creation
- **MCP Server** - Remote server at `***TODO***` for agent communication

## 🛠️ Integration Steps

### **Step 1: Register Your Agent**

First, register your agent to get a developer API key:

```http
POST /v1/agents
Authorization: Bearer {your_developer_api_key}
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

### **Step 2: Configure MCP Server**

Connect your agent to Kite's remote MCP server:

```json
{
  "mcpServers": {
    "kite": {
      "url": "***TODO***",
      "auth": {
        "type": "oauth",
        "clientId": "your_oauth_client_id",
        "redirectUri": "https://your-app.com/oauth/callback"
      }
    }
  }
}
```

### **Step 3: Implement OAuth Flow**

Implement OAuth flow following the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#authorization-flow):

```javascript
// 1. Initiate OAuth flow
const authUrl = await kiteMCP.oauth.getAuthorizationUrl({
  redirectUri: 'https://your-app.com/oauth/callback',
  scopes: ['payment', 'delegation']
});

// 2. Redirect user to Kite
window.location.href = authUrl;

// 3. Handle callback
const userToken = await kiteMCP.oauth.exchangeCode({
  code: urlParams.get('code'),
  state: urlParams.get('state')
});

// 4. Create spending session
const session = await kiteMCP.sessions.create({
  userToken: userToken.access_token,
  guardrails: {
    maxAmount: '100.00',
    currency: 'USDC',
    expiresAt: '2025-01-22T18:00:00Z'
  }
});
```

## 🔧 MCP Tools Available

- `authorize_payment` - Generate payment authorization
- `execute_payment` - Execute payment with delegation proof
- `get_payment_history` - Get payment history and status
- `terminate_session` - Terminate the session to prevent unexpected use

## 📚 External Resources

- [MCP Authorization Flow](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#authorization-flow) - Official MCP authorization specification
- [Auth0: MCP and Authorization Guide](https://auth0.com/blog/an-introduction-to-mcp-and-authorization/#Authorization-in-the-World-of-MCPs) - Comprehensive authorization patterns
- **Kite MCP Server:** `***TODO***`
- **OAuth Endpoint:** `***TODO***`
- **Required Scopes:** `payment`, `delegation`

## 🔒 Security & Best Practices

- **OAuth Security:** Use state parameter for CSRF protection, HTTPS only, secure token storage
- **Session Management:** Check session status before payments, respect user guardrails
- **Error Handling:** Provide clear error messages, handle token expiration gracefully

## 🚀 Agent Integration Example

```python
# In your AI agent
from kite_mcp import KiteMCPClient

# Initialize MCP client
kite = KiteMCPClient(api_key="your_api_key")

# Check if user has active session
session = await kite.session_status(user_token=user_token)

if session.active:
    # Generate payment authorization
    payment_auth = await kite.payment_authorize(
        user_token=user_token,
        amount="25.50",
        currency="USDC",
        merchant_id="merchant_123"
    )
    
    # Execute payment
    result = await kite.payment_execute(
        payment_auth=payment_auth,
        merchant_id="merchant_123"
    )
```

## 📞 Support & Resources

- **MCP Documentation:** [Model Context Protocol](https://modelcontextprotocol.io/docs)
- **Developer Support:** [Discord Community](https://discord.gg/kite)
- **API Status:** [Kite API Status](https://status.kite.ai)
