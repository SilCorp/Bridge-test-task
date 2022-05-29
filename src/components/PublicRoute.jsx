import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PAGE_404 } from '../constants/route-constants';
import useAuth from '../services/Auth/useAuth';

function PublicRoute({ children }) {
  const { isUserAuthenticated } = useAuth();

  if (isUserAuthenticated) {
    return <Navigate to={PAGE_404} replace />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicRoute;
