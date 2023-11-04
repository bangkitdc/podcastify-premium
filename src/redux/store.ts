import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modals/reducer';
import notificationReducer from './notifications/reducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  notification: notificationReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;