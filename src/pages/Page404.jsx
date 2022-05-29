import React from 'react';
import { Navigate, useMatch } from 'react-router-dom';
import { PAGE_404 } from '../constants/route-constants';

function Page404() {
  const match = useMatch(PAGE_404);

  if (match) {
    return (
      <div>404</div>
    );
  }

  return <Navigate to={PAGE_404} replace />;
}

export default Page404;
