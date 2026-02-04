---
description: API reference and integration guide for developers building Kite Agent Passport into agentic applications.
---

# Developer Guide

This guide explains how to integrate Kite Agent Passport into your agentic application. After completing this guide, your AI agents will be able to make secure, delegated payments on behalf of users.

## What You're Building

By integrating Kite Agent Passport, your agent application will be able to:

- Authenticate users with Kite sign-in
- Request and manage payment Sessions and Delegations
- Execute payments with a simple `kite.pay(...)` API
- Handle user prompts for signature requests automatically

## Prerequisites

Before you begin, ensure you have:

- [ ] An agent framework or application that supports MCP (Model Context Protocol)
- [ ] Basic understanding of REST APIs
- [ ] A Kite developer account [TODO: Add sign-up link]
- [ ] Familiarity with asynchronous programming
- [ ] [TODO: Add any additional prerequisites]

---

## Overview: The Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Your Agent Application                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Agent Logic (Your Code)                    │   │
│  │                                                         │   │
│  │  if (needsPayment) {                                    │   │
│  │    await kite.pay({                                    │   │
│  │      to: serviceAddress,                               │   │
│  │      value: amount,                                    │   │
│  │      serviceId: serviceId                              │   │
│  │    });                                                 │   │
│  │  }                                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Kite MCP Tool                              │   │
│  │  - Calls Agent Payment API                             │   │
│  │  - Handles session_creation_required errors            │   │
│  │  - Triggers user prompt UI                             │   │
│  │  - Retries payment after approval                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Kite Agent Passport APIs                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │  Identity API    │  │   Session API    │  │  Payment API   │ │
│  │  - registerUser  │  │  - createSession │  │  - initiate    │ │
│  │  - registerAgent │  │  - getSessions   │  │    payment      │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Key Insight:** The Kite MCP Tool handles all the complexity of Sessions, Delegations, and user prompts. Your agent code only needs to call `kite.pay(...)`.

---

## API Reference

### Base URL

```
[TODO: Add production/testnet API base URL]
```

Example: `https://api.dev.gokite.ai/v1`

### Authentication

Include your API key in the request headers:

```http
Authorization: Bearer YOUR_DEVELOPER_API_KEY
Content-Type: application/json
```

**[TODO: Add information about obtaining a developer API key]**

---

## Endpoints

### Identity: Register Agent

Register a new agent with Kite Agent Passport.

#### `POST /identity/agents`

**Description**

Registers a new agent that can be used by end users. Returns a unique `agentId` that will be used in all subsequent operations.

**Request Body**

```json
{
  "name": "My Research Agent",
  "description": "An agent that helps with research tasks",
  "metadata": {
    "version": "1.0.0",
    "framework": "langchain",
    "developer": "your-name"
  }
}
```

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Human-readable name for the agent |
| `description` | string | No | Description of what the agent does |
| `metadata` | object | No | Additional developer metadata |

**Response (Success)**

```json
{
  "status": "success",
  "agentId": "agent_abc123...",
  "createdAt": "1740672089"
}
```

**[TODO: Add API key generation/management endpoints]**

---

### Session: Create Session

Create a new payment Session for a user-agent pair.

#### `POST /sessions`

**Description**

Creates a new Session (master budget) with spending rules, time limits, and merchant restrictions. Must be signed by the user.

**Request Body**

```json
{
  "userId": "user_xyz789...",
  "agentId": "agent_abc123...",
  "rules": {
    "maxTotalSpend": "5000000",  // $5.00 in smallest unit
    "maxPerTransaction": "1000000",  // $1.00
    "validAfter": "1740672089",
    "validBefore": "1740758489",  // 24 hours later
    "allowedMerchants": ["service_1", "service_2"]  // Empty = all
  },
  "signature": "0xdef..."
}
```

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User's wallet address |
| `agentId` | string | Yes | Agent ID from registration |
| `rules` | object | Yes | Session spending rules |
| `rules.maxTotalSpend` | string | Yes | Maximum total spend (smallest unit) |
| `rules.maxPerTransaction` | string | No | Maximum per transaction |
| `rules.validAfter` | string | Yes | Valid from timestamp (seconds) |
| `rules.validBefore` | string | Yes | Valid until timestamp (seconds) |
| `rules.allowedMerchants` | array | No | List of allowed service IDs |
| `signature` | string | Yes | User's signature over the Session object |

