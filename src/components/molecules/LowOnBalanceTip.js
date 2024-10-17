import { Paper, Typography } from '@mui/material'

export default function LowOnBalanceTip() {
  return (
    <Paper
      elevation={3}
      square
      sx={{
        p: '5px 15px'
      }}>
      <Typography variant="body2" color="text.secondary">
        Low on ETH? Use this <a href='https://faucets.chain.link/sepolia' target="_blank" rel="noopener noreferrer">faucet</a> to get free test tokens!
      </Typography>
    </Paper>
  )
}
