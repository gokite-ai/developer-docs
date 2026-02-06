---
description: Step-by-step guide for end users to set up and use Kite Agent Passport - from account creation to executing your first agent payment.
---

# End User Guide

This guide will walk you through setting up Kite Agent Passport to enable your AI agents to make secure, controlled payments on your behalf.

## What You're Setting Up

By the end of this guide, you will have:
- A Kite account with a secure wallet
- Testnet tokens to experiment with
- An AI agent configured with spending rules
- The ability for your agent to make payments within your defined limits
- Full visibility into all transactions your agent makes

### How It Works with Your AI Client

You're using **Mode 1: Client Agent with MCP** — the most common integration pattern. In this mode:
- You register and manage your own Kite Passport
- You configure the Kite MCP server into an AI client you use (like Claude Desktop or Cursor)
- You control your own wallet and payment authorizations
- The AI agent can make payments on your behalf within the limits you set

This is different from other modes where developers might manage passports for you or pay on your behalf. In this mode, you remain in full control of your funds.

## Prerequisites

Before you begin, make sure you have:

- [ ] A web browser (Chrome, Firefox, Safari, or Edge)
- [ ] An AI client that supports MCP (such as Claude Desktop)
- [ ] Basic familiarity with your AI client's settings
- [ ] 15-20 minutes to complete the setup

---

## Step 1: Create Your Kite Account

The Kite Portal is your dashboard for managing your wallet, viewing transactions, and configuring spending rules.

### Navigate to the Portal

Open your browser and go to:

```
https://x402-portal-eight.vercel.app/
```

### Create Your Account

1. Click the **"Get Started"** or **"Sign Up"** button
2. You'll be prompted to connect your wallet

### Connect Your Wallet

Kite uses Privy to provide secure, self-custodial wallets.

1. Click **"Connect Wallet"**
2. Input your email address and click **"Continue with Email"**
3. Complete the authentication flow

**Important:** When you connect your wallet, you'll also need to complete a **signature authentication**. This is a security measure that verifies you own the wallet. You'll be prompted to sign a message in your wallet—approve this to continue.

### Your New Wallet

