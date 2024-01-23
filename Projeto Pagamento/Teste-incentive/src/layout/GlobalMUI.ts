import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const lightfont = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          color: "#272221",
          background: "#F3F2F2",
          fontSize: "24px",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
      },
    },
  },
});
