import { Box, Drawer, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#363636",
          paddingTop: "3.75rem",
          color: "#fff",
        },
      }}
    >
      <Box p={2}>
        <Typography>Pagamentos</Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
