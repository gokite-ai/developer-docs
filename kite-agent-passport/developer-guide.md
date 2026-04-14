---
Description: Quickstart for setting up Kite Agent Passport with kpass, ksearch, agent skills, wallet funding, spending sessions, service discovery, and the first paid request.
---

# Quickstart

This guide is the launch path for developers who want to use Kite Agent Passport end to end.

By the end, you will have:

- `kpass` installed for Passport auth, wallet, sessions, and payments
- `ksearch` installed for service discovery
- Kite Passport skills installed into your agent
- a logged-in Kite Passport
- a funded Passport wallet
- a registered agent with an approved spending session
- your first paid request executed through Passport

## What You Will Use

| Component | Purpose |
| --- | --- |
| `kpass` | Sign up, log in, inspect wallet balance, send funds, register agents, create sessions, and execute paid requests |
| `ksearch` | Search the Kite service catalog and inspect service details |
| Kite Passport skills | Teach your coding agent how to use the Passport CLI flow without manual babysitting |

## Before You Start

At launch, the public setup flow should start with a single copy-paste install command in your coding agent. You should not need to manually clone Kite repositories as part of the public quickstart.

You will need:

- a supported coding agent such as Codex, Claude Code, or Cursor
- permission for that agent to install the required Kite tooling
- access to the Passport environment your team is launching

Kite Passport CLI state is stored per project in `.kite-passport/`, so it is best to run the setup inside the workspace where your agent will operate.

## 1. Paste The Install Command Into Your Coding Agent

Use this placeholder install command for now:

```bash
curl -L <URL> | bash
```

Paste that into your coding agent and let the agent complete the install and setup flow.

This placeholder should be replaced with the final production URL when the public installer is ready.

After the install finishes, the coding agent should be able to guide the user through:

- verifying `kpass` and `ksearch`
- signing up or logging in
- funding the Passport wallet
- authorizing an agent session
- discovering services and making a first paid request

## 2. Verify The Tools Were Installed

```bash
kpass --version
ksearch --version
```

At this point, users should already have the Passport tools installed by the one-line install flow.

## 3. Verify Connectivity

Run the basic health checks:

```bash
kpass health --output json
ksearch health --output json
```

If your team gave you a custom backend, pass it explicitly with `--base-url` or set the matching environment variable.

`kpass` also has a helpful overall status command:

```bash
kpass status
```

## 4. Confirm The Kite Passport Skills Are Available

The install flow should also add the official Kite Passport skills to the coding agent. The core launch set includes:

- `authenticate-user`
- `kite-discovery`
- `request-session`
- `x402-execute`
- `wallet-send`
- `manage-agents`

If you need to inspect the package contents directly:

```bash
npx --yes skills add gokite-ai/passport-skills --list
```

## 5. Create Or Log In To A Passport

### New User Flow

Use signup if this is your first Passport account:

```bash
kpass signup init --email you@example.com --output json
```

Then:

1. Click the verification link in the email.
2. Poll until the signup is verified.
3. Exchange the verified signup for a JWT.

```bash
kpass signup poll --signup-id <SIGNUP_ID> --wait --output json
kpass signup exchange --signup-id <SIGNUP_ID> --exchange-token <EXCHANGE_TOKEN> --output json
```

### Returning User Flow

Use login if you already have a Passport:

```bash
kpass login init --email you@example.com --output json
```

Login sends an 8-character code to the email address on the account. Complete the flow with:

```bash
kpass login verify --login-id <LOGIN_ID> --code <OTP_CODE> --output json
```

Use this to confirm the JWT is saved and working:

```bash
kpass me --output json
```

## 6. Check Your Wallet And Add Funds

Get your Passport wallet details:

```bash
kpass wallet balance --output json
```

Use the returned `wallet_address` as the destination for funding.

For the launch flow, there are three common funding paths:

- use the current on-ramp provider if you are starting from fiat
- transfer or bridge USDC on Kite from another wallet
- request test tokens if you are working in testnet

If you need the wallet-specific flow, jump to [Add Funds & Transfers](end-user-guide.md). For testnet, the faucet flow is:

```bash
kpass faucet drop --recipient <WALLET_ADDRESS> --token USDC --output json
```

