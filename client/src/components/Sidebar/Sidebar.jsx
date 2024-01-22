import { Box, Drawer, Typography } from "@mui/material";
import SidebarOptions from "./SidebarOptions";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "250px",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: "250px",
          boxSizing: "border-box",
          backgroundColor: "#363636",
          paddingTop: "3.75rem",
          color: "#fff",
        },
      }}
    >
      <SidebarOptions />
    </Drawer>
  );
};

export default Sidebar;
