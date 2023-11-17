// Comment tis line while verifying celo contracts
// require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-celo");

const DEPLOYER_PRIVATE_KEY = "KEY";
const CELOSCAN_API_KEY = "KEY"

module.exports = {
  solidity: "0.8.19",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [DEPLOYER_PRIVATE_KEY]
    },
    zkevmpolygon: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [DEPLOYER_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      alfajores: CELOSCAN_API_KEY,
      celo: CELOSCAN_API_KEY
    }
  }
};

// npx hardhat verify --network alfajores 0x8b8eF71BAa1483c87E679B23365E13bB110c8B79 50000000000000000

