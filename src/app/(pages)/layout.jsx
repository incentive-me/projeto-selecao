"use client"

import MenuIcon from '@mui/icons-material/Menu'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import Link from 'next/link'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
} from '@mui/material'

import Drawer from '@/app/components/Drawer'

import { useState } from 'react';

export default function Layout({ children }) {
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
          boxShadow: 'none'
        }}>
        <Toolbar>
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
    </div>
  );
}