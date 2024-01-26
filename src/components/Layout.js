import React from 'react';
import Header from './Header';
import MenuLateral from './MenuLateral';

const Layout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header userName={user.name || ''} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <MenuLateral />
        <div style={{ flex: 1, padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
