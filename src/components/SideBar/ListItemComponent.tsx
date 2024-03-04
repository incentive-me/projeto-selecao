import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  name: string;
  route: string | null;
  icon: JSX.Element;
  onClick?: () => void;
};

const ListItemComponent = ({ name, route, icon, onClick }: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <ListItem disablePadding onClick={onClick}>
        <Link href={route ? route : ""} passHref style={{ width: "100%" }}>
          <ListItemButton selected={pathname === route}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </Link>
      </ListItem>
    </div>
  );
};

export default ListItemComponent;
