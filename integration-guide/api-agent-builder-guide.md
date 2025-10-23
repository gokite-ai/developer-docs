# Agent Builder Guide

Complete guide for building AI agents with Kite's payment capabilities - from agent registration to OAuth integration.

## 🎯 What You're Building

You're building an AI agent that can make payments autonomously on behalf of users. This requires:

1. **Agent Registration** - Register your agent with Kite
2. **MCP Integration** - Connect to Kite's remote MCP server, it requires OAuth integration

## 🛠️ Integration Steps

### **Step 1: Register Your Agent**

First, register your agent to get a developer API key, it will register agent ID with your agent card information on Kite chain which will be associated on KitePass when user access your agent.

### **Step 2: Configure MCP Server**

#### 🔧 MCP Tools Available

Kite offers a remote MCP server so that your agent can handle payment on behalf of your users.

| Tool                  | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `authorize_payment`   | Generate a payment authorization request linked to a user session |
| `execute_payment`     | Execute a payment using verified delegation proof                 |
| `get_payment_history` | Retrieve user or agent-level payment history                      |
| `terminate_session`   | End an active session to prevent unauthorized use                 |

Connect your agent to Kite's remote MCP server provided at ***TODO(URL)***

Implement OAuth flow following the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#authorization-flow) (OAuth for MCP is provided at ***TODO(URL)***)

Your OAuth implementation will:
1. Redirect users to Kite’s OAuth consent screen
2. Receive an authorization code and exchange it for an access token
3. Use the token to authenticate MCP calls (authorize_payment, execute_payment, etc.)

## Notes
- Agents never access user funds without delegation via KitePass authenticated by OAuth.
- Proof of delegation and transaction records are verifiable on Kite Chain.
- Ideal for AI commerce agents, marketplace bots, and autonomous payment applications.


## 📚 External Resources

- [MCP Authorization Flow](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#authorization-flow) - Official MCP authorization specification
- [Auth0: MCP and Authorization Guide](https://auth0.com/blog/an-introduction-to-mcp-and-authorization/#Authorization-in-the-World-of-MCPs) - Comprehensive authorization patterns

