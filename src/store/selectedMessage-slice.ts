import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  message: string[];
};
const initialState: InitialStateType = {
  message: [],
};
const selectedMessageSlice = createSlice({
  name: 'selected-message-slice',
  initialState,
  reducers: {
    selectedMessage: (state, action: PayloadAction<string>) => {
      state.message.push(action.payload);
    },
    unselectedMessage: (state, action: PayloadAction<string>) => {
      state.message = state.message.filter((msg) => msg !== action.payload);
    },
    clearSelectedMessages: (state) => {
      state.message = [];
    },
  },
});

export const { selectedMessage, unselectedMessage, clearSelectedMessages } = selectedMessageSlice.actions;
export const selectedMessageReducer = selectedMessageSlice.reducer;
export default selectedMessageSlice;
