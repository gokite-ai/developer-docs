# Stablecoin workflow and User Experience

This section describes how users interact with Kite Chain tokens under both **normal (gas-paid)** and **gasless (meta-transaction)** transfer flows, along with the backend API interface, integration scenarios, reference smart contract implementation, and security considerations.

## Normal Transfer

In a normal transfer flow, the token behaves like a standard ERC-20 token.

### Flow

1. The user signs a standard ERC-20 `transfer` transaction.
2. The transaction is sent directly to the Kite Chain RPC endpoint.
3. The transaction is executed on-chain.

### Key Characteristics

- Fully compatible with all standard ERC-20 wallets.
- No additional infrastructure is required.
- **Gas fees are paid by the user**.
- Ideal for power users, DeFi integrations, and direct on-chain interactions.

## Gasless Transfer

Gasless transfers use **EIP-712 typed data signatures** and **EIP-3009-style authorizations**, allowing a third party to pay gas on behalf of the user.

### Flow

1. The user signs a `TransferWithAuthorization` message using EIP-712.
2. The signed message is sent to a backend relayer service.
3. The backend service:
   - Verifies the signature and authorization state.
   - Composes the on-chain transaction.
4. The backend submits the transaction to the Kite Chain RPC endpoint.
5. The backend returns the transaction hash to the user.
6. The user monitors the transaction status using the returned hash.

### Key Characteristics

- No native token balance required by the user.
- **Gas fees are paid by the backend service**.
- Ideal for:
  - Consumer-facing wallets
  - Web2-style UX
  - Agent-based and automated payments
  - Stablecoin-first onboarding

## API Interface

### Request Example

```json
{
  "from": "0x**********************************",
  "to": "0x**********************************",",
  "value": "1234567890123456",
  "validAfter": "1234567891",
  "validBefore": "1234567892",
  "nonce": "0x**********************************",
  "v": 28,
  "r": "0x**********************************",
  "s": "0x**********************************"
}
```

### Response Example

```json
{
  "txHash": "0x**********************************"
}
```

## User Scenarios

Kite Chain supports multiple relayer deployment models to accommodate different scale, security, and user-experience requirements.

### Public Relayer (Default)

Kite operates a public backend relayer service as shared infrastructure for the ecosystem.

**Characteristics**
- Kite runs the backend service as public infrastructure.
- Any user can submit gasless transfer requests.
- Built-in security controls are enforced to prevent abuse and DDoS attacks.

**Best For**
- End users
- Wallet integrations
- Consumer-facing applications

### Private Relayer (Partner-Hosted)

Ecosystem partners can operate their own private backend relayer service.

**Characteristics**
- Partners (wallets, DeFi protocols, AI agents, platforms) run their own backend service.
- Full control over relayer logic, policies, and operational parameters.
- Custom security rules tailored to specific business or product needs.

**Best For**
- High-volume platforms
- Custom UX and application-specific flows
- Protocol- or platform-owned gas sponsorship models

## Stablecoin Smart Contract Reference Implementation

The following reference implementation demonstrates an ERC-20 stablecoin with EIP-3009-style authorization support:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

/**
 * @title PYUSD
 * @notice ERC20 token that supports EIP-3009 meta-transactions using OpenZeppelin primitives.
 */
