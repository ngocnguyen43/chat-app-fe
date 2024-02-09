import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TempMessageType = {
  messageId: string;
  message: {
    type: 'text' | 'location' | 'image' | 'file' | 'video' | 'link';
    content: string;
  }[];
  sender?: string | undefined;
  recipients: string[];
  isDeleted: boolean;
  createdAt: string;
  group: string;
};
type InitialState = {
  entities: TempMessageType[];
};
const initialState: InitialState = {
  entities: [],
};
const tempMessageSlice = createSlice({
  name: 'temp-message-slice',
  initialState,
  reducers: {
    setTempMessage: (state, action: PayloadAction<TempMessageType>) => {
      const { payload } = action;
      state.entities = [payload];
    },
    clearTempMessage: () => initialState,
  },
});

export const { setTempMessage, clearTempMessage } = tempMessageSlice.actions;
export const tempMessageReducer = tempMessageSlice.reducer;
export default tempMessageSlice;
