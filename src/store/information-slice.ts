import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

type InfomationType = {
  email: string;
  fullName: string;
  profile: {
    avatar: string;
    bio: string;
    birthday: string;
  };
  userId: string;
  userName: string;
};

type InitialStateType = {
  entity: InfomationType;
  isLoading: boolean;
  isError: boolean;
};
export const fetchInfomationThunk = createAsyncThunk(
  'infomation/fetchInfomation',
  async (id: string) => {
    // const conversation = Storage.Get("id")
    // const ACCESS_TOKEN = Storage.Get('_a');
    return await axios
      .get<InfomationType>(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        withCredentials: true,
        headers: {
          'x-id': id,
          // Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => res.data);
  },
  // {
  //   condition: (_, { getState }) => {
  //     const { conversations } = getState() as { conversations: InitialState };
  //     // return messages.entities.length <= 0
  //     // console.log(getState())
  //     return conversations.entities.length <= 0;
  //   },
  // },
);
const initialState: InitialStateType = {
  entity: {
    email: '',
    fullName: '',
    profile: {
      avatar: '',
      bio: '',
      birthday: '',
    },
    userId: '',
    userName: '',
  },
  isLoading: true,
  isError: false,
};
const infomationSlice = createSlice({
  name: 'infomation-slice',
  initialState,
  reducers: {
    // setInfomation: (state, action: PayloadAction<InfomationType>) => {
    //     console.log(action.payload);

    //     state = { ...action.payload };
    // }
    clearInfomation: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInfomationThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInfomationThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.entity = action.payload;
        state.isLoading = false;
      }
    });
    builder.addCase(fetchInfomationThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(PURGE, () => initialState);
  },
});

export const { clearInfomation } = infomationSlice.actions;
export const infomationReducer = infomationSlice.reducer;
export default infomationSlice;