contract PYUSD is ERC20, EIP712 {
    enum AuthorizationState {
        Unused,
        Used,
        Canceled
    }

    mapping(address => mapping(bytes32 => AuthorizationState)) private _authorizationStates;

    bytes32 private constant _TRANSFER_WITH_AUTHORIZATION_TYPEHASH =
        keccak256(
            "TransferWithAuthorization(address from,address to,uint256 value,uint256 validAfter,uint256 validBefore,bytes32 nonce)"
        );
    bytes32 private constant _RECEIVE_WITH_AUTHORIZATION_TYPEHASH =
        keccak256(
            "ReceiveWithAuthorization(address from,address to,uint256 value,uint256 validAfter,uint256 validBefore,bytes32 nonce)"
        );
    bytes32 private constant _CANCEL_AUTHORIZATION_TYPEHASH =
        keccak256("CancelAuthorization(address authorizer,bytes32 nonce)");

    event AuthorizationUsed(address indexed authorizer, bytes32 indexed nonce);
    event AuthorizationCanceled(address indexed authorizer, bytes32 indexed nonce);

    constructor(address initialHolder, uint256 initialSupply)
        ERC20("PYUSD", "PYUSD")
        EIP712("PYUSD", "1")
    {
        _mint(initialHolder, initialSupply);
    }

    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    function authorizationState(address authorizer, bytes32 nonce)
        external
        view
        returns (AuthorizationState)
    {
        return _authorizationStates[authorizer][nonce];
    }

    function transferWithAuthorization(
        address from,
        address to,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        _transferWithAuthorization(
            _TRANSFER_WITH_AUTHORIZATION_TYPEHASH,
            from,
            to,
            value,
            validAfter,
            validBefore,
            nonce,
            v,
            r,
            s
        );
    }

    function receiveWithAuthorization(
        address from,
        address to,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(msg.sender == to, "PYUSD: caller must be payee");
        _transferWithAuthorization(
            _RECEIVE_WITH_AUTHORIZATION_TYPEHASH,
            from,
            to,
            value,
            validAfter,
            validBefore,
            nonce,
            v,
            r,
            s
        );
    }

    function cancelAuthorization(
        address authorizer,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        _requireUnusedAuthorization(authorizer, nonce);

        bytes32 structHash = keccak256(
            abi.encode(_CANCEL_AUTHORIZATION_TYPEHASH, authorizer, nonce)
        );
        address signer = ECDSA.recover(_hashTypedDataV4(structHash), v, r, s);
        require(signer == authorizer, "PYUSD: invalid signature");

        _authorizationStates[authorizer][nonce] = AuthorizationState.Canceled;
        emit AuthorizationCanceled(authorizer, nonce);
    }

    function _transferWithAuthorization(
        bytes32 typeHash,
        address from,
        address to,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) private {
        require(block.timestamp > validAfter, "PYUSD: authorization not yet valid");
        require(block.timestamp < validBefore, "PYUSD: authorization expired");
        _requireUnusedAuthorization(from, nonce);

        bytes32 structHash = keccak256(
            abi.encode(typeHash, from, to, value, validAfter, validBefore, nonce)
        );
        address signer = ECDSA.recover(_hashTypedDataV4(structHash), v, r, s);
        require(signer == from, "PYUSD: invalid signature");

        _authorizationStates[from][nonce] = AuthorizationState.Used;
        emit AuthorizationUsed(from, nonce);

        _transfer(from, to, value);
    }

    function _requireUnusedAuthorization(address authorizer, bytes32 nonce)
        private
        view
    {
        require(
            _authorizationStates[authorizer][nonce] == AuthorizationState.Unused,
            "PYUSD: authorization state not unused"
        );
    }
}
```
## Security Considerations

### Preventing DDoS Attacks

Gasless transfers introduce an additional attack surface because transaction gas fees are paid by the relayer rather than the end user. Without safeguards, a relayer can be spammed with signed messages that consume infrastructure resources and on-chain gas.

To mitigate this risk, the backend relayer service must enforce strict validation and rate-limiting controls before submitting any transaction on-chain.

### Potential Protection Rules

The following protections can be applied individually or in combination:

- **Rate limiting per IP address**  
  Limits the number of requests originating from a single IP within a given time window.

- **Rate limiting per user address**  
  Caps the number of gasless transfers a single wallet can submit over time.

- **Minimum token balance requirement**  
  Requires the sender to hold at least a minimum balance (e.g. ≥ 10 PYUSD) before a gasless transfer is accepted.

- **Signature expiration windows**  
  Enforces short validity periods to prevent replay or delayed execution.

- **Per-address daily transfer caps**  
  Limits the total value or number of gasless transfers per address per day.

- **Optional allowlists or reputation scoring**  
  Enables preferential access for trusted users, applications, or agents, while restricting unknown or low-reputation actors.

### Deployment Flexibility

These security rules are configurable and can be tuned based on the relayer deployment model:

- **Public relayers** typically enforce stricter limits and conservative thresholds.
- **Private or partner-operated relayers** can apply customized rules aligned with their UX, volume, and risk tolerance.

This layered approach ensures gasless transfers remain secure, reliable, and economically sustainable across the Kite Chain ecosystem.

Source: 
- EIP 3009: https://eips.ethereum.org/EIPS/eip-3009
 