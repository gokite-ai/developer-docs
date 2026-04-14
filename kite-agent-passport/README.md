---
Description: Kite Agent Passport quickstart docs for launch, covering setup, funding, agent authorization, service discovery, and paid execution with kpass and ksearch.
---

# Kite Agent Passport

Kite Agent Passport is the CLI-first workflow for giving an agent a funded wallet, a scoped spending session, and the ability to discover and pay for services on Kite.

For launch, this section stays intentionally focused on the core path:

- paste a single install command into your coding agent
- sign up or log in
- fund the Passport wallet
- transfer funds when needed
- register an agent and approve a spending session
- discover services with `ksearch`
- execute paid requests with `kpass`

## Start Here

### [Quickstart](developer-guide.md)

Use this if you want the fastest path from zero to a working Kite Passport setup.

It covers:

- starting from a single copy-paste install command
- creating or logging in to a Passport
- funding your wallet
- creating a spending session
- discovering a service and making a paid request

### [Add Funds & Transfers](end-user-guide.md)

Use this if you already have Passport set up and want the wallet-specific flows:

- finding your Passport wallet address
- funding through the current on-ramp provider
- moving USDC on Kite from another wallet
- requesting testnet funds
- sending funds out of Passport with `kpass wallet send`

### [Service Provider Guide](service-provider-guide.md)

Use this if you are operating the service that receives payment from Passport-powered agents.

### [Testnet Notice](testnet-notice.md)

Use this for environment status, current limitations, and testnet expectations.

## Core Tools

| Tool | What it does |
| --- | --- |
| `kpass` | Authentication, wallet access, agent registration, spending sessions, and paid request execution |
| `ksearch` | Discovery catalog search for paid services and endpoints |
| Kite Passport skills | Teach agents how to use `kpass` and `ksearch` reliably inside Codex, Cursor, Claude Code, and similar tools |

## The Core Flow

1. Paste the install command into your coding agent.
2. Create a Kite Passport account or log in to an existing one.
3. Check your wallet address and fund it.
4. Register an agent identity.
5. Create a spending session and approve it.
6. Discover a compatible service with `ksearch`.
7. Execute the paid request through `kpass`.

## A Few Things To Know Up Front

- The launch install flow is a single command and does not require cloning Kite repos manually.
- `kpass` stores project-local state in `.kite-passport/`.
- Use `--output json` when an agent is driving the workflow.
- Use `--no-interactive` for automation so the CLI never waits on stdin prompts.
- Signup uses an email link. Login uses an 8-character code.
- Direct wallet transfers use `kpass wallet send`. Agentic service payments use `agent:session create` plus `agent:session execute`.

## Need Help?

- Start with [Quickstart](developer-guide.md)
- Use [Add Funds & Transfers](end-user-guide.md) for wallet questions
- Review the [Testnet Notice](testnet-notice.md) before debugging environment issues
- Open an issue at [gokite-ai/developer-docs](https://github.com/gokite-ai/developer-docs/issues/new/choose)
