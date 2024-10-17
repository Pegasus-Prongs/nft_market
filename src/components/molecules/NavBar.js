import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import { Web3Context } from '../providers/Web3Provider'
import NavItem from '../atoms/NavItem'
import ConnectedAccountAddress from '../atoms/ConnectedAccountAddress'
import ConnectButton from '../atoms/ConnectButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const pages = [
  {
    title: 'Market',
    href: '/'
  },
  {
    title: 'MY NFTs',
    href: '/my-nfts'
  },
  {
    title: 'Create NFT',
    href: '/create',
  }
]

const NavBar = () => {
  const { account } = useContext(Web3Context)
  const logo = 'ProngsNFT'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f9f9f9', color: '#333' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' }, fontWeight: 'bold' }}
          >
            {logo}
          </Typography>

          {/* Menu for mobile */}
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
              {pages.map(({ title, href }) => (
                <NavItem title={title} href={href} />
              ))}
            </Box>
          )}

          {/* Connect Button or Account Address */}
          <Box sx={{ flexGrow: 0 }}>
            {account ? (
              <ConnectedAccountAddress account={account} />
            ) : (
              <ConnectButton />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar