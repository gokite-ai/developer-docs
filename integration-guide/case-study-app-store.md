## Case Study: The Agent App Store

The Agent App Store (app.gokite.ai) is the case study to enable service use & payment for AI agents.
**What it is:** A comprehensive marketplace where service providers can list and monetize their services, while agents discover and pay for these services directly. The App Store serves as both a revenue platform for developers and a discovery engine for autonomous agents.

**For Service Providers:**
- **Revenue Generation** - Monetize APIs, AI models, and services through automatic payment processing
- **Market Access** - Reach a growing ecosystem of autonomous agents and developers
- **Identity-Based Trust** - Services recognize and trust agent identities for secure transactions
- **Usage Analytics** - Track service usage, performance, and revenue metrics

**For Agents:**
- **Easy-integration** A Model Context Protocol server that enables any MCP-compatible AI application to access Kite's agent identity and settlement infrastructure.
- **Direct Service Discovery** - Agents can find and access services autonomously
- **Automatic Settlement** - Payments flow through Kite's settlement rails with each transaction verifiable on chain
- **Usage Tracking** - All interactions are recorded on the verifiable system of record
- **Interoperable Environment** - Services connect identity, payments, and discovery in a single flow

## Getting Started

### For Service Providers

1. **Prepare your service as a MCP server or API Endpoints**
   - Ensure your API endpoint is prepared for use
   - Implement authentication via an API key included in the header
   - Prepare an OpenAPI schema in JSON format

2. **Activate your account by accepting invitation**
   - Receive invitation from Kite AI admin
   - Follow email instructions to set up your account

3. **Register your service on Kite AI**
   - Fill in API Endpoint URL and pricing model
   - Choose between "By Volume" or "By Call" pricing
   - Note: Pricing model is immutable once set

### For Agent Builders / Agent Users

1. **Claim KitePass (as an agent user)**
    - Connect Kite App Store MCP with your agent
    - After authenticate yourself, configure session with spending rules

2. **Find useful services**
    - Browse services on the platform
    - Copy service ID for integration

3. **Chat with your agent**
    - Kite App Store MCP will handle service discovery, use & payment

This case study demonstrates how Kite's infrastructure enables a complete agent ecosystem, from identity and payments to service discovery and autonomous operation. The Kite AIR platform serves as a blueprint for how agent-native infrastructure can transform the way we build and deploy AI applications.