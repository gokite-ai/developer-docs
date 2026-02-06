---
description: Integration guide for developers building AI agent applications that support Kite Agent Passport and MCP-based payments.
---

# Developer Guide

This guide is for developers building AI agent applications (like Claude Desktop, Cursor IDE) who want to enable their users to make secure payments through Kite Agent Passport.

## What You're Building

As an agent developer, you are building an AI application that end users interact with. By integrating Kite Agent Passport support, your application will be able to:

- Authenticate users with Kite Agent Passport
- Connect to Kite MCP (Model Context Protocol) servers on behalf of users
- Enable users to delegate payment capabilities to AI agents with configurable guardrails
- Allow agents to autonomously make x402 payments within user-defined policies

## Current Support Status

**Fully Implemented:** MCP-based X402 payment integration

**Future Feature:** Full programmatic API for direct Kite Passport integration

Currently, the primary integration path is through **MCP (Model Context Protocol)**. Your agent application needs to support MCP tool connections, which Kite uses to provide payment capabilities.

---

## Prerequisites

Before you begin, ensure you have:

- [ ] An AI agent application or framework
- [ ] MCP client support in your application
- [ ] Ability to handle OAuth authentication flows
- [ ] Basic understanding of the x402 payment protocol

---

## Overview: The Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Your Agent Application                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Agent Logic (Your Code)                    │   │
│  │                                                         │   │
│  │  • Handle user authentication via OAuth                │   │
│  │  • Manage MCP server connections                       │   │
│  │  • Route payment requests to MCP tools                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              MCP Client Integration                     │   │
│  │  • Connect to Kite MCP server                          │   │
│  │  • Authenticate with API key                           │   │
│  │  • Call payment tools (kite_pay, etc.)                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Kite MCP Server                              │
│  • Exposes payment tools for x402 services                     │
│  • Manages session authentication                              │
│  • Handles payment authorization                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Understanding the User Flow

### Step 1: User Creates Agent on Kite Portal

Before connecting your application, users must:

