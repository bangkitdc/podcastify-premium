import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from '@/types/modal';

const initialState : ModalState[] = [];

export const MODAL = 'modal';

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addModal: (state, action) => {
      state.push({ target: action.payload, show: false });
    },
    show: (state, action) => {
      const modal = state.find((item) => item.target === action.payload);
      if (modal) {
        modal.show = true;
      }
    },
    close: (state, action) => {
      const modal = state.find((item) => item.target === action.payload);
      if (modal) {
        modal.show = false;
      }
    }
  },
});

export const { addModal, show, close } = modalSlice.actions;
export default modalSlice.reducer;