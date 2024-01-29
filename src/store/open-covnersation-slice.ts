import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OpenConversationState = {
  isOpen: boolean;
};
const initialState: OpenConversationState = {
  isOpen: false,
};
const OpenConversationSlice = createSlice({
  name: 'open-conversation',
  initialState,
  reducers: {
    setConversationOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});
export const openConversationReducer = OpenConversationSlice.reducer;
export const { setConversationOpen } = OpenConversationSlice.actions;
export default OpenConversationSlice;
