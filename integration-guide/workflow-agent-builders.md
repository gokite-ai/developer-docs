## Workflow A: Agent Builders

### End-user workflow

First let's clarify what you are building.
You want to enable consumers visiting your agent service to make payment through Kite account.
Here is the expected workflow for those consumers:
1. Consumers visit your site, and login with your service & **Kite account**
    - If they don't have Kite account, they'll create an account
    - They can visit connected Kite account and manage balance etc.
2. Consumers configure a KitePass, which attaches spending permissions to their session
    - User ID and Agent ID are automatically attached
    - Consumers can configure spending rules on the session, e.g.
        - Maximum budget agent can spend
        - Expiration time
        - Allowed or blocked products / merchants / their categories
3. Consumers communicate with your agent
4. Consumers decide to make order and let AI agent to make payments
    - Your agent automatically uses the KitePass to issue a proof of delegation, which specifies merchant, product, and price etc. and is cryptographically tied to the user session.
5. Your agent will call checkout API provided by merchants
    - When the conditions are met, your agent calls the merchant's checkout API, providing the proof of delegation to authorize payment 
6. Your agent ends the session with successful checkout
7. Merchants process the order 
8. Your agent sends the confirmation to consumer

### Developer workflow

To enable the above workflow, you'll integrate Kite into your agent

- Use Kite API to generate an agent ID for each new AI agent instance for user 
    - You can integrate Kite API to issue your agent ID, you can issue a new ID for a new user on your service
- Integrate Kite OAuth to link your user's Kite account with their agent idnetity 
    - Kite offers OAuth to authenticate Kite users, you can integrate your login with Kite account association, so that your agent is associated with a Kite user ID
- Integrate KitePass with your agent
    - KitePass defines and enforces the payment authorization and guardrails (budget, expiration, allowed merchants etc.) during each session
    - Kite offers Kite MCP, with OAuth mechanism, which allows always consumer authenticate themselves to attach it to the agent, and allow them to configure guard rails for the session
- Use the Kite MCP SDK to issue a proof of delegation 
    - On your agent logic to delegate it to make payment, your agent can use the tool of Kite MCP to issue the proof of delegation