**Response (Success)**

```json
{
  "status": "success",
  "sessionId": "session_def456...",
  "createdAt": "1740672089"
}
```

---

### Session: Get Sessions

Retrieve all Sessions for a user-agent pair.

#### `GET /sessions?userId={userId}&agentId={agentId}`

**Description**

Returns all active and expired Sessions for the specified user-agent pair.

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User's wallet address |
| `agentId` | string | Yes | Agent ID |

**Response (Success)**

```json
{
  "status": "success",
  "sessions": [
    {
      "sessionId": "session_def456...",
      "rules": {
        "maxTotalSpend": "5000000",
        "validBefore": "1740758489"
      },
      "spent": "500000",
      "remaining": "4500000",
      "status": "active"
    }
  ]
}
```

---

### Payment: Initiate Payment

Initiate a payment on behalf of a user.

#### `POST /payments/initiate`

**Description**

Initiates a payment from a user to a service. Validates against existing Sessions and Agent-Level Policies.

**Request Body**

```json
{
  "userId": "user_xyz789...",
  "agentId": "agent_abc123...",
  "to": "0x209693Bc...",
  "value": "500000",  // $0.50
  "serviceId": "service_123"
}
```

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User's wallet address |
| `agentId` | string | Yes | Agent ID |
| `to` | string | Yes | Recipient service wallet address |
| `value` | string | Yes | Payment amount (smallest unit) |
| `serviceId` | string | Yes | Service identifier |

**Response (Success - Has Session)**

```json
{
  "status": "success",
  "paymentToken": {
    "authorization": {
      "from": "0x857b0651...",
      "to": "0x209693Bc...",
      "value": "500000",
      "validAfter": "1740672089",
      "validBefore": "1740672154",
      "nonce": "0xf3746613..."
    },
    "signature": "0xabc..."
  },
  "sessionId": "session_def456..."
}
```

**Response (Error - No Session)**

```json
{
  "status": "error",
  "code": "session_creation_required",
  "message": "No valid Session found for this payment. User must create a Session.",
  "suggestedRules": {
    "maxTotalSpend": "5000000",
    "validBefore": "1740758489"
  }
}
```

---

## MCP Tool Integration

The Kite MCP Tool is the recommended way to integrate Kite Agent Passport into your agent. It handles:

- Automatic Session management
- User prompt triggering when Sessions are needed
- Payment retries after user approval
- Error handling and recovery

### Installing the MCP Tool

**For your users:** They will configure the MCP server in their AI client (Claude Desktop, etc.):

```json
{
  "kite-passport": {
    "url": "https://neo.dev.gokite.ai/v1/mcp"
  }
}
```

**Or with authentication:**

```json
{
  "kite-passport": {
    "command": "npx",
    "args": [
      "-y",
      "mcp-remote",
      "http://localhost:8000/api_key_{API_KEY}/mcp"
    ]
  }
}
```

**[TODO: Verify exact MCP configuration format]**

### Using the MCP Tool in Your Agent

The Kite MCP Tool exposes a simple `pay` method:

```python
# Example: Python/LangChain agent
from kite_mcp import KiteMCPTool

kite_tool = KiteMCPTool()

async def make_payment(service_address, amount, service_id):
    result = await kite_tool.pay(
        to=service_address,
        value=amount,
        serviceId=service_id
    )
    return result
```

