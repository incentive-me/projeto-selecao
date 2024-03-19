"use client"

import { RouteGuard } from '@/domain/authentication'
import { Provider } from 'react-redux'
import store from './store'

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Welcome to Payments</title>

      <meta name="description" content="An app for manage payments and balances" />

      <body className={inter.className}>
        <RouteGuard>
          <Provider store={store}>
            {children}
          </Provider>
        </RouteGuard>
      </body>
    </html>
  );
}
