import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './useModalState/reducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  // Add more reducers here if needed
});


export const store = configureStore({
  reducer: rootReducer,
  // Additional configuration options
});

export type RootState = ReturnType<typeof store.getState>;