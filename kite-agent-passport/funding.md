---
description: How to fund your Kite Agent Passport wallet — buy USDC with fiat, bridge directly, or transfer from another wallet.
---

# Funding Your Wallet

To use Kite Agent Passport, you need **USDC on Kite chain** in your Passport wallet. All funding is managed through the **Passport dashboard**.

There are three ways to get funds into your Passport wallet:

| Method | Best for |
|---|---|
| **Buy USDC with fiat** | Starting from scratch — pay with a card or bank account |
| **Bridge directly to Passport** | You already hold tokens on another chain |
| **Bridge to your wallet, then transfer** | You want funds in your own wallet first before moving to Passport |

## Option 1: Buy USDC with Fiat

The simplest path if you are starting from zero. Purchase USDC directly into your Passport wallet using fiat currency.

**Supported payment methods:**

- Debit card
- Credit card
- Bank account

**Steps:**

1. Open the Passport dashboard.
2. Go to the funding section.
3. Select **Buy USDC**.
4. Choose your payment method and amount.
5. Set your Passport wallet as the destination — the dashboard pre-fills this for you.
6. Complete the purchase.
7. Wait for settlement — your balance will update automatically on the dashboard.

## Option 2: Bridge Directly to the Passport Wallet

If you already hold tokens on another chain (Ethereum, Base, Arbitrum, etc.), you can bridge them directly into your Passport wallet on Kite chain. The bridge is not limited to stablecoins — you can bridge any token listed on [Kite Bridge](https://bridge.gokite.ai).

**Steps:**

1. Open the Passport dashboard and click the **Bridge** button — this opens [Kite Bridge](https://bridge.gokite.ai) with your Passport wallet address pre-filled as the destination.
2. Connect the wallet that holds your funds.
3. Select the source chain and token.
4. Select Kite as the destination chain.
5. Confirm both transaction popups.
6. Wait 3–4 minutes for the bridge to complete.
7. Your balance will update automatically on the Passport dashboard.

You can also go to [bridge.gokite.ai](https://bridge.gokite.ai) directly and enter your Passport wallet address manually.

This is the recommended path if you already hold crypto. Funds arrive in your Passport wallet ready to use — no additional steps needed.

## Option 3: Bridge to Your Own Wallet, Then Transfer

You can also bridge funds to your own wallet on Kite chain first, then transfer them to your Passport wallet. This gives you more control but requires extra steps.

**What you need to know:**

- You will need **KITE tokens** for gas fees on Kite chain to execute the transfer.
- After bridging, your balance may not appear immediately in standard wallet interfaces — you may need to add the token contract on Kite chain to see it.

**Steps:**

1. Go to [Kite Bridge](https://bridge.gokite.ai) and bridge tokens from another chain to your own wallet on Kite chain. You can also reach the bridge from the **Bridge** button on the Passport dashboard — toggle off "Receive to the same address" to bridge to your own wallet instead.
2. Make sure you also have KITE tokens in that wallet for gas.
3. Add the token contract on Kite chain to your wallet if the balance is not visible.
4. Open the Passport dashboard and copy your Passport wallet address.
5. Send USDC from your wallet to the Passport wallet address.
6. Confirm the transfer has landed on the dashboard.

> This path is more involved than Options 1 and 2. Unless you have a specific reason to hold funds in your own wallet first, we recommend Option 1 or 2.

## Checking Your Balance

You can check your Passport wallet balance at any time:

- **Dashboard** — the balance is shown on the main screen
- **CLI** — run `kpass wallet balance`
- **Ask your agent** — it can check the balance for you

## Troubleshooting

### Balance not showing after funding

- **Bought with fiat** — settlement can take a few minutes depending on the payment provider. Check back on the dashboard.
- **Bridged** — bridge times vary by source chain. Wait for the bridge transaction to confirm, then check the dashboard.
- **Transferred from your own wallet** — make sure you sent to the correct Passport wallet address on Kite chain.

### Need KITE tokens for gas (Option 3 only)

If you are transferring from your own wallet on Kite chain, you need KITE tokens to pay gas. You can acquire KITE through supported exchanges or bridges.

---

*Need help? [Open an issue](https://github.com/gokite-ai/developer-docs/issues/new/choose) or contact the Kite team.*
