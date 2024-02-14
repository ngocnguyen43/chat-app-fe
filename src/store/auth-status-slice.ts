import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';

type AuthStatusResponse = {
  isLoginBefore: boolean;
  id: string;
  picture: string;
  email: string;
  full_name: string;
  user_name: string;
  access_token: string;
  provider: string;
};
// First, create the thunk
export const fetchAuthStatusThunk = createAsyncThunk('auth/getAllAuthStatus', async () => {
  const id = Storage.Get('_k');
  return await axios
    .get<AuthStatusResponse>(`${env.BACK_END_URL}/auth/login/success`, {
      headers: {
        'x-id': id,
      },
    })
    .then((res) => res.data);
});

interface InitialState {
  entities: AuthStatusResponse;
  loading: boolean;
  error: string | undefined;
}

const initialState = {
  entities: {},
  loading: false,
  error: undefined,
} as InitialState;

// Then, handle actions in your reducers:
const authStatusSlice = createSlice({
  name: 'auth-status',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.entities = initialState.entities;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAuthStatusThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAuthStatusThunk.fulfilled, (state, action: PayloadAction<AuthStatusResponse>) => {
      // Add user to the state array
      state.entities = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAuthStatusThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))

export const authStatusReducer = authStatusSlice.reducer;
export const { clearAuth } = authStatusSlice.actions;
export default authStatusSlice;
