import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deckOfCardsApi from '../../api/deckOfCardsApi';
import loadingStatus from '../../constants/loadingStatus-constants';
import loadImagesAsync from '../../helpers/loadImagesAsync';

// Thunks
export const getNewDeckIdAsync = createAsyncThunk(
  'DeckOfCards/getNewDeck',
  async () => {
    const response = await deckOfCardsApi.getNewDeck();
    const data = await response.json();
    return data.deck_id;
  },
  {
    condition: (arg, { getState }) => {
      const { deckOfCards } = getState();
      const fetchStatus = deckOfCards.deckLoading;
      if (fetchStatus === loadingStatus.pending || fetchStatus === loadingStatus.succeeded) {
        return false
      }
    },
  }
);
export const getTwoCardsAsync = createAsyncThunk(
  'DeckOfCards/getTwoCards',
  async (arg, { getState }) => {
    const deckId = selectDeckId(getState());
    await deckOfCardsApi.reshuffleDeck(deckId);
    const response = await deckOfCardsApi.showTwoCards(deckId);
    const data = await response.json();
    const cards = data.cards;
    await loadImagesAsync([cards[0].image, cards[1].image]);
    return data.cards;
  }
);

// Setup slice
const initialState = {
  deckId: '',
  deckLoading: loadingStatus.idle,
  cards: [],
  cardsLoading: loadingStatus.idle,
  selectedCard: null,
};

export const deckOfCardsSlice = createSlice({
  name: 'DeckOfCards',
  initialState,
  reducers: {
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNewDeckIdAsync.fulfilled, (state, action) => {
      state.deckId = action.payload;
      state.deckLoading = loadingStatus.succeeded;
    })
    builder.addCase(getNewDeckIdAsync.pending, (state) => {
      state.deckLoading = loadingStatus.pending;
    })
    builder.addCase(getTwoCardsAsync.pending, (state) => {
      state.cardsLoading = loadingStatus.pending;
    })
    builder.addCase(getTwoCardsAsync.fulfilled, (state, action) => {
      state.cards = action.payload;
      state.cardsLoading = loadingStatus.succeeded;
    })
  }
});

export const { setSelectedCard } = deckOfCardsSlice.actions;

// Selectors
export const selectDeckId = (state) => state.deckOfCards.deckId;
export const selectCards = (state) => state.deckOfCards.cards;
export const selectSelectedCard = (state) => state.deckOfCards.selectedCard;

export default deckOfCardsSlice.reducer;
