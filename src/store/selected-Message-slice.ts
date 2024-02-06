import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  message: string[];
  indexes: number[];
};
const initialState: InitialStateType = {
  message: [],
  indexes: [],
};
const selectedMessageSlice = createSlice({
  name: 'selected-message-slice',
  initialState,
  reducers: {
    selectedMessage: (state, action: PayloadAction<{ message: string; index: number }>) => {
      const { message, index } = action.payload;
      state.message.push(message);
      state.indexes.push(index);
    },
    unselectedMessage: (state, action: PayloadAction<{ message: string; index: number }>) => {
      const { message, index } = action.payload;
      state.message = state.message.filter((msg) => msg !== message);
      state.indexes = state.indexes.filter((i) => i !== index);
    },
    clearSelectedMessages: () => initialState,
  },
});

export const { selectedMessage, unselectedMessage, clearSelectedMessages } = selectedMessageSlice.actions;
export const selectedMessageReducer = selectedMessageSlice.reducer;
export default selectedMessageSlice;
