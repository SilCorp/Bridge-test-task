import React from 'react';
import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import useAuth from '../services/Auth/useAuth';

function AppHeader() {
  const { signOut } = useAuth();

  const onLogOut = () => {
    signOut();
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bridge
        </Typography>
        <Button onClick={onLogOut} color="inherit">
          SignOut
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
