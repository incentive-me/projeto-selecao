import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import {
  BalanceEdit,
  BalanceList,
  PaymentEdit,
  PaymentList,
  Layout,
  Login,
  Register,
  Root,
} from './pages';
import { darkTheme } from './themes';

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
            element: <PaymentList />,
          },
          {
            path: 'payment/edit',
            element: <PaymentEdit />,
          },
          {
            path: 'payment/edit/:id',
            element: <PaymentEdit />,
          },
          {
            path: 'balance',
            element: <BalanceList />,
          },
          {
            path: 'balance/edit',
            element: <BalanceEdit />,
          },
          {
            path: 'balance/edit/:id',
            element: <BalanceEdit />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
