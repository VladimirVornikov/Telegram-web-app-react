import { configureStore } from '@reduxjs/toolkit';
import timeReducer from '../features/timeSlice';

export const store = configureStore({
  reducer: {
    time: timeReducer,
  },
});
