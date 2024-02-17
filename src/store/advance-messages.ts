import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import Redux from 'react-redux'
type AdvanceMessageInitialState = {
  type: 'none' | 'image' | 'video' | 'files';
};
const initialState: AdvanceMessageInitialState = {
  type: 'none',
};
const advanceMessagesSlice = createSlice({
  name: 'setting-slice',
  initialState,
  reducers: {
    setAdvanceMessage: (state, action: PayloadAction<AdvanceMessageInitialState['type']>) => {
      state.type = action.payload;
    },
    clearAdvanceMessage: (state) => {
      state.type = 'none';
    },
  },
});
export const { setAdvanceMessage, clearAdvanceMessage } = advanceMessagesSlice.actions;
export const advanceMessageReducer = advanceMessagesSlice.reducer;
export default advanceMessagesSlice;
