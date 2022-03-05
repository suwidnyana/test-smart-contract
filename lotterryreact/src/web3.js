import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
window.ethereum.request({ method: "eth_requestAccounts" });

const initWeb3 = async () => {
  let web3 = null;

  // Get the provider, or null if it couldn't be detected.
  const provider = await detectEthereumProvider({
    mustBeMetaMask: true,
  });

  if (provider) {
    console.log("MetaMask Ethereum provider successfully detected!");

    const { ethereum } = window;
    web3 = new Web3(provider);

    // Reload the page when the currently connected chain changes.
    ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });

    ethereum.on("disconnect", (_error) => {
      window.location.reload();
    });

    // Code to initiate connection request to user's Ethereum account(s) moved
    // to `src/App.js`, and only run in response to direct user action.
  } else {
    console.log("Please install MetaMask!");
  }

  return web3;
};

export default initWeb3;
