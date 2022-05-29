import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MAIN_PAGE } from '../constants/route-constants';
import useAuth from '../services/Auth/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const from = location.state?.from?.pathname || MAIN_PAGE;

  const onLogin = () => {
    signIn(() => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
