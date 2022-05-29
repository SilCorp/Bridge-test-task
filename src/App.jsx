import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';
import store from './store/store';
import AuthProvider from './services/Auth/AuthProvider';

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Provider store={store}>
            <CssBaseline />
            <AppRoutes />
          </Provider>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
