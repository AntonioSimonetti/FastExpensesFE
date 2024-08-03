import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import expensesSlice from './expensesSlice';
import ToastMiddleware from '../middlewares/ToastMiddleware';
import authenticationSlice from './authenticationSlice';
import statisticsSlice from './statisticsSlice';


export const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice,
    statisticsSlice: statisticsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
