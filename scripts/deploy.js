const hre = require('hardhat')
const dotenv = require('dotenv')
const fs = require('fs')

function replaceEnvContractAddresses (marketplaceAddress, nftAddress, networkName) {
  const envFileName = '.env.local'
  const envFile = fs.readFileSync(envFileName, 'utf-8')
  const env = dotenv.parse(envFile)
  env[`MARKETPLACE_CONTRACT_ADDRESS_${networkName}`] = marketplaceAddress
  env[`NFT_CONTRACT_ADDRESS_${networkName}`] = nftAddress
  const newEnv = Object.entries(env).reduce((env, [key, value]) => {
    return `${env}${key}=${value}\n`
  }, '')

  fs.writeFileSync(envFileName, newEnv)
}

async function main () {
  process.env.IS_RUNNING = true
  console.log("Main is called");
  const Marketplace = await hre.ethers.getContractFactory('Marketplace')
  console.log("Marketplace is", Marketplace);
  const marketplace = await Marketplace.deploy()
  console.log("marketpalce:", marketplace);
  await marketplace.deployed()
  console.log('Marketplace deployed to:', marketplace.address)

  const NFT = await hre.ethers.getContractFactory('NFT')
  console.log("NFT is called");
  const nft = await NFT.deploy(marketplace.address)
  console.log("nft:", nft);
  await nft.deployed()
  console.log('Nft deployed to:', nft.address)

  replaceEnvContractAddresses(marketplace.address, nft.address, hre.network.name.toUpperCase())
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
