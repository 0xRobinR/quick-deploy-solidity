import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 777,
      },
    },
  },
  defaultNetwork:"localhost",
  networks: {
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.TESTNET_PKEY || ""],
      chainId: 80002,
      gasPrice: 100_000_000_000,
    },
    matic: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.MAINNET_PKEY || ""],
      chainId: 137,
      gasPrice: 100_000_000_000,
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      accounts: [process.env.MAINNET_PKEY || ""],
      chainId: 56,
      gasPrice: 5_000_000_000,
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.TESTNET_PKEY || ""],
      chainId: 97,
      gasPrice: 5_000_000_000,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};

export default config;
