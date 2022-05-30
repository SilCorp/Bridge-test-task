import { configureStore } from '@reduxjs/toolkit';
import appReducer from './AppStore/AppSlice';
import deckOfCardsReducer from './DeckOfCardsStore/DeckOfCardsSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    deckOfCards: deckOfCardsReducer,
  },
});

export default store;
