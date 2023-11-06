import { createSlice } from '@reduxjs/toolkit';
import { INotificationState } from '@/types/notification';

const initialState: INotificationState[] = [];

export const NOTIFICATION = 'notification';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },

    clearNotifications: (state) => {
      state.length = 0;
    },
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;