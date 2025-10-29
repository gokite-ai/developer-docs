# Agent Builder Guide

Complete guide for building AI agents with Kite's payment capabilities - agent registration and payment integration.

## 🎯 What You're Building

You're building an AI agent that can make payments autonomously on behalf of users. This requires:

1. **Agent API** - Register your agent and search transaction history
2. **Agent MCP** - Enable your agent to make payments through Kite's MCP server

## 🔧 Agent API

Kite uses the [Agent-to-Agent (A2A) Protocol](https://a2a-protocol.org/latest/specification/) for agent registration and discovery, enabling your agents to be discoverable and interoperable with the broader A2A ecosystem while maintaining Kite's payment capabilities.

### **Agent Registration**

#### `POST /v1/agents/register`

Register your agent with an [A2A-compatible Agent Card](https://a2a-protocol.org/latest/specification/#5-agent-discovery-the-agent-card) to enable interoperability with the Agent-to-Agent (A2A) protocol ecosystem.

**Request Example**
```json
{
  "agentCard": {
    "name": "Shopping Assistant Bot",
    "description": "AI agent that helps users find and purchase products with Kite payment capabilities",
    "url": "https://myshoppingbot.com/a2a",
    "version": "1.0.0",
    "provider": {
      "name": "My Company",
      "url": "https://mycompany.com"
    },
    "capabilities": {
      "streaming": true,
      "pushNotifications": false,
      "supportsAuthenticatedExtendedCard": false
    },
    "skills": [
      {
        "name": "product_search",
        "description": "Search for products across multiple retailers",
        "tags": ["shopping", "search"]
      },
      {
        "name": "price_comparison",
        "description": "Compare prices and find the best deals",
        "tags": ["shopping", "pricing"]
      },
      {
        "name": "payment_processing",
        "description": "Process payments securely using Kite",
        "tags": ["payment", "kite"]
      }
    ],
    "preferredTransport": "jsonrpc",
    "securitySchemes": {
      "kite_oauth": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://kite.com/oauth/authorize",
            "tokenUrl": "https://kite.com/oauth/token",
            "scopes": {
              "agent:execute": "Execute agent tasks",
              "payment:process": "Process payments"
            }
          }
        }
      }
    }
  }
}
```

**Response Example**
```json
{
  "agent_id": "agent_abc123",
  "agent_card_url": "https://myshoppingbot.com/a2a",
  "status": "active",
  "created_at": "2025-10-22T08:31:02Z"
}
```

**A2A Agent Card Benefits:**
- **Interoperability**: Your agent can be discovered and used by any A2A-compliant client
- **Standardized Discovery**: Agent capabilities are machine-readable and discoverable
- **Protocol Compatibility**: Works seamlessly with the broader A2A ecosystem
- **Kite Integration**: Payment capabilities are exposed as agent skills
- **Fast Discovery**: Kite caches your card for quick lookups without external fetches

**How It Works (Hybrid Approach):**
1. **Registration**: You provide your full Agent Card during registration
2. **Validation**: Kite validates it against the A2A specification
3. **Storage**: Kite stores both your card data and the canonical URL
4. **Discovery**: Kite serves cached card data for fast agent discovery
5. **Source of Truth**: Your hosted URL remains the canonical source - clients can fetch the latest version directly from your URL

**Important Requirements:**
- **Self-Hosting**: You must host your Agent Card at your own URL (specified in the `url` field)
- **Public Access**: The Agent Card URL must be publicly accessible for A2A discovery
- **HTTPS Required**: Use HTTPS for security and A2A compliance
- **Standard Format**: Follow the [A2A Protocol Specification](https://a2a-protocol.org/latest/specification/) for Agent Card schema
- **Keep in Sync**: Update your Kite registration when you change your Agent Card

#### `PUT /v1/agents/{agent_id}`

Update your agent's A2A Agent Card. Use this endpoint when you make changes to your Agent Card to keep Kite's cached version in sync.

**Request Example**
```json
{
  "agentCard": {
    "name": "Shopping Assistant Bot",
    "description": "AI agent that helps users find and purchase products with Kite payment capabilities",
    "url": "https://myshoppingbot.com/a2a",
    "version": "1.1.0",
    "provider": {
      "name": "My Company",
      "url": "https://mycompany.com"
    },
    "capabilities": {
      "streaming": true,
      "pushNotifications": true
    },
    "skills": [
      {
        "name": "product_search",
        "description": "Search for products across multiple retailers",
        "tags": ["shopping", "search"]
      },
      {
        "name": "payment_processing",
        "description": "Process payments securely using Kite",
        "tags": ["payment", "kite"]
      }
    ]
  }
}
```

**Response Example**
```json
{
  "agent_id": "agent_abc123",
  "agent_card_url": "https://myshoppingbot.com/a2a",
  "status": "active",
  "updated_at": "2025-10-23T10:15:00Z"
}
```

#### `GET /v1/agents/{agent_id}`

Retrieve your agent's profile, status information, and cached A2A Agent Card.

**Response Example**
```json
{
  "agent_id": "agent_abc123",
  "agent_card_url": "https://myshoppingbot.com/a2a",
  "status": "active",
  "reputation_score": 85,
  "total_transactions": 1250,
  "created_at": "2025-10-22T08:31:02Z",
  "agentCard": {
    "name": "Shopping Assistant Bot",
    "description": "AI agent that helps users find and purchase products with Kite payment capabilities",
    "url": "https://myshoppingbot.com/a2a",
    "version": "1.0.0",
    "provider": {
      "name": "My Company",
      "url": "https://mycompany.com"
    },
    "capabilities": {
      "streaming": true,
      "pushNotifications": false
    },
    "skills": [
      {
        "name": "product_search",
        "description": "Search for products across multiple retailers",
        "tags": ["shopping", "search"]
      },
      {
        "name": "payment_processing",
        "description": "Process payments securely using Kite",
        "tags": ["payment", "kite"]
      }
    ]
  }
}
```

### **Agent Discovery**

#### `GET /v1/agents/search`

Search and discover agents by their capabilities, skills, or tags. This endpoint uses Kite's cached Agent Card data for fast discovery.

**Query Parameters**
- `skill`: Filter by skill name (e.g., "payment_processing")
- `tag`: Filter by skill tag (e.g., "shopping", "payment")
- `capability`: Filter by capability (e.g., "streaming")
- `provider`: Filter by provider name
- `limit`: Number of results (default: 20, max: 100)
- `offset`: Pagination offset

**Response Example**
```json
{
  "agents": [
    {
      "agent_id": "agent_abc123",
      "name": "Shopping Assistant Bot",
      "description": "AI agent that helps users find and purchase products with Kite payment capabilities",
      "agent_card_url": "https://myshoppingbot.com/a2a",
      "reputation_score": 85,
      "total_transactions": 1250,
      "skills": ["product_search", "price_comparison", "payment_processing"],
      "capabilities": {
        "streaming": true,
        "pushNotifications": false
      }
    }
  ],
  "total": 15,
  "has_more": false
}
```

### **Transaction Search**

#### `GET /v1/agents/{agent_id}/transactions`

Search and retrieve transaction history for your agent.

**Query Parameters**
- `from_address`: Filter payments from specific wallet (optional)
- `to_address`: Filter payments to specific wallet (optional)
- `user_id`: Filter payments from specific user (optional)
- `limit`: Number of transactions (default: 50, max: 100)
- `offset`: Pagination offset
- `status`: Filter by status (pending, confirmed, failed)
- `date_from`: Start date (ISO 8601)
- `date_to`: End date (ISO 8601)

**Response Example**
```json
{
  "transactions": [
    {
      "transaction_id": "tx_789",
      "amount": "50 USDC",
      "from_address": "0xuser123...",
      "to_address": "0xmerchant456...",
      "status": "confirmed",
      "created_at": "2025-10-22T08:31:02Z",
      "user_id": "user_xyz789"
    }
  ],
  "total": 1250,
  "has_more": true,
  "reputation_summary": {
    "success_rate": 98.5,
    "total_volume": "125,000 USDC",
    "average_transaction": "100 USDC"
  }
}
```

## 💳 Agent MCP 

### **MCP Server Connection**

Connect to Kite's remote MCP server for payment processing:

- **Remote MCP Server**: (URL will be provided in developer documentation)
- **OAuth Authentication**: Required for all payment operations
- **Real-time Processing**: Instant payment execution

### **Available Payment Tools**

| Tool                  | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `check_session_config`| Check session configuration (spending rules, expiration)         |
| `get_user_id`         | Get user ID of authenticated user                                |
| `get_agent_id`        | Get agent ID of authenticated agent                              |
| `get_merchant_info` | Fetch verified merchant identity and policy metadata |
| `check_wallet_balance`| Check user wallet balance for available funds                    |
| `generate_payment_delegation`   | Create a delegation request within the session’s limits |
| `get_payment_delegation` | Retrieve the signed proof that authorizes the merchant to execute payment. |
| `revoke_payment_delegation` | Revoke or invalidate a previously issued delegation proof |
| `get_payment_history` | Retrieve user or agent-level payment history                      |
| `get_payment_status`  | Check the status of a specific payment transaction               |
| `terminate_session`   | End an active session to prevent unauthorized use                 |

### **OAuth Integration**

Implement OAuth flow following the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#authorization-flow) (OAuth endpoints will be available in the developer portal)

**OAuth Flow:**
1. Redirect users to Kite's OAuth consent screen
2. Receive an authorization code and exchange it for an access token
3. Use the token to authenticate MCP calls for payment processing

## 🔒 Security & Compliance

- **Delegation Required**: Agents never access user funds without explicit delegation via KitePass
- **OAuth Authentication**: All payment operations require user authentication
- **Audit Trail**: All transactions are verifiable on Kite Chain
- **Spending Controls**: Users can set limits and rules for agent payments


## Two-Staged Delegation

- **Authentication at MCP connection**
  - End users authenticate and approve the agent during its connection to Kite MCP.
  - This establishes a trusted *session*, enabling the agent to use the end-user ID and agent ID to generate future delegation proofs.
  - Users can also define spending guardrails (e.g., budget per week, max per transaction) at this stage.
  
- **Signature for delegation proof**
  - When a specific purchase is initiated (e.g., defined product IDs, merchant, amount, expiration time), agent generates a delegation proof to let end user to sign.
  - Merchants verify this proof before executing the payment, ensuring transactions are secure, traceable, and within authorized limits.


## 📚 External Resources

### **Protocol Specifications**
- [A2A Protocol Specification](https://a2a-protocol.org/latest/specification/) - Agent-to-Agent protocol for agent discovery and interoperability
- [MCP Authorization Flow](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#authorization-flow) - Model Context Protocol authorization specification
- [Auth0: MCP and Authorization Guide](https://auth0.com/blog/an-introduction-to-mcp-and-authorization/#Authorization-in-the-World-of-MCPs) - Comprehensive authorization patterns

### **How A2A, MCP, and Kite Work Together**

Kite integrates both A2A and MCP protocols to provide a complete agent payment solution:

- **A2A Protocol**: Used for agent registration, discovery, and interoperability. Your agent's capabilities (including payment processing) are exposed through an A2A Agent Card, making it discoverable by any A2A-compliant client.

- **MCP (Model Context Protocol)**: Used for the actual payment operations. When your agent needs to process payments, it uses Kite's MCP server with OAuth authentication to execute secure, user-authorized transactions.

- **Kite Integration**: Bridges both protocols by:
  - Storing and caching A2A Agent Cards for fast discovery
  - Linking agent IDs to self-hosted canonical Agent Card URLs
  - Providing searchable agent directory by skills, capabilities, and tags
  - Offering an MCP server for payment processing with OAuth-based user authorization
  - Recording all transactions on Kite Chain for reputation and verification
  - Enabling agents to expose payment capabilities as A2A skills

**Hybrid Storage Benefits:**
- **Fast Discovery**: Kite serves cached cards without external fetches
- **Agent Control**: Your hosted URL remains the canonical source
- **Rich Search**: Find agents by skills, capabilities, and reputation
- **Reliability**: Kite's cache works even if your URL is temporarily down
- **Flexibility**: Update your card anytime via Kite's API or by clients fetching from your URL

This architecture enables your agents to be discoverable via A2A while leveraging MCP for secure payment operations, all backed by Kite's blockchain infrastructure.