After signing in, a Privy Account Abstraction (AA) wallet is automatically created for you. This wallet:
- Is controlled entirely by you
- Has no funds yet (you'll add testnet tokens next)
- Is unique to your Kite account

---

## Step 2: Add Testnet Tokens

Before your agent can make payments, you need to add testnet tokens to your wallet.

### Open the Faucet

1. In the Portal, locate the **"Add Funds"** or **"Faucet"** button
2. Click to request testnet tokens

### Request Tokens

1. Enter your wallet address (it may be pre-filled)
2. Click **"Request Tokens"**
3. Wait for the transaction to complete
4. Your balance should update within a few seconds

### Verify Your Balance

Return to the Portal dashboard and confirm you now have a testnet token balance. The exact amount will vary, but you should receive enough to experiment with agent payments.

---

## Step 3: Create Your Agent

Now you'll create an AI agent that can make payments on your behalf.

### Navigate to Agent Creation

1. In the Portal, find the **"Agents"** section
2. Click **"Create Agent"**
3. Fill in the fields and click **"Create Agent"**

### Agent-Level Spending Policy

When you create an agent, you can set an **Agent-Level Spending Policy**. This is a high-level limit that applies regardless of individual Session settings.

Example policy settings:
- **Maximum per month:** $200
- **Maximum per transaction:** $50
- **Allowed merchants:** All or specific list

**[TODO: SCREENSHOT: Agent spending policy configuration interface]**

These settings act as an additional safety net beyond the Session-level rules you'll configure later.

---

## Step 4: Connect MCP to Your AI Client

The Model Context Protocol (MCP) is how your AI client communicates with the Kite Agent Passport system.

### Get Your API Key

1. In the Portal, navigate to your agents page
2. Find the **"MCP Configuration"** button in the agent card area
3. Copy your API key—you'll need it for the next step

**[TODO: SCREENSHOT: Agent settings with API key display and copy button highlighted]**

### Configure Your AI Client

The exact steps vary by client. Here's the general process:

1. Open your AI client's settings
2. Find the MCP server configuration section
3. Add the Kite MCP server configuration from your Portal

**Typical configuration format:**

```json
{
  "kite-passport": {
    "url": "https://neo.dev.gokite.ai/v1/mcp"
  }
}
```

**Note:** Your specific configuration (including authentication) is provided in the Kite Portal when you click "Connect to [Client]".

4. Save the configuration
5. Restart your AI client

**[TODO: SCREENSHOT: Claude Desktop MCP configuration interface]**

---

## Step 5: Configure Your Session (First Time)

A Session is a master budget with spending rules. When you first connect your AI client, you'll be prompted to create a Session.

### The Connection Flow

Here's what happens when you connect your AI client to Kite:

1. You add the Kite MCP configuration to your AI client
2. Your AI client connects to the Kite MCP server
3. The system checks for a valid Session
4. If no Session exists, you'll be prompted to create one with spending limits
5. Once created, your agent can make payments within those limits

### Create Your Session

You'll see a prompt like this:

> "The agent needs to create a payment session to interact with services.
>
> **Session Rules:**
> - Max $5.00 total
> - Expires in 24 hours
>
> Do you approve this new payment Session?"

**[TODO: SCREENSHOT: Session creation prompt in Claude Desktop]**

### Customize Your Session

You can customize the default Session settings:

| Setting | Description | Example |
|---------|-------------|---------|
| **Total Budget** | Maximum total spend across all payments | $5.00, $20.00, $100.00 |
| **Time Limit** | When the Session expires | 1 hour, 24 hours, 7 days |
| **Merchant Allowlist** | Which services can be paid | All, or specific services |

**[TODO: SCREENSHOT: Session customization interface]**

### Sign Your Session

1. Review the Session rules
2. Adjust if needed
3. Click **"Approve"** or **"Sign Session"**
4. Your wallet will prompt you to sign—approve the signature

Your Session is now created and stored on-chain!

---

## Step 6: Execute a Test Payment

With your Session in place, your agent can now make payments.

### Make a Test Payment

Try asking your agent something like:

> "Use the stock report service to get me today's market summary."

The agent will:
1. Identify the service and payment required
2. Call `kite.pay(...)` with the payment details
3. The payment is validated against your Session rules
4. The payment executes successfully
5. The service delivers the result

**[TODO: SCREENSHOT: Successful payment result in Claude Desktop]**

### Monitor the Payment

1. Go to the **Kite Portal**
2. Navigate to **"Transactions"** or **"Activity"**
3. You should see your test payment with details:
   - Amount paid
   - recipient service
   - Which Session authorized it
   - Timestamp

**[TODO: SCREENSHOT: Portal transaction history showing the test payment]---

## Understanding Your Dashboard

The Kite Portal gives you full visibility into your agent's activity.

### Wallet Balance

See your current testnet token balance and add more if needed.

### Active Sessions

View all your active Sessions including:
- Remaining budget
- Time remaining
- Which agent uses it
- Which merchants are allowed

### Transaction History

Every payment your agent makes is recorded:
- Amount and recipient
- Which Session authorized it
- Timestamp and transaction hash
- Status (completed/pending/failed)

**[TODO: SCREENSHOT: Full Portal dashboard overview]**

---

## Managing Sessions

### Session Limitations

**Important:** Sessions are immutable once created. You cannot edit an active Session's rules. If you need different limits, you must:
1. Revoke the current Session
2. Create a new Session with updated rules

This design ensures clear audit trails and prevents confusion about authorized spending limits.

### Revoke a Session

To immediately stop all agent payments:
1. Go to **"Sessions"** in the Portal
2. Find the Session you want to revoke
3. Click **"Revoke"** or **"Cancel"**
4. Confirm the revocation

The agent will need to create a new Session for future payments.

### Session Lifecycle

| Stage | Description |
|-------|-------------|
| **Creation** | You create a Session with budget and time limits |
| **Active** | Your agent can make payments within Session constraints |
| **Expiration** | Session automatically expires after time limit |
| **Revocation** | You can manually revoke a Session from the Portal at any time |

**Important:** Once created, a Session cannot be modified. To change limits, revoke the current Session and create a new one.

---

## Security Best Practices

### Protect Your Wallet

- Never share your seed phrase or private key
- Use signature authentication every time you connect your wallet
- Review all signature requests carefully before approving

### Review Agent Behavior

- Regularly check your transaction history
- Set Session limits appropriate to the task
- Revoke Sessions you no longer need

### Start Small

- Begin with low Session limits
- Increase limits as you trust your agent
- Use one-time Sessions for unfamiliar tasks

---

## Troubleshooting

### Payment Failed

| Problem | Solution |
|---------|----------|
| "Session expired" | Create a new Session with extended time |
| "Insufficient budget" | Increase Session budget or add funds |
| "Merchant not allowed" | Update Session allowlist |

### MCP Connection Issues

| Problem | Solution |
|---------|----------|
| "MCP server not responding" | Check your internet connection and MCP URL |
| "Invalid API key" | Verify your API key in the Portal |
| "Agent not found" | Confirm your Agent ID is correct |

### Wallet Issues

| Problem | Solution |
|---------|----------|
| "Signature rejected" | Ensure you're signing with the correct wallet |
| "Insufficient funds" | Request more testnet tokens from the faucet |
| "Transaction pending" | Wait for network confirmation—testnet can be slow |

---

## FAQ

### Is my money safe?

Yes. Your agent can only spend within the limits you define in your Sessions. You can revoke access at any time.

### What if my agent tries to overspend?

The payment will be rejected. Your agent will be prompted to request a new Session with your approval.

### Can I have multiple agents?

Yes. Each agent has its own ID and can have its own spending rules.

### What happens when my Session expires?

Your agent will prompt you to create a new Session. Previous payments remain valid.

### Can I reverse a payment?

No, blockchain transactions are final. This is why Sessions allow you to set appropriate limits.

---

## Next Steps

Now that you have Kite Agent Passport set up:

- **Explore services:** Find services on the [Kite AI Agent App Store] [TODO: Add link]
- **Configure multiple agents:** Set up specialized agents for different tasks
- **Join the community:** Connect with other users in Discord [TODO: Add link]
- **Provide feedback:** Help us improve by sharing your experience

***

*Having trouble? [Report an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or ask for help in Discord [TODO: Add link]*

*Continue to: [Service Provider Guide](service-provider-guide.md) | [Developer Guide](developer-guide.md)*
