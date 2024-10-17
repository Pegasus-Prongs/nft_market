import { shortenAddress } from '../../utils/format'
import { chains } from '../../utils/web3'
import NavItem from './NavItem'

export default function ConnectedAccountAddress({ account }) {
  const accountUrl = `${chains.sepolia.explorers[0].url}/address/${account}`

  return (
    <NavItem
      title={shortenAddress(account)}
      href={accountUrl}
      openNewTab={true}
      sx={{
        color: '#1e1e1e', // Dark text color suitable for light mode
        '&:hover': {
          backgroundColor: '#f0f0f0', // Light gray background on hover for better visibility
          color: '#1976d2', // Change text color on hover for emphasis
        },
      }}
    />
  )
}