---
description: Get started with Kite Agent Passport — let your AI agent discover and pay for services on your behalf.
---

# Kite Agent Passport

Kite Agent Passport lets your AI agent discover and pay for services on your behalf. You stay in control of what it can spend — the agent handles everything else.

## How It Works

1. You install Kite Passport into your coding agent.
2. You create an account and set up a passkey on the dashboard.
3. Your agent logs in and is ready to find and pay for services.

When your agent needs to pay for something, it creates a **session** — a spending request with a budget and time limit. You review and approve the session using your passkey. Once approved, the agent can spend within those limits without asking again.

## 1. Install

Paste this command into your coding agent (Codex, Claude Code, Cursor, or similar):

```bash
curl -L <URL> | bash
```

> This placeholder will be replaced with the final install URL before launch.

The agent will install `kpass` (Passport CLI) and `ksearch` (service discovery), add the Kite Passport skills, and guide you through the rest of the setup.

## 2. Sign Up

Ask your agent to create a Kite Passport account, or run:

```bash
kpass signup init --email you@example.com
```

You will receive a verification email. Click the link to confirm your account.

## 3. Generate a Passkey

Visit the **Kite Passport dashboard** to create your passkey:

> Dashboard URL will be provided before launch.

A passkey is tied to your device (fingerprint, Face ID, or hardware key). When your agent requests a spending session, you approve it with your passkey. This is how you prove that **you** authorized the spending — not just the agent.

You only need to do this once per device.

## 4. Log In

Ask your agent to log in, or run:

```bash
kpass login init --email you@example.com
```

You will receive an 8-character code by email. Complete the login:

```bash
kpass login verify --login-id <LOGIN_ID> --code <CODE>
```

## 5. Fund Your Wallet

Check your wallet:

```bash
kpass wallet balance
```

Add funds through one of these paths:

- **Buy USDC** through the on-ramp provider and send it to your Passport wallet address
- **Transfer USDC** on Kite from another wallet you own
- **Request test tokens** if you are on testnet:

```bash
kpass faucet drop --recipient <WALLET_ADDRESS> --token USDC
```

## 6. Use It

Once you are set up, just tell your agent what you need:

- *"Find me a weather API and get the forecast for Tokyo"*
- *"Search for available translation services"*
- *"Buy a code review for this pull request"*

Your agent will search the service catalog, find a match, create a spending session for your approval, and execute the request.

### What Happens Behind the Scenes

1. Your agent searches for services using `ksearch`.
2. It finds a match and creates a spending session with a budget.
3. You approve the session using your passkey.
4. The agent pays the service and returns the result to you.

## Sessions: Your Spending Controls

A **session** is how you stay in control of agent spending. Each session has:

- **A budget** — maximum amount per transaction and total
- **A time limit** — the session expires automatically
- **A scope** — what the agent is allowed to do

Your agent cannot spend outside an approved session. If it needs more budget or a different scope, it creates a new session for you to approve.

You can check active sessions anytime:

```bash
kpass user sessions --status active
```

## Quick Reference

| What you want to do | What to do |
| --- | --- |
| Check who is logged in | `kpass me` |
| Check your balance | `kpass wallet balance` |
| See active sessions | `kpass user sessions --status active` |
| Get testnet tokens | `kpass faucet drop --recipient <ADDRESS> --token USDC` |
| Send funds to another wallet | `kpass wallet send --to <ADDRESS> --amount <N> --asset USDC` |

For the full list of commands, see the [CLI Reference](cli-reference.md).

## Troubleshooting

### Verification email not arriving

Check your spam folder. If it still doesn't arrive, retry the signup command with the same email.

### Agent says "no active session"

The agent needs an approved session to pay for services. Ask it to create one, then approve it with your passkey on the dashboard.

### Balance shows zero after funding

Wait for the transfer to settle, then check again with `kpass wallet balance`. Make sure funds were sent to your Passport wallet address on Kite.

## Next Steps

- [CLI Reference](cli-reference.md) — full command reference for `kpass` and `ksearch`
- [Service Provider Guide](service-provider-guide.md) — if you operate a service that receives payments
- [Testnet Notice](testnet-notice.md) — current environment status and limitations

---

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*
