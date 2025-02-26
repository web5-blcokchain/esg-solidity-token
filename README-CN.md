# ESG Token 项目文档

## 1. 项目背景
ESG Token 是一个基于 BNB Chain 的可升级代币合约，实现了标准的 ERC20 功能，并支持黑名单管理等特性。该项目采用 OpenZeppelin 的可升级合约框架，便于后续功能扩展。

## 2. 项目功能
### 2.1 基础功能 (ESGToken.sol)
- ERC20 标准实现
- 代币总供应量：81亿
- 代币精度：18位
- 代币燃烧功能
- 合约可升级性

### 2.2 升级功能 (ESGTokenV2.sol)
- 黑名单管理
- 转账限制
- 所有权管理

## 3. 开发环境搭建
### 3.1 环境要求
- Node.js v18+
- npm v8+

### 3.2 安装依赖
```bash
npm install
```

## 4. 项目部署
### 4.1 本地测试网络部署
1. 启动本地节点：
```bash
npx hardhat node
```

2. 部署初始合约：
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. 升级到 V2 版本：
```bash
npx hardhat run scripts/upgrade.js --network localhost
```

### 4.2 BSC 测试网部署
1. 配置环境变量（.env）：
```plaintext
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
PRIVATE_KEY=你的私钥
BSCSCAN_API_KEY=你的BSCScan API密钥
```

2. 部署到测试网：
```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

3. 升级合约：
```bash
npx hardhat run scripts/upgrade.js --network bscTestnet
```

## 5. 功能测试
### 5.1 基础功能测试
```bash
npx hardhat run scripts/testTransfer.js --network localhost
```

### 5.2 黑名单功能测试
```bash
npx hardhat run scripts/testV2Features.js --network localhost
```

### 5.3 所有权管理测试
```bash
npx hardhat run scripts/testOwnership.js --network localhost
```

### 5.4 代币燃烧测试
```bash
npx hardhat run scripts/testBurn.js --network localhost
```

## 6. 项目结构
```
ESGToken/
├── contracts/
│   ├── ESGToken.sol      # 基础代币合约
│   └── ESGTokenV2.sol    # 升级版合约
├── scripts/
│   ├── deploy.js         # 部署脚本
│   ├── upgrade.js        # 升级脚本
│   ├── testTransfer.js   # 转账测试
│   ├── testV2Features.js # V2功能测试
│   ├── testBurn.js      # 燃烧测试
│   ├── testOwnership.js # 所有权测试
│   └── utils/
│       └── common.js     # 通用工具类
├── test/                 # 单元测试目录
├── hardhat.config.js    # Hardhat 配置
└── .env                 # 环境变量
```

## 7. 合约升级说明
1. 新功能开发在 ESGTokenV2.sol 中进行
2. 保持存储布局兼容性
3. 使用 upgrade.js 脚本进行升级
4. 升级后使用测试脚本验证新功能

## 8. 常见问题
### 8.1 合约升级失败
- 检查存储布局兼容性
- 确认代理合约地址正确
- 验证部署账户是否是合约所有者

### 8.2 测试脚本执行失败
- 确保本地节点正在运行
- 检查合约地址配置
- 验证账户权限

## 9. 开发建议
1. 新功能开发前先创建分支
2. 编写完整的测试用例
3. 使用 TokenHelper 类进行功能扩展
4. 保持代码注释完整
5. 遵循 Solidity 最佳实践
