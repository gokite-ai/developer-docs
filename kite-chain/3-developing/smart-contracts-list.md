# Kite Mainnet Contracts List

This page provides a comprehensive list of all smart contracts deployed on Kite Mainnet and related cross-chain deployments.

---

## 1. Validator Staking Contracts

Contracts that manage validator/delegator staking, reward calculation, and reward distribution on the Kite L1.


| Contract                   | Address                                      | Description                                                                                                                                                               |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| KiteStakingManager (Proxy) | `0x7d627b0F5Ec62155db013B8E7d1Ca9bA53218E82` | Upgradeable proxy for the staking manager. Entry point for validator registration, delegator staking, reward claims, and all staking operations.                          |
| KiteStakingManager (Impl)  | `0x065cA4309a5abc9F1cC2d8fA00634BC948C25C6b` | Implementation contract behind the KiteStakingManager proxy. Contains the core staking logic for native KITE token staking.                                               |
| RewardVault                | `0xd26850d11e8412fC6035750BE6A871dff9091FAe` | Holds native KITE tokens reserved for staking reward distribution. The staking manager calls `distributeReward()` to pay out validator/delegator rewards from this vault. |
| FixedAPRRewardCalculator   | `0x171eefa30E88f9bca456CEf49c5Df093A516C7c2` | Calculates staking rewards using a fixed APR (simple interest). Reward formula: `stakeAmount * APR * uptimeSeconds / secondsInYear`. Current rate: 2.5% (250 bps).        |
| ValidatorMessages          | `0x9C00629cE712B0255b17A4a657171Acd15720B8C` | Library contract for packing/unpacking ICM (Inter-Chain Messaging) messages used by the validator manager, as specified in ACP-77.                                        |
| ProxyAdmin                 | `0x3FA7667FD726F73ef42c66f8715E0C6d37D44905` | OpenZeppelin ProxyAdmin that manages the KiteStakingManager proxy upgrades. Only the ProxyAdmin owner can trigger implementation upgrades.                                |


---

## 2. Staking Vault (LST) Contracts

Contracts for the liquid staking vault, enabling users to stake KITE and receive liquid staking tokens (LST).


| Contract                      | Address                                      | Description                                                                                                                           |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| StakingVault (Proxy)          | `0x23f7b52E2830C66f88EFc1f35b8a6a4AAe218dCA` | Upgradeable proxy for the staking vault. User-facing entry point for depositing KITE and receiving LST tokens.                        |
| StakingVault (Impl)           | `0x69379f875551A505d77876a9363BcDe3dfd00bbe` | Implementation contract for the StakingVault proxy. Contains the core vault logic (deposit, withdraw, share accounting).              |
| StakingVaultOperations (Impl) | `0xE31b845a6898D165e3dFc2AD4C3D61fE74394817` | Implementation contract handling operational logic for the staking vault (e.g., delegating staked assets to validators, rebalancing). |


---

## 3. Tokens on Kite Mainnet


| Token  | Address                                      | Decimals | Description                                                                                                    |
| ------ | -------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| WKITE  | `0xcc788DC0486CD2BaacFf287eea1902cc09FbA570` | 18       | Wrapped KITE (ERC-20 wrapper for the native KITE token). Used for DEX trading and DeFi interactions.           |
| USDC.e | `0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e` | 6        | Bridged USDC stablecoin (deployed and maintained by Lucid Labs). Used for payments, x402 settlement, and DeFi. |
| USDT   | `0x3Fdd283C4c43A60398bf93CA01a8a8BD773a755b` | 6        | Bridged USDT stablecoin (deployed and maintained by Lucid Labs).                                               |
| WETH   | `0x3D66d6c3201190952e8EA973F59c4428b32D5F9b` | 18       | Bridged Wrapped Ether (deployed by Lucid Labs).                                                                |


---

## 4. Algebra DEX Contracts

Algebra Integral concentrated liquidity DEX deployed on Kite Mainnet.


| Contract                   | Address                                      | Description                                                                      |
| -------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| AlgebraFactory             | `0x10253594A832f967994b44f33411940533302ACb` | Factory contract that creates and manages Algebra liquidity pools.               |
| AlgebraPoolDeployer        | `0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A` | Used by the factory to deploy individual pool contracts via CREATE2.             |
| SwapRouter                 | `0x03f8B4b140249Dc7B2503C928E7258CCe1d91F1A` | Router for executing token swaps against Algebra pools.                          |
| NonfungiblePositionManager | `0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C` | Manages concentrated liquidity positions as NFTs (ERC-721).                      |
| Multicall3                 | `0xE3104A157cc4C0d3c7C3a8c655092668D068c149` | Utility contract for batching multiple read/write calls in a single transaction. |


---

## 5. KITE Token (Cross-Chain)

The KITE token deployed on external chains. All deployments are non-upgradeable with the same address across chains.


| Network           | Address                                      |
| ----------------- | -------------------------------------------- |
| Ethereum Mainnet  | `0x904567252D8F48555b7447c67dCA23F0372E16be` |
| BSC Mainnet       | `0x904567252D8F48555b7447c67dCA23F0372E16be` |
| Avalanche C-Chain | `0x904567252D8F48555b7447c67dCA23F0372E16be` |


---

## 6. LayerZero Bridge Contracts

LayerZero contracts for cross-chain messaging on Kite Mainnet.

- **LayerZero Chain ID:** 2366
- **LayerZero Endpoint ID:** 30406


| Contract                | Address                                      |
| ----------------------- | -------------------------------------------- |
| EndpointV2              | `0x6F475642a6e85809B1c36Fa62763669b1b48DD5B` |
| SendUln302              | `0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7` |
| ReceiveUln302           | `0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043` |
| LZ Executor             | `0x4208D6E27538189bB48E603D6123A94b8Abe0A0b` |
| LZ Dead DVN             | `0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842` |
| Blocked Message Library | `0xc1ce56b2099ca68720592583c7984cab4b6d7e7a` |


---

## 7. Lucid Bridge Contracts

Lucid contracts for cross-chain messaging on Kite Mainnet.


| Contract                    | Address                                      |
| --------------------------- | -------------------------------------------- |
| USDC Controller (Avalanche) | `0x92E2391d0836e10b9e5EAB5d56BfC286Fadec25b` |
| WETH Controller (Avalanche) | `0x638d1c70c7b047b192eB88657B411F84fAc74681` |
| USDT Controller (Celo)      | `0x80bA7204f060Fd321BFE8d4F3aB2E2bF4e6fCe49` |
| USDC Controller (Kite)      | `0x92E2391d0836e10b9e5EAB5d56BfC286Fadec25b` |
| WETH Controller (Kite)      | `0x638d1c70c7b047b192eB88657B411F84fAc74681` |
| USDT Controller (Kite)      | `0x80bA7204f060Fd321BFE8d4F3aB2E2bF4e6fCe49` |
