## Workflow Overview

### Example: Agentic Commerce

In this guide, we’ll use an agentic commerce scenario to illustrate what Kite enables.

Shoppers use AI agents to find products, monitor availability/price changes, and place orders when conditions are met (e.g., back in stock or discounted). At checkout, the user delegates payment authority to the agent. On the merchant side, receiving agent-initiated payments carries risk without clear liability.

Kite makes these transactions safe and verifiable for both sides through cryptographic proof of delegation and stablecoin-native settlement, enabling instant, borderless, and accountable payments.

![End User Workflow](images/EndUserWorkflow.drawio.svg)

### Payer (AI agent) integration

- **[Workflow A: Agent Builders](workflow-agent-builders.md)** - Complete guide for building AI agents that can make payments autonomously. Learn how to implement agent authentication, session management, and payment authorization within your AI applications.

### Payee (service / merchant) integration

- **[Workflow B: Merchants / Payment Providers](workflow-merchants-payment-providers.md)** - Guide for services and merchants to receive payments from AI agents. Learn how to integrate Kite's payment infrastructure, verify agent credentials, and handle micropayment settlements.

