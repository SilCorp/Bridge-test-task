import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Container, TextField, Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MAIN_PAGE } from '../constants/route-constants';
import useAuth from '../services/Auth/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const from = location.state?.from?.pathname || MAIN_PAGE;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (event) => {
    try {
      setError(false);
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const login = data.get('login');
      const password = data.get('password');
      await signIn(login, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        component="form"
        onSubmit={onLogin}
      >
        <TextField
          margin="dense"
          required
          fullWidth
          label="Login"
          name="login"
          autoComplete="login"
          error={error}
          autoFocus
        />
        <TextField
          margin="dense"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={error}
        />
        {error && (
          <Typography>
            Имя пользователя или пароль введены не верно
          </Typography>
        )}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          loading={loading}
        >
          Sign In
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default LoginPage;
