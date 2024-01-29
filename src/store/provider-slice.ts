import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProviderStateType = {
  provider: string;
};
const initialState: ProviderStateType = {
  provider: '',
};
const providerSlice = createSlice({
  name: 'provider-slice',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<string>) => {
      state.provider = action.payload;
    },
  },
});

export const { setProvider } = providerSlice.actions;
export const providerReducer = providerSlice.reducer;
export default providerSlice;
