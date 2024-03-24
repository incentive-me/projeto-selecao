import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976D2',
    },
  },
});

export const lightTheme = createTheme({
  components: {
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
          padding: 20,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
    },
  },
});
