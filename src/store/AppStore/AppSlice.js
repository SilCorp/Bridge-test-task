import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gameStatus from '../../constants/gameStatus-constants';
import deckOfCardsApi from '../../api/deckOfCardsApi';
import loadingStatus from '../../constants/loadingStatus-constants';
import loadImagesAsync from '../../helpers/loadImagesAsync';

// Thunks
export const getNewDeckIdAsync = createAsyncThunk(
  'app/getNewDeck',
  async () => {
    const response = await deckOfCardsApi.getNewDeck();
    const data = await response.json();
    return data.deck_id;
  },
  {
    condition: (arg, { getState }) => {
      const { app } = getState();
      const fetchStatus = app.deckLoading;
      if (fetchStatus === loadingStatus.pending || fetchStatus === loadingStatus.succeeded) {
        return false
      }
    },
  }
);
export const getTwoCardsAsync = createAsyncThunk(
  'app/getTwoCards',
  async (arg, { getState }) => {
    const deckId = selectDeckId(getState());
    await deckOfCardsApi.reshuffleDeck(deckId);
    const response = await deckOfCardsApi.showTwoCards(deckId);
    const data = await response.json();
    const cards = data.cards;
    await loadImagesAsync([cards[0].image, cards[1].image]);
    return cards;
  }
);

const initialState = {
  gameStatus: gameStatus.initialized,
  balance: 71429,
  ratio: 2,
  bet: 3187,
  deckId: '',
  deckLoading: loadingStatus.idle,
  cards: [],
};

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setBet: (state, action) => {
      state.bet = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
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
    builder.addCase(getTwoCardsAsync.fulfilled, (state, action) => {
      state.cards = action.payload;
      state.gameStatus = gameStatus.finished;
    })
  }
});

export const { setBalance, setBet, setGameStatus } = appSlice.actions;

// Selectors
export const selectBalance = (state) => state.app.balance;
export const selectBet = (state) => state.app.bet;
export const selectRatio = (state) => state.app.ratio;
export const selectGameStatus = (state) => state.app.gameStatus;
export const selectDeckId = (state) => state.app.deckId;
export const selectCards = (state) => state.app.cards;
export const selectGain = (state) => (
  state.app.bet * state.app.ratio
);

// Thunks
export const winBet = () => (dispatch, getState) => {
  const bet = selectBet(getState());
  const ratio = selectRatio(getState());
  const currentBalance = selectBalance(getState());
  dispatch(setBalance(currentBalance + (bet * ratio)));
};
export const makeBet = () => (dispatch, getState) => {
  const bet = selectBet(getState());
  const currentBalance = selectBalance(getState());
  dispatch(setBalance(currentBalance - bet));
};

export default appSlice.reducer;
