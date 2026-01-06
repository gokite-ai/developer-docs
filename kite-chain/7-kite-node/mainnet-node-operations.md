# Mainnet Node Operations

This page describes how to set up, configure, deploy, and operate a Kite mainnet node.

## System Requirements

### Minimum Hardware Specifications

- **CPU:** 8 AWS vCPU or equivalent  
- **RAM:** 16GB  
- **Storage:** 1TB SSD  

## Network Requirements

Open inbound ports:

- **TCP/9650:** HTTP API  
- **TCP/9651:** P2P Staking  

## Prepare Node Config

You need to prepare the node config content for `AVAGO_CHAIN_CONFIG_CONTENT` env var.  
Content must be base64 encoded.

The node config options can be found in **C-Chain Configs**.

The node config structure is as below, the root key is KiteAI mainnet's blockchain ID, `Config` key is the base64 encoded chain config, `Upgrade` key is the base64 encoded upgrade config.

```json
{
  "3USaEfTcoUhHxpKXvpAG916UKCUEyjrtkg2hBArBG3JyDP7my": {
    "Config": "<base64_encoded_chain_config>",
    "Upgrade": "<base64_encoded_upgrade_config>"
  }
}
```

### Example

First, encode the chain config:

```bash
echo -n '{"log-level":"trace"}' | base64
```

This will output something like `ey**********************************`. Then create the full node config JSON and encode it:

```bash
echo -n '{"3USaEfTcoUhHxpKXvpAG916UKCUEyjrtkg2hBArBG3JyDP7my":{"Config":"eyJsb2ctbGV2ZWwiOiJ0cmFjZSJ9",Upgrade":null}}' | base64
```

It will output `ey***************************************************************X0=`, put this value as `AVAGO_CHAIN_CONFIG_CONTENT` env var when running docker.

## Deployment

### Standard RPC Node
Recommended Chain config:

```
{"eth-apis":["eth","eth-filter","net","web3","internal-eth","internal-blockchain","internal-transaction","internal-debug","internal-account","debug","debug-tracer"],"pruning-enabled":true,"warp-api-enabled":true}
Node config:
{"3USaEfTcoUhHxpKXvpAG916UKCUEyjrtkg2hBArBG3JyDP7my": {"Config": "eyJldGgtYXBpcyI6WyJldGgiLCJldGgtZmlsdGVyIiwibmV0Iiwid2ViMyIsImludGVybmFsLWV0aCIsImludGVybmFsLWJsb2NrY2hhaW4iLCJpbnRlcm5hbC10cmFuc2FjdGlvbiIsImludGVybmFsLWRlYnVnIiwiaW50ZXJuYWwtYWNjb3VudCIsImRlYnVnIiwiZGVidWctdHJhY2VyIl0sInBydW5pbmctZW5hYmxlZCI6dHJ1ZSwid2FycC1hcGktZW5hYmxlZCI6dHJ1ZX0", "Upgrade": null}}
<base64_node_config>:
eyIzVVNhRWZUY29VaEh4cEtYdnBBRzkxNlVLQ1VFeWpydGtnMmhCQXJCRzNKeURQN215IjogeyJDb25maWciOiAiZXlKbGRHZ3RZWEJwY3lJNld5SmxkR2dpTENKbGRHZ3RabWxzZEdWeUlpd2libVYwSWl3aWQyVmlNeUlzSW1sdWRHVnlibUZzTFdWMGFDSXNJbWx1ZEdWeWJtRnNMV0pzYjJOclkyaGhhVzRpTENKcGJuUmxjbTVoYkMxMGNtRnVjMkZqZEdsdmJpSXNJbWx1ZEdWeWJtRnNMV1JsWW5Wbklpd2lhVzUwWlhKdVlXd3RZV05qYjNWdWRDSXNJbVJsWW5Wbklpd2laR1ZpZFdjdGRISmhZMlZ5SWwwc0luQnlkVzVwYm1jdFpXNWhZbXhsWkNJNmRISjFaU3dpZDJGeWNDMWhjR2t0Wlc1aFlteGxaQ0k2ZEhKMVpYMCIsICJVcGdyYWRlIjogbnVsbH19
Run a standard RPC node using v0.1.3 tag in the gokite-chain's Github Container Registry with:
docker run -d \
  --name gokite-chain-rpc-node \
  --restart unless-stopped \
  -v "$(pwd)/data:/data" \
  -u "${CURRENT_UID}:${CURRENT_GID}" \
  -p 9650:9650 \
  -p 9651:9651 \
  -e AVAGO_DATA_DIR=/data \
  -e AVAGO_NETWORK_ID=mainnet \
  -e AVAGO_HTTP_ALLOWED_HOSTS="*" \
  -e AVAGO_HTTP_HOST="0.0.0.0" \
  -e AVAGO_PARTIAL_SYNC_PRIMARY_NETWORK=true \
  -e AVAGO_PLUGIN_DIR=/plugins/ \
  -e AVAGO_HTTP_PORT=9650 \
  -e AVAGO_STAKING_PORT=9651 \
  -e AVAGO_TRACK_SUBNETS=21uUaTxVdR3Sp6SJhpcSrdH1g66aFoE8mPQDvwKJCjXNexo5y6 \
  -e PLUGIN_ID=pJhES6xZkqZxjxMqHiucbpBTTnB97EjL5aTYSynmWBoF26v9e \
  -e KITE_CHAIN_ID=3USaEfTcoUhHxpKXvpAG916UKCUEyjrtkg2hBArBG3JyDP7my \
  -e AVAGO_CHAIN_CONFIG_CONTENT=<base64_node_config> \
  ghcr.io/gokite-ai/gokite-chain:v0.1.3

  ```

