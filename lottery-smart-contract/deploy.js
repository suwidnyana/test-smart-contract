// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

require("dotenv").config();

provider = new HDWalletProvider(
  process.env.PASSPHRASE,
  process.env.RINKENBY_INFURA_API
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(JSON.stringify(abi));
  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop();
};

deploy();
