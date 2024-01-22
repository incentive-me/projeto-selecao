import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";

const SidebarOptions = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/pagamentos">
            <ListItemIcon>
              <PaidIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Pagamentos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/saldos">
            <ListItemIcon>
              <AccountBalanceWalletIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Saldos" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Sair da Conta" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SidebarOptions;
