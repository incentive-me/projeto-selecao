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
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { lightTheme } from 'themes';

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
    <div style={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Payments
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          mt: '64px',
          width: 320,
          '& .MuiDrawer-paper': {
            width: 320,
            position: 'static',
          },
        }}
        variant="permanent"
        anchor="left"
      >
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
      <ThemeProvider theme={lightTheme}>
        <div
          style={{
            padding: '84px 20px 20px 20px',
            width: '100%',
            height: '100%',
          }}
        >
          <Outlet />
        </div>
      </ThemeProvider>
    </div>
  );
}
