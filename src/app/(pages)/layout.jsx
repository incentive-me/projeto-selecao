"use client"

import MenuIcon from '@mui/icons-material/Menu'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Link from 'next/link'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Alert,
  Snackbar,
  Slide,
} from '@mui/material'

import Drawer from '@/app/components/Drawer'

import { setAlertShow } from '@/app/store'

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Layout({ children }) {
  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const drawerWidth = 240;
  const toolbarHeight = 64;
  const menuItens = [{
    uuid: 'payments',
    display_name: 'Pagamentos',
    path: '/payments',
    icon: <MonetizationOnIcon />
  }, {
    uuid: 'balances',
    display_name: 'Saldos',
    path: '/balances',
    icon: <AccountBalanceWalletIcon />
  }]

  const handleSetIsClosing = (status = false) => setIsClosing(status);
  const handleSetMobileOpen = (status = false) => setMobileOpen(status);
  const handleCloseErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAlertShow({
      open: false, 
      message: '',
      variant: ''
    }))
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      handleSetMobileOpen(!isMobileOpen)
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          minHeight: `${toolbarHeight}px`,
          backgroundColor: '#424242',
          boxShadow: 'none',
        }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
         <div className="flex no-wrap">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <Link href="/payments">
            <h6 className="text-3xl">Payments</h6>
          </Link>
         </div>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        methods={{handleSetIsClosing, handleSetMobileOpen}}
        isMobileOpen={isMobileOpen}
        width={drawerWidth}
        menuItens={menuItens}/>

      <Box
        component="main"
        sx={{
          marginTop: `${toolbarHeight}px`,
          height: `calc(100vh - ${toolbarHeight}px)`,
          marginLeft: { sm: `${drawerWidth}px`},
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        {children}
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleCloseErrorMessage}
        TransitionComponent={(props) => <Slide {...props} direction="right" />}>
        <Alert onClose={handleCloseErrorMessage} severity={alert.variant} variant="filled" sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
