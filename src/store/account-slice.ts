import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  email: string | null;
  password: string | null;
};
const initialState: InitialStateType = {
  email: null,
  password: null,
};
const accountSlice = createSlice({
  name: 'account-slice',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearAccount: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setEmail, setPassword, clearAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
export default accountSlice;
