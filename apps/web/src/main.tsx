import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import ErrorPage from './error-page';
import { Balance, Layout, Login, Payment, Register, Root } from './pages';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'auth',
        element: (
          <Paper sx={{ height: '100vh', borderRadius: 0 }}>
            <Outlet />
          </Paper>
        ),
        children: [
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
      {
        //Authenticated Routes
        element: <Layout />,
        children: [
          {
            path: 'payment',
            element: <Payment />,
          },
          {
            path: 'balance',
            element: <Balance />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
