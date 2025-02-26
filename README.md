# ESG Token Documentation

## 1. Project Overview
ESG Token is an upgradeable token contract based on BNB Chain, implementing standard ERC20 functionality with additional features like blacklist management. The project utilizes OpenZeppelin's upgradeable contract framework for future extensibility.

## 2. Features
### 2.1 Base Features (ESGToken.sol)
- ERC20 standard implementation
- Total supply: 8.1 billion tokens
- Decimals: 18
- Token burning capability
- Contract upgradeability

### 2.2 Advanced Features (ESGTokenV2.sol)
- Blacklist management
- Transfer restrictions
- Ownership management

## 3. Development Setup
### 3.1 Requirements
- Node.js v18+
- npm v8+

### 3.2 Dependencies Installation
```bash
npm install
```

## 4. Deployment
### 4.1 Local Network Deployment
1. Start local node:
```bash
npx hardhat node
```

2. Deploy initial contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Upgrade to V2:
```bash
npx hardhat run scripts/upgrade.js --network localhost
```

### 4.2 BSC Testnet Deployment
1. Configure environment variables (.env):
```plaintext
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
PRIVATE_KEY=your_private_key
BSCSCAN_API_KEY=your_bscscan_api_key
```

2. Deploy to testnet:
```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

3. Upgrade contract:
```bash
npx hardhat run scripts/upgrade.js --network bscTestnet
```

## 5. Testing
### 5.1 Basic Transfer Testing
```bash
npx hardhat run scripts/testTransfer.js --network localhost
```

### 5.2 Blacklist Feature Testing
```bash
npx hardhat run scripts/testV2Features.js --network localhost
```

### 5.3 Ownership Management Testing
```bash
npx hardhat run scripts/testOwnership.js --network localhost
```

### 5.4 Token Burning Testing
```bash
npx hardhat run scripts/testBurn.js --network localhost
```

## 6. Project Structure
```
ESGToken/
├── contracts/
│   ├── ESGToken.sol      # Base token contract
│   └── ESGTokenV2.sol    # Upgraded contract
├── scripts/
│   ├── deploy.js         # Deployment script
│   ├── upgrade.js        # Upgrade script
│   ├── testTransfer.js   # Transfer testing
│   ├── testV2Features.js # V2 features testing
│   ├── testBurn.js      # Burn testing
│   ├── testOwnership.js # Ownership testing
│   └── utils/
│       └── common.js     # Utility class
├── test/                 # Unit tests directory
├── hardhat.config.js    # Hardhat configuration
└── .env                 # Environment variables
```

## 7. Contract Upgrade Guide
1. Develop new features in ESGTokenV2.sol
2. Maintain storage layout compatibility
3. Use upgrade.js script for upgrades
4. Verify new features with test scripts

## 8. Troubleshooting
### 8.1 Contract Upgrade Issues
- Check storage layout compatibility
- Verify proxy contract address
- Confirm deployer is contract owner

### 8.2 Test Script Issues
- Ensure local node is running
- Check contract address configuration
- Verify account permissions

## 9. Development Guidelines
1. Create branch for new features
2. Write comprehensive test cases
3. Extend TokenHelper class for new features
4. Maintain complete code documentation
5. Follow Solidity best practices

