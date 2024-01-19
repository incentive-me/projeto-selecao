"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WalletIcon from "../IconsComponents/WalletIcon";
import PaymentIcon from "../IconsComponents/PaymentIcon";
import LogoutIcon from "../IconsComponents/LogOutIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ListItemComponent from "./ListItemComponent";

export default function PermanentDrawerLeft() {
  const pathname = usePathname();

  return (
    <aside>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: 320,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              marginTop: "72px",
              backgroundColor: "#363636",
              color: "#FFFFFF",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />

          <List>
            <ListItemComponent
              name="Pagamentos"
              route="/pagamentos"
              icon={<PaymentIcon />}
            />
            <ListItemComponent
              name="Saldos"
              route="/saldos"
              icon={<WalletIcon />}
            />
          </List>
          <Divider />
          <List>
            <ListItemComponent icon={<LogoutIcon />} name="Sair da Conta" />
          </List>
        </Drawer>
      </Box>
    </aside>
  );
}
