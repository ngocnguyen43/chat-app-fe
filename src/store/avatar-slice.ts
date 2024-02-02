import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';

type AvatarDataResponse = {
  data: string;
};
interface InitialState {
  entities: AvatarDataResponse | null;
  loading: boolean;
  error: string | undefined;
}
// First, create the thunk
export const fetchAvatarThunk = createAsyncThunk(
  'user/avatar',
  async () => {
    const ACCESS_TOKEN = Storage.Get('_a');
    const id = Storage.Get('_k');
    return await axios
      .get<AvatarDataResponse>(`${env.BACK_END_URL}/user/avatar/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'x-id': id,
        },
      })
      .then((res) => res.data);
  },
  {
    condition: (_, { getState }) => {
      const { avatar } = getState() as { avatar: InitialState };
      return avatar.entities === null;
    },
  },
);

const initialState = {
  entities: null,
  loading: false,
  error: undefined,
} as InitialState;

// Then, handle actions in your reducers:
const avatarSlice = createSlice({
  name: 'avatar-state',
  initialState: { ...initialState },
  reducers: {
    clearAvatar: (state) => {
      state.entities = initialState.entities;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAvatarThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAvatarThunk.fulfilled, (state, action: PayloadAction<AvatarDataResponse>) => {
      // Add user to the state array
      state.entities = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAvatarThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))

export const avatarReducer = avatarSlice.reducer;
export const { clearAvatar } = avatarSlice.actions;
export default avatarSlice;
