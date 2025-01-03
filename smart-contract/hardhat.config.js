require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/yo-RKP4L6fEPXPGSkuVgTvT2hypxCsPP",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 20000000000, // 20 Gwei
      gas: 2100000,          // Giới hạn gas
    },
  },
};
