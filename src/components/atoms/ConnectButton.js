import { Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from '../providers/Web3Provider'

export default function ConnectButton() {
  const { initializeWeb3 } = useContext(Web3Context)
  const [hasWindowEthereum, setHasWindowEthereum] = useState(false)

  useEffect(() => {
    setHasWindowEthereum(window.ethereum)
  }, [])

  const buttonText = hasWindowEthereum ? 'Connect' : 'Download Metamask'
  const onClick = () => {
    if (hasWindowEthereum) {
      return initializeWeb3()
    }

    return window.open('https://metamask.io/', '_blank')
  }

  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: '#1976d2', // Light blue suitable for light mode
        color: '#fff', // White text for contrast
        '&:hover': {
          backgroundColor: '#1565c0', // Darker blue on hover
        },
        padding: '8px 16px', // Padding for better button appearance
        borderRadius: '8px', // Rounded corners for a modern look
      }}
    >
      {buttonText}
    </Button>
  )
}