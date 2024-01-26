import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = ({ userName }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Sistema de Pagamentos
        </Typography>
        <Typography variant="subtitle1">
          {userName && `Bem-vindo, ${userName}`} 
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