### Archive Node
#### Recommended Chain config:

```json
{"eth-apis":["eth","eth-filter","net","web3","internal-eth","internal-blockchain","internal-transaction","internal-debug","internal-account","debug","debug-tracer"],"pruning-enabled":false,"warp-api-enabled":true}
```

#### Node config:

```json
{
  "3USaEfTcoUhHxpKXvpAG916UKCUEyjrtkg2hBArBG3JyDP7my": {
    "Config": "eyJldGgtYXBpcyI6WyJldGgiLCJldGgtZmlsdGVyIiwibmV0Iiwid2ViMyIsImludGVybmFsLWV0aCIsImludGVybmFsLWJsb2NrY2hhaW4iLCJpbnRlcm5hbC10cmFuc2FjdGlvbiIsImludGVybmFsLWRlYnVnIiwiaW50ZXJuYWwtYWNjb3VudCIsImRlYnVnIiwiZGVidWctdHJhY2VyIl0sInBydW5pbmctZW5hYmxlZCI6ZmFsc2UsIndhcnAtYXBpLWVuYWJsZWQiOnRydWV9",
    "Upgrade": null
  }
}
```

`<base64_node_config>`:

```
eyIzVVNhRWZUY29VaEh4cEtYdnBBRzkxNlVLQ1VFeWpydGtnMmhCQXJCRzNKeURQN215IjogeyJDb25maWciOiAiZXlKbGRHZ3RZWEJwY3lJNld5SmxkR2dpTENKbGRHZ3RabWxzZEdWeUlpd2libVYwSWl3aWQyVmlNeUlzSW1sdWRHVnlibUZzTFdWMGFDSXNJbWx1ZEdWeWJtRnNMV0pzYjJOclkyaGhhVzRpTENKcGJuUmxjbTVoYkMxMGNtRnVjMkZqZEdsdmJpSXNJbWx1ZEdWeWJtRnNMV1JsWW5Wbklpd2lhVzUwWlhKdVlXd3RZV05qYjNWdWRDSXNJbVJsWW5Wbklpd2laR1ZpZFdjdGRISmhZMlZ5SWwwc0luQnlkVzVwYm1jdFpXNWhZbXhsWkNJNlptRnNjMlVzSW5kaGNuQXRZWEJwTFdWdVlXSnNaV1FpT25SeWRXVjkiLCAiVXBncmFkZSI6IG51bGx9fQ==
```

Run an archive node using v0.1.3 tag in the gokite-chain's Github Container Registry with:

```
docker run -d \
  --name gokite-chain-archive-node \
  --restart unless-stopped \
  -v "$(pwd)/data:/data" \
  -u "${CURRENT_UID}:${CURRENT_GID}" \
  -p 9650:9650 \
  -p 9651:9651 \
  -e AVAGO_DATA_DIR=/data \
  -e AVAGO_NETWORK_ID=mainnet \
  -e AVAGO_HTTP_ALLOWED_HOSTS="*" \
  -e AVAGO_HTTP_HOST="0.0.0.0" \
  -e AVAGO_PARTIAL_SYNC_PRIMARY_NETWORK=true \
  -e AVAGO_PLUGIN_DIR=/plugins/ \
  -e AVAGO_HTTP_PORT=9650 \
  -e AVAGO_STAKING_PORT=9651 \
  -e AVAGO_TRACK_SUBNETS=21uUaTxVdR3Sp6SJhpcSrdH1g66aFoE8mPQDvwKJCjXNexo5y6 \
  -e PLUGIN_ID=pJhES6xZkqZxjxMqHiucbpBTTnB97EjL5aTYSynmWBoF26v9e \
  -e KITE_CHAIN_ID=3USaEfTcoUhHxpKXvpAG916UKCUEyjrtkg2hBArBG3JyDP7my \
  -e AVAGO_CHAIN_CONFIG_CONTENT=<base64_node_config>
  ghcr.io/gokite-ai/gokite-chain:v0.1.3

```

## API Endpoints
The node need to track P-Chain before it can be used to query API endpoints, it will take some time to sync. Once bootstrapped, the following API endpoints will be available:
- HTTP RPC: http://localhost:9650/ext/bc/21uUaTxVdR3Sp6SJhpcSrdH1g66aFoE8mPQDvwKJCjXNexo5y6/rpc
- WebSocket: ws://localhost:9650/ext/bc/21uUaTxVdR3Sp6SJhpcSrdH1g66aFoE8mPQDvwKJCjXNexo5y6/ws

## Health Check
Monitor node health status:
curl http://localhost:9650/ext/health
The node is ready when the response shows "healthy": true.

### Monitor
Metrics are available at:
- HTTP: http://localhost:9650/ext/metrics

### Data and Keys
The data directory is located at $(pwd)/data. If you want to use a different directory, you can change the -v "$(pwd)/data:/data" option in the deployment command.
The keys are randomly generated and stored in the directory under the data/staking directory. If you are running the node for validator, you may want to backup the keys.

### Run the Node Manually
All the configurations and commands to build the docker image are in the this repository.
If you want to run the node manually without using docker, feel free to check github actions to see how to build and run the node.