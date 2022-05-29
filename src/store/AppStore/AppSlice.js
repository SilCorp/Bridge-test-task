import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 71429,
  ratio: 2,
  bet: 3187,
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
    }
  }
});

export const { setBalance, setBet } = appSlice.actions;

// Selectors
export const selectBalance = (state) => state.app.balance;
export const selectBet = (state) => state.app.bet;
export const selectRatio = (state) => state.app.ratio;

// Thunks
export const winBet = () => (dispatch, getState) => {
  const bet = selectBet(getState());
  const ratio = selectRatio(getState());
  const currentBalance = selectBalance(getState());
  dispatch(setBalance(currentBalance + (bet * ratio)));
};
export const loseBet = () => (dispatch, getState) => {
  const bet = selectBet(getState());
  const currentBalance = selectBalance(getState());
  dispatch(setBalance(currentBalance - bet));
};

export default appSlice.reducer;
