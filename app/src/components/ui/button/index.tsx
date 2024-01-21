import React from 'react'

import { ButtonProps, CircularProgress, Button as MUIButton } from '@mui/material'

type Props = ButtonProps & {
  children: React.ReactNode
  isLoading?: boolean
}

const Button: React.FC<Props> = ({ children, isLoading, ...rest }) => {
  return (
    <MUIButton
      variant='contained'
      className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-[8px]'
      {...rest}
    >
      {isLoading ? <CircularProgress /> : children}
    </MUIButton>
  )
}

export default Button
