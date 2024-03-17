import LogoutIcon from '@mui/icons-material/Logout';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

export default function MenuList() {
  return (
    <div>
      <Toolbar />
      <List>
        {['Pagamentos', 'Saldos'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.56)' }}>
                {index === 0 ? <MonetizationOnIcon /> : <AccountBalanceWalletIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'rgba(255, 255, 255, 0.56)' }} />
            </ListItemIcon>
            <ListItemText primary="Sair da conta" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
}