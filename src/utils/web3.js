export function getProvider () {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    if (window.ethereum.isMetaMask) return 'Metamask'
    if (window.ethereum.isImToken) return 'imToken'
  }
  return 'Wallet'
}

export const chains = {
  sepolia: {
    name: 'Sepolia test network',
    chain: 'Ethereum',
    rpc: [
      'https://sepolia.infura.io/v3/b0e32f20ec9c4a31acae5eb46e644e8e',
      'https://rpc.sepolia.org/',
      'https://sepolia.blockpi.network/v1/rpc/public'
    ],
    faucets: [
      'https://sepoliafaucet.com/'
    ],
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    infoURL: 'https://sepolia.net/',
    shortName: 'sepolia',
    chainId: 11155111,
    networkId: 11155111,
    explorers: [{
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
      standard: 'EIP3091'
    }]
  }
}