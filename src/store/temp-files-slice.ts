import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import Redux from 'react-redux'
type InitialStateType = {
  urls: string[];
};
const initialState: InitialStateType = {
  urls: [],
};
const tempFilesSlice = createSlice({
  name: 'temp-files-slice',
  initialState,
  reducers: {
    addTempFilesUrl: (state, action: PayloadAction<string>) => {
      state.urls.push(action.payload);
    },
    clearTempFilesUrl: () => initialState,
  },
});
export const { addTempFilesUrl, clearTempFilesUrl } = tempFilesSlice.actions;
export const tempFilesUrlReducer = tempFilesSlice.reducer;
export default tempFilesSlice;
