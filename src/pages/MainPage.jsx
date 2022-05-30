import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import AppHeader from '../layouts/AppHeader';
import ShowBalance from '../components/ShowBalance';
import { getNewDeckIdAsync } from '../store/AppStore/AppSlice';
import PlayingField from '../components/PlayingField';

function MainPage() {
  const dispatch = useDispatch();

  // Fetch new deck
  useEffect(() => {
    dispatch(getNewDeckIdAsync());
  }, [dispatch]);

  return (
    <Container>
      <AppHeader />
      <main>
        <ShowBalance />
        <PlayingField />
      </main>
    </Container>
  );
}

export default MainPage;
