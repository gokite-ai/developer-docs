---
Description: Funding and transfer guide for Kite Agent Passport, including wallet address lookup, on-ramp guidance, USDC transfers, faucet use, and direct wallet sends.
---

# Add Funds & Transfers

This guide covers the wallet-side flows for Kite Agent Passport:

- finding your Passport wallet address
- adding funds through the current on-ramp path
- moving USDC on Kite from another wallet
- requesting testnet funds
- sending funds out of Passport

If you have not installed the CLIs or authenticated yet, start with [Quickstart](developer-guide.md).

## Before You Start

Make sure you can authenticate successfully:

```bash
kpass me --output json
```

Then check your wallet:

```bash
kpass wallet balance --output json
```

The returned `wallet_address` is the address you will fund.

## Funding Paths

There are three common ways to get funds into Kite Passport:

1. On-ramp from fiat through the current provider.
2. Transfer or bridge USDC on Kite from another wallet.
3. Use the faucet for testnet development.

## 1. Fund Through The Current On-Ramp Provider

If your team is using a live on-ramp provider such as Banxa, the key step is making sure the destination address is your Passport wallet address.

Recommended flow:

1. Run `kpass wallet balance --output json`.
2. Copy the `wallet_address`.
3. Open the approved on-ramp flow from your team or wallet UI.
4. Buy USDC and set your Passport wallet as the destination.
5. Wait for settlement.
6. Re-run `kpass wallet balance --output json` until the balance appears.

When you are using Passport for agentic payments, USDC is the safest default asset to fund first.

## 2. Move USDC On Kite From Another Wallet

If you already hold USDC on Kite somewhere else, you do not need to buy again. You can move it directly into Passport.

Typical flow:

1. Run `kpass wallet balance --output json` and copy your Passport wallet address.
2. Use your existing wallet, bridge, or transfer provider to send USDC on Kite to that address.
3. Confirm the transfer has landed with `kpass wallet balance --output json`.

If your team is using Lucid Bridge for this step, the important detail is still the same: your Passport wallet address is the destination.

## 3. Use The Faucet For Testnet

For testnet development, request funds directly with `kpass`.

First, get your wallet address:

```bash
kpass wallet balance --output json
```

Then request test USDC:

```bash
kpass faucet drop --recipient <WALLET_ADDRESS> --token USDC --output json
```

Verify the updated balance:

```bash
kpass wallet balance --output json
```

If your environment also requires another test asset, repeat the faucet flow with that token symbol.

## Send Funds Out Of Passport

Use `wallet send` for direct wallet-to-wallet transfers initiated by the user:

```bash
kpass wallet send \
  --to 0xRECIPIENT_ADDRESS \
  --amount 5 \
  --asset USDC \
  --output json
```

This is the right flow when you want to:

- move funds to another wallet you control
- send USDC to a teammate
- return funds to a primary treasury wallet

Re-check the wallet after the transfer:

```bash
kpass wallet balance --output json
```

## Direct Transfer vs Agentic Payment

Use `kpass wallet send` when the human explicitly wants to move funds from one wallet to another.

Use `kpass agent:session create` plus `kpass agent:session execute` when the agent is paying a service endpoint under an approved budget.

That distinction is important:

- `wallet send` moves funds directly
- `agent:session execute` pays through Passport's delegated session flow

## Useful Wallet Commands

| Command | Purpose |
| --- | --- |
| `kpass wallet balance --output json` | Show wallet address and current balances |
| `kpass faucet drop --recipient <ADDRESS> --token USDC --output json` | Request test funds |
| `kpass wallet send --to <ADDRESS> --amount <N> --asset USDC --output json` | Send funds directly |
| `kpass me --output json` | Confirm the logged-in user |
| `kpass status` | Quick environment check before debugging |

## Troubleshooting

### No balance after funding

Re-run `kpass wallet balance --output json` after the provider or bridge confirms settlement. If the balance still does not appear, verify that the transfer was sent on the expected network and to the Passport wallet address.

### Authentication expired

If wallet commands fail due to auth, log in again:

```bash
kpass login init --email you@example.com --output json
kpass login verify --login-id <LOGIN_ID> --code <OTP_CODE> --output json
```

### Wrong tool for the job

If you are trying to pay an API or service endpoint, do not use `wallet send`. Go back to the [Quickstart](developer-guide.md) and create an approved spending session instead.
