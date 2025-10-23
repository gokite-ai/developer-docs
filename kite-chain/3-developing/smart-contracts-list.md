# Kite Protocol Smart Contracts

This repository contains all smart contract implementations for the Kite Protocol, organized into the following main modules:

## Directory Structure

### bridge - Via Protocol Bridge Integration
Implementation of integration with Via Protocol cross-chain bridge:

**Contract Name: MessageClient.sol**

**Description:** Cross-chain message handling client that facilitates communication between different blockchain networks through the Via Protocol bridge infrastructure.

**Use Cases:**
* Cross-Chain Communication: Enabling message passing between different blockchain networks
* Bridge Integration: Providing standardized interface for Via Protocol bridge operations
* Multi-Chain Coordination: Supporting coordinated actions across multiple blockchain networks

**Contract Name: BridgedToken.sol**

**Description:** Cross-chain token contract that represents tokens bridged from other networks, maintaining proper accounting and enabling seamless cross-chain token transfers.

**Use Cases:**
* Cross-Chain Token Representation: Representing tokens from origin chains on destination networks
* Bridge Token Management: Handling minting and burning of bridged tokens
* Cross-Chain Asset Transfer: Enabling users to move assets between supported blockchain networks

**Contract Name: ERC20Adapter.sol**

**Description:** ERC20 token adapter that provides standardized interface for bridging ERC20 tokens across different blockchain networks.

**Use Cases:**
* ERC20 Bridge Integration: Standardizing ERC20 token bridging operations
* Token Standard Compatibility: Ensuring bridged tokens maintain ERC20 compliance
* Cross-Chain ERC20 Support: Enabling any ERC20 token to be bridged through the Via Protocol

**Contract Name: NativeAdapter.sol**

**Description:** Native token adapter for handling native blockchain tokens (like KITE, ETH, BNB) in cross-chain bridge operations.

**Use Cases:**
* Native Token Bridging: Supporting cross-chain transfer of native blockchain tokens
* Gas Token Management: Handling native tokens used for transaction fees across chains
* Native Asset Integration: Providing bridge support for blockchain-native assets

### aa - Kite Smart Wallet Contracts
Implementation of ERC-4337 Account Abstraction smart wallet system:

#### Core Components

**Contract Name: GokiteAccount.sol**
**Contract Address:** `0x93F5310eFd0f09db0666CA5146E63CA6Cdc6FC21`

**Description:** Main smart wallet contract implementing ERC-4337 Account Abstraction standard. This contract provides advanced wallet functionality including programmable transaction logic, social recovery, and gasless transactions.

**Use Cases:**
* Account Abstraction: Providing smart contract wallet functionality with programmable logic
* Gasless Transactions: Enabling users to interact with dApps without holding native tokens for gas
* Advanced Security Features: Supporting multi-signature operations, social recovery, and custom authorization logic
* User Experience Enhancement: Simplifying blockchain interactions through improved wallet functionality

**Contract Name: GokiteAccountFactory.sol**
**Contract Address:** `0xF0Fc19F0dc393867F19351d25EDfc5E099561cb7`

**Description:** Factory contract for deterministic account creation, enabling predictable smart wallet addresses and efficient deployment of new wallet instances.

**Use Cases:**
* Deterministic Wallet Creation: Generating wallet addresses that can be predicted before deployment
* Efficient Wallet Deployment: Streamlining the process of creating new smart wallet instances
* Address Prediction: Allowing applications to know wallet addresses before actual deployment
* Batch Wallet Operations: Supporting efficient creation of multiple wallet instances

## Kite App Store

**Contract Name: ServiceRegistry**
**Contract Address:** `0xc67a4AbcD8853221F241a041ACb1117b38DA587F`

**Description:** Service registry contract that manages and tracks various services within the Kite ecosystem. This contract stores comprehensive service information including service types, pricing models, unit prices, and other metadata necessary for service discovery and interaction.

**Use Cases:**
* Service Registration: Registering services with detailed information including service type, pricing model, and unit price
* Service Management: Managing and updating service metadata, pricing information, and availability status
* Service Discovery: Providing a registry for service lookup and interaction based on service type and pricing
* Protocol Integration: Enabling seamless integration between different protocol components through standardized service metadata
