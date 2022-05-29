import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGIN_PAGE } from '../constants/route-constants';
import useAuth from '../services/Auth/useAuth';

function PrivateRoute({ children }) {
  const { isUserAuthenticated } = useAuth();
  const location = useLocation();

  if (!isUserAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
