import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OpenCallModalType = {
  isOpenCallModal?: boolean;
};
const initialState: OpenCallModalType = {
  isOpenCallModal: false,
};
const callModalSlice = createSlice({
  name: 'fcall-modal-slice',
  initialState,
  reducers: {
    setOpenCallModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenCallModal = action.payload;
    },
  },
});

export const { setOpenCallModal } = callModalSlice.actions;
export const openCallModalReducer = callModalSlice.reducer;
export default callModalSlice;
