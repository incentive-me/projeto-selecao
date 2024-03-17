import { Drawer } from '@mui/material'

import MenuList from './MenuList'

export default function Menu({ methods, isMobileOpen, width = 240, menuItens = [] }) {
  const styleDrawer = {
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: width,
      color: '#FFFF',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 100%), #121212',
      boxShadow: '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)'
    }
  }

  const handleDrawerTransitionEnd = () => methods.handleSetIsClosing(false);
  const handleDrawerClose = () => {
    methods.handleSetIsClosing(true);
    methods.handleSetMobileOpen(false);
  };

  return (
    <nav>
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true, }}
        sx={{ ...styleDrawer, display: { xs: 'block', sm: 'none' } }}>
        <MenuList itens={menuItens} />
      </Drawer>
      <Drawer
        open
        variant="permanent"
        sx={{ ...styleDrawer, display: { xs: 'none', sm: 'block' } }}>
        <MenuList itens={menuItens} />
      </Drawer>
    </nav>
  )
}