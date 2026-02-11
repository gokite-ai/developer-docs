---
Description: Important information about Kite Agent Passport testnet status, known limitations, stability expectations, and future mainnet plans.
---

# Testnet Notice

Kite Agent Passport is currently in **active development** and operating on the **Kite L1 Testnet**. This document provides important information about current limitations, expectations, and plans for mainnet deployment.

## Current Status

| Aspect | Status |
|--------|--------|
| **Network** | Kite L1 Testnet |
| **Token** | Testnet stablecoin Test USD (USDT) |
| **Security** | Audited smart contracts |
| **Stability** | Beta - feature complete, testing in progress |
| **Support** | Community Discord + GitHub Issues |

## What This Means for You

### For End Users

**What to Expect:**
- All transactions use testnet tokens with no real-world value
- You will need to request testnet tokens
- Network resets may occur, clearing balances and transaction history
- UI/UX may evolve as we incorporate user feedback

**Best Practices:**
- Treat testnet as a learning environment
- Experiment with different Session configurations
- Report any issues you encounter
- Do not use testnet for production workflows

### For Service Providers

**What to Expect:**
- Integration APIs may change before mainnet
- New features and endpoints may be added
- Breaking changes will be communicated in advance

**Best Practices:**
- Build integrations using testnet first
- Design your systems to be adaptable to API changes
- Subscribe to updates for mainnet announcements
- Provide feedback on integration experience

### For Developers

**What to Expect:**
- **API and SDK:** In progress — coming soon for programmatic integrations
- **Available tools:** Currently similar to end user tools — MCP tools and Sessions are ready for use
- **Documentation:** Continuously improving as features stabilize
- **Platform stability:** Beta phase with active development

**Best Practices:**
- Use MCP tools and Sessions to experiment with agent capabilities
- Join the developer community for early access to API/SDK announcements
- Test thoroughly before deploying agents to production
- Share your integration patterns and feedback to help shape developer tools

## Known Limitations

### Current Limitations

| Feature |
|---------|
| **Token support:** Testnet stablecoin only |
| **Wallet support:** Privy AA wallet only |
| **MCP clients:** Tested on Claude Desktop, Cursor |
| **Session types:** Long-term and one-time |
| **Facilitator integration:** Limited to specific partners |

### Technical Constraints

- **Block time:** 1 second
- **Transaction finality:** 1 second
- **Gas costs:** Covered by testnet, mainnet costs TBD

## Stability Expectations

### Network Stability

The Kite L1 Testnet is maintained for development and testing purposes. While we strive for high availability, brief outages may occur for:

- Network upgrades
- Smart contract deployments
- Database migrations
- Emergency maintenance

### Data Persistence

- **Transactions:** Recorded on testnet blockchain (permanent)
- **Balances:** May reset during network resets
- **Sessions/Delegations:** On-chain data persists unless network is reset
- **User accounts:** Privy wallet data persists independently

**Important:** Always keep your testnet wallet seed phrase secure, even though it holds no real value.

## Reporting Issues

### Bug Reports

Found a bug? Please report it:

- **GitHub Issues:** [https://github.com/gokite-ai/developer-docs/issues/new/choose](https://github.com/gokite-ai/developer-docs/issues/new/choose)
- **Include:** Steps to reproduce, expected vs actual behavior, environment details
- **Check:** Existing issues before creating a new one

### Feature Requests

Have an idea for improvement?

- **GitHub Issues:** Use the "enhancement" template
- **Discord:** Share in the #feature-requests channel [https://discord.com/invite/gokiteai](https://discord.com/invite/gokiteai)
- **Include:** Use case description, proposed solution, potential impact

### Security Issues

Found a security vulnerability?

- **Do NOT** create a public issue
- **Email:** security@gokite.ai
- **Include:** Detailed description, proof of concept, contact info for follow-up

## Stay Informed

### Updates and Announcements

- **GitHub Releases:** Follow [gokite-ai](https://github.com/gokite-ai) for releases
- **Documentation:** This page will be updated with major changes
- **Discord:** Join for real-time updates [https://discord.com/invite/gokiteai](https://discord.com/invite/gokiteai)
- **Twitter/X:** [https://x.com/GoKiteAI](https://x.com/GoKiteAI)

### Testnet Status Monitoring

- **Network Status:** [https://testnet.kitescan.ai/stats-service/health](https://testnet.kitescan.ai/stats-service/health)
- **Explorer:** [https://testnet.kitescan.ai/](https://testnet.kitescan.ai/)
- **Faucet:** [https://faucet.gokite.ai/](https://faucet.gokite.ai/)

## Community Support

### Getting Help

- **Documentation:** Start with the guide relevant to your use case
- **Discord:** Ask questions in #help [https://discord.com/invite/gokiteai](https://discord.com/invite/gokiteai)
- **GitHub Issues:** Search existing issues or create a new one

### Contributing

Want to help improve Kite Agent Passport?

- **Bug reports:** Always valuable
- **Documentation:** Submit PRs with improvements
- **Integration examples:** Share your implementations
- **Feedback:** Tell us about your experience

## Testnet Acknowledgment

By using Kite Agent Passport on testnet, you acknowledge that:

1. All transactions use testnet tokens with no real-world value
2. Network resets may occur without notice
3. Features and APIs may change before mainnet
4. This is not a production environment and should not be used for real commerce

***

*Ready to proceed? See the guide for your use case: [End User Guide](end-user-guide.md) | [Service Provider Guide](service-provider-guide.md) | [Developer Guide](developer-guide.md)*
