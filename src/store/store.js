import { configureStore } from '@reduxjs/toolkit';
import appReducer from './AppStore/AppSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
