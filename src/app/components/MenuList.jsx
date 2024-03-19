"use client"

import LogoutIcon from '@mui/icons-material/Logout';

import {
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/navigation';

export default function MenuList({ itens = [] }) {
  const router = useRouter()

  const handleLogout = () => {
    // XXX TODO :: Adicionar a lógica para logout
    router.push('/login')
  }

  return (
    <div>
      <Toolbar />
      <List>
        {itens.map((el) => (
          <ListItem key={el.uuid} disablePadding>
            <ListItemButton onClick={() => router.push(el.path)}>
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.56)' }}>
                {el.icon}
              </ListItemIcon>
              <ListItemText primary={el.display_name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'rgba(255, 255, 255, 0.56)' }} />
            </ListItemIcon>
            <ListItemText primary="Sair da conta" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
}