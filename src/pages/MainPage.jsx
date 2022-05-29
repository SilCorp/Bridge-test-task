import React from 'react';
import { Container } from '@mui/material';
import AppHeader from '../layouts/AppHeader';
import ShowBalance from '../components/ShowBalance';

function MainPage() {
  return (
    <Container>
      <AppHeader />
      <main>
        <ShowBalance />
      </main>
    </Container>
  );
}

export default MainPage;
