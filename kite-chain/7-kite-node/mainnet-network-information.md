# Mainnet Network Information

This page provides the essential network details required to connect to and interact with the **Kite Mainnet**.  
Use this information when configuring wallets, RPC providers, node clients, or infrastructure services.


## Chain Information

| Parameter      | Value            |
|----------------|------------------|
| **Chain Name** | KiteAI Mainnet   |
| **Chain ID**   | 2366             |
| **Token Symbol** | KITE           |


## RPC Endpoints

Kite Mainnet provides multiple geographically distributed RPC endpoints for reliability and low latency.  
It is recommended to configure **multiple RPCs** for redundancy in production environments.

### HTTPS RPCs
- [https://rpc.gokite.ai/](https://rpc.gokite.ai/)
- [https://rpc-virginia.gokite.ai](https://rpc-virginia.gokite.ai)

### WebSocket (WSS) RPCs
- [wss://rpc.gokite.ai/ws](wss://rpc.gokite.ai/ws)
- [wss://rpc-virginia.gokite.ai/ws](wss://rpc-virginia.gokite.ai/ws)

WebSocket endpoints are recommended for:
- Real-time event subscriptions
- Block and transaction streaming
- Indexers and agent-based applications

## Block Explorer

Use the Kite block explorer to inspect transactions, blocks, contracts, and addresses:

- **Explorer:** [https://kitescan.ai/](https://kitescan.ai/)

## Usage Notes

- Always use **HTTPS RPCs** for standard JSON-RPC calls  
- Use **WSS RPCs** for subscriptions and real-time workloads  
- For production systems, configure **RPC failover** across regions  
- Monitor governance and upgrade announcements for endpoint changes  

## Next Steps

- Proceed to **Mainnet Node Operations** to run your own node  
- Configure wallets and tooling using the Chain ID and RPCs above  
- Review security best practices before deploying production infrastructure  