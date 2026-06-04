---
description: CLI reference for kpass and ksearch — all commands for Kite Agent Passport.
---

<!-- DEPRECATION-BANNER:START -->
{% hint style="warning" %}
**⚠️ This version of the docs is deprecated.** The Kite documentation has moved to [docs.gokite.ai](https://docs.gokite.ai), which now replaces this site. Please use the new docs, and file issues against [gokite-ai/kite-docs](https://github.com/gokite-ai/kite-docs).
{% endhint %}
<!-- DEPRECATION-BANNER:END -->

# CLI Reference

This page documents the `kpass` and `ksearch` commands. For getting started, see the [Introduction](README.md).

## kpass

`kpass` is the Passport CLI for authentication, wallet management, agent registration, spending sessions, and paid request execution.

### General Flags

| Flag | Description |
| --- | --- |
| `--output json` | Machine-readable JSON output (recommended when agents drive the CLI) |
| `--no-interactive` | Never prompt for stdin input (required for automation) |
| `--base-url <URL>` | Override the default backend URL |

### Status and Health

```bash
kpass status                  # Overall status: backend, auth, agent, session
kpass health --output json    # Backend connectivity check
kpass --version               # Installed version
```

### Authentication

#### Sign Up (New User)

```bash
kpass signup init --email you@example.com --output json
```

After clicking the verification email link:

```bash
kpass signup poll --signup-id <SIGNUP_ID> --wait --output json
kpass signup exchange --signup-id <SIGNUP_ID> --exchange-token <EXCHANGE_TOKEN> --output json
```

#### Log In (Returning User)

```bash
kpass login init --email you@example.com --output json
```

Enter the 8-character code from the email:

```bash
kpass login verify --login-id <LOGIN_ID> --code <OTP_CODE> --output json
```

#### Confirm Identity

```bash
kpass me --output json
```

### Wallet

```bash
kpass wallet balance --output json                                          # Show wallet address and balances
kpass wallet send --to <ADDRESS> --amount <N> --asset USDC --output json    # Send funds to another wallet
```

### Faucet (Testnet)

```bash
kpass faucet drop --recipient <WALLET_ADDRESS> --token USDC --output json
```

### Agent Registration

```bash
kpass agent:register --type coding-assistant --output json    # Register a new agent
kpass user agents --output json                               # List agents owned by the logged-in user
```

Common `--type` values: `coding-assistant`, `research-agent`, or a label matching your use case.

### Spending Sessions

#### Create a Session

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

| Flag | Description |
| --- | --- |
| `--task-summary` | Human-readable description of what the agent will do |
| `--max-amount-per-tx` | Maximum spend per single transaction |
| `--max-total-amount` | Maximum total spend for the session |
| `--ttl` | Session lifetime (e.g. `1h`, `24h`) |
| `--assets` | Token(s) the session can spend |
| `--payment-approach` | Payment protocol (`x402_http`) |

#### Approve and Monitor

```bash
kpass agent:session status --request-id <REQUEST_ID> --wait --output json    # Wait for user approval
kpass agent:session list --status active --output json                        # List active sessions
kpass agent:session use --session-id <SESSION_ID> --output json              # Switch active session
kpass user sessions --status active --output json                            # List sessions across agents
```

#### Execute a Paid Request

```bash
kpass agent:session execute \
  --url "https://x402.dev.gokite.ai/api/weather?location=San%20Francisco" \
  --method GET \
  --output json
```

With headers and body (POST):

```bash
kpass agent:session execute \
  --url https://api.example.com/paid-endpoint \
  --method POST \
  --headers '{"Content-Type":"application/json"}' \
  --body '{"query":"hello"}' \
  --output json
```

### Skills

The install flow adds Kite Passport skills to your coding agent:

| Skill | Purpose |
| --- | --- |
| `authenticate-user` | Sign up or log in |
| `kite-discovery` | Search the service catalog |
| `request-session` | Create and approve spending sessions |
| `x402-execute` | Execute paid requests |
| `wallet-send` | Direct wallet transfers |
| `manage-agents` | Register and list agents |

Inspect installed skills:

```bash
npx --yes skills add gokite-ai/passport-skills --list
```

---

## ksearch

`ksearch` is the service discovery CLI for searching and inspecting paid services in the Kite catalog.

### Search Services

```bash
ksearch services list \
  --query weather \
  --payment-approach x402_http \
  --asset USDC \
  --limit 10 \
  --output json
```

| Flag | Description |
| --- | --- |
| `--query` | Search by topic or keyword |
| `--payment-approach` | Filter by payment protocol (`x402_http`) |
| `--asset` | Filter by payment asset (`USDC`) |
| `--limit` | Maximum number of results |

### Inspect a Service

```bash
ksearch services get --service-id <SERVICE_ID> --output json
```

### Export Catalog

```bash
ksearch export markdown --output-dir ./.kite/catalog
```

### Health Check

```bash
ksearch health --output json
ksearch --version
```

---

## Tips

- Use `--output json` and `--no-interactive` together when an agent drives the workflow.
- `kpass` stores project-local state in `.kite-passport/`. Run setup inside the workspace where your agent operates.
- `signup` sends an email verification link. `login` sends an 8-character code. If you already have an account, use login.
- Direct wallet transfers use `kpass wallet send`. Agentic service payments use `agent:session create` + `agent:session execute`.

---

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*
