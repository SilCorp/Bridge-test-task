import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AUTHENTICATED } from '../../constants/localStorage-constants';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(() => (
    window.localStorage.getItem(AUTHENTICATED) === 'true'
  ));

  const signIn = (callback = () => {}) => {
    setIsAuth(true);
    window.localStorage.setItem(AUTHENTICATED, 'true');
    callback();
  };

  const signOut = (callback = () => {}) => {
    setIsAuth(false);
    window.localStorage.setItem(AUTHENTICATED, 'false');
    callback();
  };

  const value = useMemo(() => ({
    isUserAuthenticated: isAuth,
    signIn,
    signOut,
  }), [isAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