1. Visit the Kite Portal ([https://x402-portal-eight.vercel.app/](https://x402-portal-eight.vercel.app/))
2. Create a Kite Passport account (via social login with signature authentication)
3. Create an **Agent** in the portal
4. Configure initial spending rules and policies

**Key point:** The Agent ID is a prerequisite for MCP connection. The MCP URL always includes the Agent ID.

### Step 2: User Configures MCP in Your Application

Users connect your agent application to Kite by:

1. Copying the MCP configuration from the Kite Portal
2. Adding it to your application's MCP settings
3. Authenticating via OAuth when prompted

### Step 3: Session-Based Payment Authorization

When your agent needs to make a payment:

1. Agent calls the Kite MCP payment tool
2. If no valid session exists, the user is prompted to authorize a new session
3. User reviews spending limits and approves
4. Payment is executed within the authorized session parameters

---

## Implementing MCP Support

### 1. MCP Client Configuration

Your application needs to support MCP client configuration. Users will add Kite MCP configuration like this:

```json
{
  "kite-passport-mcp": {
    "command": "npx",
    "args": [
      "-y",
      "mcp-remote",
      "https://neo.dev.gokite.ai/v1/mcp"
    ]
  }
}
```

**Or with direct URL (for authenticated connections):**

```json
{
  "kite-passport-mcp": {
    "url": "https://neo.dev.gokite.ai/v1/mcp"
  }
}
```

### 2. Authentication Flow

When a user connects the Kite MCP server:

1. **OAuth Initiation**: Your application initiates OAuth flow with Kite
2. **User Consent**: User authenticates and authorizes the connection
3. **Session Creation**: System checks for existing sessions
   - If no session exists, user is prompted to create one with spending rules
   - If session exists, user can choose to use it or create a new one
4. **MCP Ready**: Connection established, payment tools are available

### 3. Handling OAuth in Your Code

```javascript
// Example: Initiating Kite OAuth flow
async function initiateKiteOAuth() {
  const authUrl = new URL('https://api.dev.gokite.ai/v1/oauth/authorize');
  authUrl.searchParams.append('client_id', YOUR_CLIENT_ID);
  authUrl.searchParams.append('redirect_uri', 'your-app://callback');
  authUrl.searchParams.append('scope', 'identity:read sessions:read sessions:create');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('state', generateRandomState());
  
  // Open browser for user authentication
  await openBrowser(authUrl.toString());
}

// Handle OAuth callback
async function handleOAuthCallback(code, state) {
  // Exchange code for tokens
  const tokens = await exchangeCodeForTokens(code);
  // Store tokens securely
  storeTokens(tokens);
}
```

### 4. MCP Tool Discovery and Usage

Once connected, your agent can discover and use Kite payment tools:

```javascript
// Example: Listing available MCP tools
const tools = await mcpClient.listTools();

// Example: Calling Kite payment tool
const result = await mcpClient.callTool('kite_pay', {
  service_id: 'service_123',
  amount: '100000',  // in smallest unit
  currency: 'USDC'
});
```

---

## Session Management

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Agent ID** | Unique identifier for the agent, created in Kite Portal |
| **Session** | Time-bounded authorization with spending limits |
| **OAuth Token** | Authentication credential for MCP connection |
| **Session Key** | Ephemeral key for executing payments |

### Session Lifecycle

1. **Creation**: User creates session with budget and time limits
2. **Active**: Agent can make payments within session constraints
3. **Expiration**: Session automatically expires after time limit
4. **Invalidation**: User can manually revoke session from Portal

### Handling Session States

**Scenario: No Active Session**
```
User tries to use payment tool
    ↓
System detects no valid session
    ↓
Prompt user to create new session (with spending rules UI)
    ↓
User approves and signs session
    ↓
Payment proceeds
```

**Scenario: Session Expired (OAuth Still Valid)**
```
User tries to use payment tool
    ↓
System detects expired session
    ↓
Invalidate OAuth and prompt re-authentication
    ↓
User re-connects and creates/chooses session
    ↓
Payment proceeds
```

**Scenario: OAuth Expired (Session Still Valid)**
```
User re-connects MCP
    ↓
System detects active session
    ↓
Option 1: Use existing session
Option 2: Create new session (invalidates old one)
    ↓
Payment proceeds
```

---

## Security Considerations

### API Key Handling

- API keys are embedded in MCP URLs by users
- Your application should store MCP configurations securely
- Never expose API keys in logs or error messages

### OAuth Security

- Implement proper state parameter validation
- Use PKCE for OAuth flow
- Store tokens securely (Keychain, Keystore, etc.)
- Handle token refresh appropriately

### Session Boundaries

- At most one active session per agent at a time
- Session timeout ≠ OAuth timeout
- When session expires, OAuth should be invalidated for security

### User Consent

- Always show clear UI when prompting for session creation
- Display spending limits and merchant restrictions clearly
- Provide easy access to Kite Portal for session management

---

## MCP Tools Reference

### Available Tools

The Kite MCP server exposes the following tools:

| Tool | Description |
|------|-------------|
| `kite_pay` | Execute a payment to an x402 service |
| `get_balance` | Get user's wallet balance |
| `get_session_info` | Get current session details |
| `list_services` | List available x402 services |

### Tool Input/Output

**kite_pay**
```json
// Input
{
  "service_id": "string",
  "amount": "string",
  "currency": "USDC",
  "metadata": {}
}

// Output (Success)
{
  "status": "success",
  "transaction_hash": "0x...",
  "amount": "100000",
  "service_id": "service_123"
}

// Output (Session Required)
{
  "status": "error",
  "code": "session_creation_required",
  "message": "No valid session found"
}
```

---

## Testing Your Integration

### Testnet Setup

1. **Create test account**: Visit the Kite Portal testnet instance
2. **Get test tokens**: Request from the testnet faucet
3. **Create test agent**: In the portal, create an agent for testing
4. **Configure MCP**: Add test MCP configuration to your app

### Test Scenarios

| Scenario | Expected Behavior |
|----------|-------------------|
| First-time connection | OAuth flow → Session creation → Tool available |
| Payment with valid session | Payment executes immediately |
| Payment without session | User prompted to create session |
| Session expiration | Re-authentication required |
| Insufficient session budget | Error returned, user can create new session |

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Agent not found" | Invalid Agent ID in MCP URL | Verify Agent ID in Kite Portal |
| "Session creation required" | No active session for agent | Complete OAuth and session creation flow |
| "Session expired" | Session time limit reached | Re-authenticate and create new session |
| "OAuth invalid" | Token expired or revoked | Re-initiate OAuth flow |
| "Payment failed" | Service not x402 compatible | Verify service supports x402 protocol |

### Debug Mode

Enable MCP debug logging:

```javascript
const mcpClient = new MCPClient({
  debug: true,
  // ... other config
});
```

---

## Next Steps

1. **Review MCP Protocol**: Understand the Model Context Protocol specification
2. **Set up test environment**: Create test agent and configure MCP
3. **Implement OAuth handler**: Add Kite authentication to your app
4. **Test payment flow**: Verify end-to-end payment with x402 service
5. **Prepare for production**: Review security best practices

---

## Additional Resources

- **Kite Portal:** [https://x402-portal-eight.vercel.app/](https://x402-portal-eight.vercel.app/)
- **MCP Protocol Docs:** [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
- **x402 Protocol:** [https://github.com/gokite-ai/x402](https://github.com/gokite-ai/x402)
- **Testnet Notice:** See [Testnet Notice](testnet-notice.md) for current limitations

***

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*

*Continue to: [End User Guide](end-user-guide.md) | [Service Provider Guide](service-provider-guide.md)*