```javascript
// Example: JavaScript/TypeScript agent
import { KiteMCPTool } from '@kite-ai/mcp-tool';

const kiteTool = new KiteMCPTool();

async function makePayment(serviceAddress, amount, serviceId) {
  const result = await kiteTool.pay({
    to: serviceAddress,
    value: amount,
    serviceId: serviceId
  });
  return result;
}
```

**[TODO: Add more language-specific examples]**

### What Happens Under the Hood

When your agent calls `kite.pay(...)`:

1. **Check for Session:** The MCP Tool calls the Agent Payment API
2. **If no Session:** The API returns `session_creation_required`
3. **Pause and prompt:** The MCP Tool pauses your agent and triggers the user prompt UI
4. **User approval:** The user reviews and signs a new Session
5. **Retry payment:** The MCP Tool automatically retries the payment
6. **Success:** The payment token is returned to your agent

Your agent code doesn't need to handle any of this complexity—it just gets a payment token on success or an error on failure.

---

## Authentication Integration

### User Sign-In with Kite

Enable users to sign in to your application using Kite Agent Passport.

#### OAuth Flow

**1. Redirect to Kite OAuth:**

```http
GET https://api.dev.gokite.ai/v1/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://your-app.com/callback&
  scope=identity:read sessions:read sessions:create&
  response_type=code&
  state=random_state_string
```

**[TODO: Add OAuth client registration process]**

**2. User approves and is redirected back:**

```
https://your-app.com/callback?
  code=AUTHORIZATION_CODE&
  state=random_state_string
```

**3. Exchange code for access token:**

```http
POST https://api.dev.gokite.ai/v1/oauth/token

Content-Type: application/json

{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": "https://your-app.com/callback"
}
```

**Response:**

```json
{
  "access_token": "kite_access_abc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "kite_refresh_def..."
}
```

**4. Use access token in API calls:**

```http
GET https://api.dev.gokite.ai/v1/sessions

Authorization: Bearer kite_access_abc...
```

---

## Integration Example

### Complete Agent Integration

Here's a complete example of an agent that uses Kite Agent Passport:

