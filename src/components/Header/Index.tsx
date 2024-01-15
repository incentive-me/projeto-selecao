import { Stack, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '../IconsComponents/PersonIcon'



const Header = () => {
  return (
    <header>
    <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    bgcolor={"#424242"}
    padding={2}
  >
    <Typography variant="h5" color="white">Payments</Typography>
   <PersonIcon />
  </Stack>
    </header>
  )
}

export default Header