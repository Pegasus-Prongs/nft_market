import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function NavItem({ title, href, openNewTab }) {
  const { pathname } = useRouter()
  const isActive = pathname === href
  return (
    <Link href={href} key={title} passHref>
      <Button
        component="a"
        target={openNewTab && '_blank'}
        sx={{
          margin: 'auto 0',
          backgroundColor: isActive ? '#e1e1e1' : 'inherit', // Active background color when `isActive` is true
          color: '#1e1e1e', // Dark text color for light mode
          '&:hover': {
            backgroundColor: isActive ? '#d4d4d4' : '#f0f0f0', // Slightly darker gray for active hover
            color: '#1976d2', // Change text color on hover
          },
          display: 'block',
          textAlign: 'center',
        }}
      >
        {title}
      </Button>
    </Link>
  )
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}
