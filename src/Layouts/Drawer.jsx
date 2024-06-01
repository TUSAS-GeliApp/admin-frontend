import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, CalendarMonth, CircleNotifications, Event, Feed, Podcasts, School } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function LeftDrawer({ open, setOpen }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {['Programlar', 'Etkinlikler', "Podcastler", "Bültenler"].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => handleNavigate(index === 0 ? "/programs" : index === 1 ? "/events" : index === 2 ? "/podcasts" : "/newsletters")}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <CalendarMonth />}
                {index === 1 && <Event />}
                {index === 2 && <Podcasts />}
                {index === 3 && <Feed />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Kullanıcı İşlemleri', 'Bildirimler'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => handleNavigate(index === 0 ? "/users" : "/notifications")}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <AccountCircle /> : <CircleNotifications />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
