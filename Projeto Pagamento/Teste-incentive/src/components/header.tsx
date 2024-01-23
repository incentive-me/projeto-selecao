import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { List, ThemeProvider } from "@mui/material";
import { darkTheme } from "../layout/GlobalMUI";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AccountBalanceWallet, Logout, Paid } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigatePayment = () => {
    navigate("/home");
  };

  const handleNavigateBalance = () => {
    navigate("/balance");
  };

  const handleLogout = () => {
    setAuth(false);

    Cookies.remove("authToken");
    alert("Deslogado com sucesso");

    navigate("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Teste Incentive
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: "240px",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: "240px", boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleNavigatePayment}>
                  <ListItemIcon>
                    <Paid />
                  </ListItemIcon>
                  <ListItemText primary={"pagamentos"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleNavigateBalance}>
                  <ListItemIcon>
                    <AccountBalanceWallet />
                  </ListItemIcon>
                  <ListItemText primary={"saldo"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={"Sair da conta"} />
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
