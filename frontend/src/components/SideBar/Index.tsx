"use client";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import WalletIcon from "@mui/icons-material/Wallet";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import SideBarItem from "./SideBarItem";
import { signOut } from "@/services/userService";

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          marginTop: "64px",
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#363636",
          color: "#FFFFFF",
          height: "calc(100% - 64px)",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        <SideBarItem
          name="Pagamentos"
          route="/payments"
          icon={<PaymentIcon />}
        />
        <SideBarItem name="Saldos" route="/balances" icon={<WalletIcon />} />
      </List>
      <Divider />
      <List>
        <SideBarItem
          icon={<LogoutIcon />}
          name="Sair da Conta"
          route="/auth"
          onClick={() => signOut()}
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
