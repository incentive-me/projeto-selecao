import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import PaidIcon from '@mui/icons-material/Paid';
import {
  AppBar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack';

export function Layout() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [cookies, setCookies, removeCookies] = useCookies();

  const onLogout = () => {
    removeCookies('token');
    enqueueSnackbar('Você saiu da conta com sucesso!', {
      variant: 'success',
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Payments
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 320,
          '& .MuiDrawer-paper': {
            width: 320,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => navigate('/payment')}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Pagamentos" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate('/balance')}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Saldos" />
          </ListItemButton>

          <Divider />

          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair da conta" />
          </ListItemButton>
        </List>
      </Drawer>
      <div style={{ padding: 20 }}>
        <Toolbar />
        <Outlet />
      </div>
    </div>
  );
}