Then verify the updated balance:

```bash
kpass wallet balance --output json
```

## 7. Register Your Agent

Register the agent identity that will spend on the user's behalf:

```bash
kpass agent:register --type coding-assistant --output json
```

Common examples for `--type` include `coding-assistant`, `research-agent`, or a label that matches your product surface.

## 8. Create A Spending Session

Sessions are how users approve a budget and scope for agent spending.

Create a session request:

```bash
kpass agent:session create \
  --task-summary "Discover paid services and execute one approved API call" \
  --max-amount-per-tx 2 \
  --max-total-amount 10 \
  --ttl 24h \
  --assets USDC \
  --payment-approach x402_http \
  --output json
```

The command returns an approval URL. Show that URL to the user, then wait for approval:

```bash
kpass agent:session status --request-id <REQUEST_ID> --wait --output json
```

After approval, the session is saved as the current session for the project.

You can inspect or switch sessions later with:

```bash
kpass agent:session list --status active --output json
kpass agent:session use --session-id <SESSION_ID> --output json
```

## 9. Discover A Service With `ksearch`

Search the catalog for Passport-compatible services:

```bash
ksearch services list \
  --query weather \
  --payment-approach x402_http \
  --asset USDC \
  --limit 10 \
  --output json
```

Then inspect a result more closely:

```bash
ksearch services get --service-id <SERVICE_ID> --output json
```

Useful discovery patterns:

- add `--query <topic>` to narrow by use case
- add `--payment-approach x402_http` when you want Passport-compatible results first
- add `--asset USDC` when you want the common Passport funding path

If you want a local markdown snapshot for your agent workflow:

```bash
ksearch export markdown --output-dir ./.kite/catalog
```

## 10. Execute Your First Paid Request

Once you have an approved session, execute the request through `kpass`.

Example using the public weather demo:

```bash
kpass agent:session execute \
  --url "https://x402.dev.gokite.ai/api/weather?location=San%20Francisco" \
  --method GET \
  --output json
```

For JSON POST requests, include headers and a body:

```bash
kpass agent:session execute \
  --url https://api.example.com/paid-endpoint \
  --method POST \
  --headers '{"Content-Type":"application/json"}' \
  --body '{"query":"hello"}' \
  --output json
```

`kpass` uses the approved session, negotiates the x402 payment with the backend, and returns both usage information and the service response.

## Commands You Will Reuse Often

| Command | Why you use it |
| --- | --- |
| `kpass status` | Fast read on backend, auth, agent, and session state |
| `kpass me --output json` | Confirm who is logged in |
| `kpass wallet balance --output json` | Read wallet address and balances |
| `kpass wallet send --to <ADDRESS> --amount <N> --asset USDC --output json` | Direct wallet-to-wallet transfers |
| `kpass user agents --output json` | List agents owned by the logged-in user |
| `kpass user sessions --status active --output json` | List active sessions across agents |
| `ksearch services list --output json` | Search the discovery catalog |
| `ksearch services get --service-id <ID> --output json` | Inspect a service before paying |

## How The Pieces Fit Together

- `kpass` is the Passport control plane: auth, wallet, agent identity, sessions, and paid execution.
- `ksearch` is the service discovery layer: search first, inspect second, pay after you know the endpoint.
- Passport skills let an agent follow this workflow autonomously by reading structured CLI output and the suggested `next_command`.
- The public install experience should begin with `curl -L <URL> | bash`, not manual repo cloning.

## Troubleshooting

### Backend unreachable

If `kpass health` or `kpass status` cannot reach the backend, verify your network or use the environment-specific base URL your team provided.

### Signup vs login confusion

- `signup` sends an email link.
- `login` sends an 8-character code.

If you already have an account, prefer the login flow.

### No active session

If execution fails because there is no active session, create one with `agent:session create` and wait for approval with `agent:session status --wait`.

### Insufficient funds

If the request is approved but the wallet is empty, fund the Passport wallet first, then retry. See [Add Funds & Transfers](end-user-guide.md).

### Automation tip

When an agent is driving the CLI, prefer:

```bash
kpass <command> --output json --no-interactive
```

That keeps the workflow machine-readable and prevents unexpected prompts.
