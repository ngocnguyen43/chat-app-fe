import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FriendBoxStateType = {
  isBoxOpen: boolean;
};
const initialState: FriendBoxStateType = {
  isBoxOpen: false,
};
const friendBoxSlice = createSlice({
  name: 'friend-box-slice',
  initialState,
  reducers: {
    setFriendBoxOpen: (state, action: PayloadAction<boolean>) => {
      state.isBoxOpen = action.payload;
    },
  },
});

export const { setFriendBoxOpen } = friendBoxSlice.actions;
export const friendBoxReducer = friendBoxSlice.reducer;
export default friendBoxSlice;