```python
import asyncio
from kite_mcp import KiteMCPTool

class ResearchAgent:
    def __init__(self):
        self.kite = KiteMCPTool()
        self.services = {
            "stock_report": {
                "id": "service_stock_data",
                "address": "0x123...",
                "price": "500000"  # $0.50
            },
            "web_search": {
                "id": "service_search",
                "address": "0x456...",
                "price": "100000"  # $0.10
            }
        }

    async def get_stock_report(self, symbol: str):
        """Get a stock report using a paid service."""
        service = self.services["stock_report"]

        # Make payment via Kite
        payment_result = await self.kite.pay(
            to=service["address"],
            value=service["price"],
            serviceId=service["id"]
        )

        if payment_result["status"] == "success":
            # Call the service with the payment token
            report = await self._call_service(
                service["id"],
                payment_result["paymentToken"],
                {"symbol": symbol}
            )
            return report
        else:
            raise Exception(f"Payment failed: {payment_result['message']}")

    async def _call_service(self, service_id, payment_token, params):
        """Call the actual service with the payment token."""
        # Implementation depends on your service communication
        # This is a placeholder
        pass

# Usage
async def main():
    agent = ResearchAgent()
    report = await agent.get_stock_report("AAPL")
    print(report)

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Advanced Topics

### Session Management

**Auto-delegation vs Manual-delegation:**

Agents can be configured to automatically create Delegations within a Session, or require user approval for each payment.

**[TODO: Add more details on auto-delegation configuration]**

### Agent-Level Spending Policies

Set default spending limits that apply regardless of Session settings:

```python
# When registering an agent
agent = await kite.register_agent(
    name="My Agent",
    spendingPolicy={
        "maxPerMonth": "200000000",  // $200/month
        "maxPerTransaction": "50000000"  // $50/transaction
    }
)
```

**[TODO: Verify Agent-Level Policy API format]**

### Webhook Handling

**[TODO: Add webhook information for async payment confirmations]**

Receive notifications when:
- Sessions are created or expire
- Payments are confirmed
- Spending limits are approached

---

## Error Handling

### Common Error Responses

| Error Code | Description | Handling |
|------------|-------------|----------|
| `session_creation_required` | No valid Session exists | Let MCP Tool prompt user |
| `insufficient_budget` | Session budget exceeded | Prompt for new Session |
| `agent_policy_exceeded` | Agent-level limit exceeded | Cannot recover automatically |
| `invalid_signature` | Signature verification failed | User must re-authenticate |
| `network_error` | Temporary network issue | Retry with backoff |

### Error Handling Example

```python
async def make_payment_with_retry(to, value, service_id, max_retries=3):
    for attempt in range(max_retries):
        try:
            result = await kite.pay(to=to, value=value, serviceId=service_id)
            if result["status"] == "success":
                return result
            elif result["code"] == "session_creation_required":
                # MCP Tool will prompt user, retry automatically
                await asyncio.sleep(2)
                continue
            else:
                raise Exception(f"Payment failed: {result['message']}")
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            await asyncio.sleep(2 ** attempt)  # Exponential backoff
```

---

## Testing Your Integration

### Testnet Setup

1. **Get testnet credentials:**
   - Register for a testnet developer account [TODO: Add link]
   - Get your testnet API key
   - Request testnet tokens from the faucet [TODO: Add link]

2. **Register a test agent:**
   ```python
   agent = await kite.register_agent(name="Test Agent")
   test_agent_id = agent["agentId"]
   ```

3. **Create a test Session:**
   - Use the Kite Portal to create a test Session
   - Or use the Session API with a test user

4. **Make a test payment:**
   ```python
   result = await kite.pay(
       to="0x123...",
       value="100000",
       serviceId="test_service"
   )
   ```

### Testing Checklist

- [ ] Agent registration succeeds
- [ ] User OAuth flow completes
- [ ] Session creation works
- [ ] Payment without Session prompts user
- [ ] Payment with valid Session succeeds
- [ ] Payment exceeding Session budget fails appropriately
- [ ] Agent-level policy limits are enforced

---

## Security Best Practices

### API Key Management

- Never hardcode API keys in your code
- Use environment variables or secret management
- Rotate API keys regularly
- Use separate keys for development and production

### Session Rules

- Set appropriate time limits (e.g., 24 hours for typical use)
- Set reasonable per-transaction limits
- Consider merchant allowlists for production use
- Monitor Session activity for unusual patterns

### User Data Protection

- Never store user private keys
- Use OAuth for secure authentication
- Implement proper logout/token revocation
- Comply with data protection regulations

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Invalid API key" | Wrong or expired API key | Verify key in environment variables |
| "Agent not found" | Agent not registered | Register agent before use |
| "Session creation required" repeatedly | User not approving Sessions | Check user's MCP client setup |
| Payment timeout | Network congestion | Implement retry logic |
| "Invalid signature" | Signature format error | Verify EIP-712 signing process |

### Debug Mode

Enable debug logging for the MCP Tool:

```python
kite = KiteMCPTool(debug=True)
```

**[TODO: Add more debugging options]**

---

## Next Steps

After completing your integration:

1. **Test thoroughly** on testnet with various scenarios
2. **Deploy your agent** with Kite MCP Tool configured
3. **Monitor payments** using the Kite Portal
4. **Optimize Session rules** based on usage patterns
5. **Prepare for mainnet** when ready

---

## Additional Resources

- **Kite SDK Repository:** [TODO: Add link]
- **MCP Protocol Docs:** [TODO: Add link]
- **Testnet Explorer:** [TODO: Add link]
- **Developer Discord:** [TODO: Add Discord link]

***

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*

*Continue to: [End User Guide](end-user-guide.md) | [Service Provider Guide](service-provider-guide.md)*
