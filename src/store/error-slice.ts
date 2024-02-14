import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  hasError: boolean;
  isAuthError: boolean;
};
const initialState: InitialStateType = {
  hasError: false,
  isAuthError: false,
};
const errorSlice = createSlice({
  name: 'error-slice',
  initialState,
  reducers: {
    shouldHaveError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setAuthError: (state, action: PayloadAction<boolean>) => {
      state.isAuthError = action.payload;
    },
    clearErrors: () => initialState,
  },
});

export const { shouldHaveError, setAuthError, clearErrors } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
export default errorSlice;
