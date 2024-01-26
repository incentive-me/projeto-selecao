import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

const MenuLateral = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Paper elevation={3} style={{ height: '100%', width: '200px', backgroundColor: '#f0f0f0' }}>
      <MenuList>
        <MenuItem component={Link} to="/home/pagamentos">
          Pagamentos
        </MenuItem>
        <MenuItem component={Link} to="/home/saldos">
          Saldos
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Button variant="contained" color="secondary">
            Sair da Conta
          </Button>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default MenuLateral;
