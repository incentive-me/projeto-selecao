import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WalletIcon from '../IconsComponents/WalletIcon';
import PaymentIcon from '../IconsComponents/PaymentIcon';
import LogoutIcon from '../IconsComponents/LogOutIcon';

export default function PermanentDrawerLeft() {
  return (
    <aside>
    <Box sx={{ display: 'flex' ,}} >
      <Drawer
        sx={{
          width: 320,
         
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            marginTop: '72px',
            backgroundColor:"#363636",
            color:"#FFFFFF"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />

        <List >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Pagamentos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <WalletIcon />
              </ListItemIcon>
              <ListItemText primary="Saldos" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
         <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair da Conta" />
            </ListItemButton>
          </ListItem>

        </List>

      </Drawer>
    </Box>
    </aside>
  );
}
