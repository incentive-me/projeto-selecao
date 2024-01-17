import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#424242",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontFamily: "Alata" }}>
          Payments
        </Typography>
        <Avatar>f</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
