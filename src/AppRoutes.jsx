import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { LOGIN_PAGE, MAIN_PAGE } from './constants/route-constants';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import PublicRoute from './components/PublicRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={MAIN_PAGE}
        exact
        element={(
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        )}
      />
      <Route
        path={LOGIN_PAGE}
        exact
        element={(
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )}
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRoutes;
