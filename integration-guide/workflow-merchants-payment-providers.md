## Workflow B: Merchants & Payment Providers

### Merchant workflow

For the complete end-to-end user experience, see [Workflow A: Agent Builders - End-user workflow](workflow-agent-builders.md#end-user-workflow).

The merchant side also needs to integrate with Kite to utilize stablecoin payments and reference the proof of delegation in their checkout API.
In this example, we describe a pull payment flow, where the merchant initiates the payment process after receiving a checkout request from an AI agent.

1. Merchant receives checkout request from AI agent
2. Merchant requests Kite for stablecoin transfer
    - Send proof, amount, and merchant wallet address
3. Kite processes stablecoin transfer
    - Kite verifies the proof of delegaiton and, if valid, executes the stablecoin transfer based on the pre-authorized rules
4. Merchant can check the stablecoin transfer completion asynchronously
5. Merchant processes the order

### Developer workflow

To support the above workflow, merchant / payment provider developer integrate Kite into their checkout API.

- Receive the proof of delegation from AI agent 
    - You can store this proof for future conflict resolution
    - You can attest this proof with Kite through API
- Request stablecoin transfer
    - Based on information provided, request payment to the merchant wallet address through Kite API
    - Also you can call Kite API to check completion of payment