## Workflow Overview

### Example: Agentic Commerce

In this guide, we’ll use an agentic commerce scenario to illustrate what Kite enables.

In this scenario, end users use AI agents to find products and make purchases on their behalf. By delegating payment authority to the agent, end users can automate actions like monitoring price drops or stock availability and purchasing when conditions are met (e.g., item back in stock or discounted). On the merchant side, receiving agent-initiated payments carries risk without clear liability. 
This flow uses [two‑staged delegation](api-agent-builder-guide.md#two-staged-delegation): 
end users establish a Kite Passport session (via MCP) and later sign a purchase‑specific delegation proof that merchants verify before payment. 

Kite makes these transactions safe and verifiable for both sides through cryptographic proof of delegation and stablecoin-native settlement, enabling instant, borderless, and accountable payments.

The diagram below shows the workflow between end-user, agent, merchant, and Kite after implementation. The green parts indicate where Kite helps enable each actor.

![End User Workflow](images/EndUserWorkflow.svg)

### Payer (AI agent) integration

- **[Workflow A: Agent Builders](workflow-agent-builders.md)** - Learn how to enable the payer side by implementing end user and agent authentication, then using those credentials to generate delegation proofs that authorize agents to make payments.

### Payee (service / merchant) integration

- **[Workflow B: Merchants / Payment Providers](workflow-merchants-payment-providers.md)** - Learn how to enable the payee side by integrating Kite's payment infrastructure, then verifying delegation proofs to securely receive payments from authorized agents.

