import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentConversationState = {
  avatar: string | string[];
  name: string;
  id: string;
  isGroup: boolean;
  isOnline: boolean;
};
const initialState: CurrentConversationState = {
  avatar: '',
  name: '',
  id: '',
  isGroup: false,
  isOnline: false,
};
const currentConversationSlice = createSlice({
  name: 'current-conversation-slice',
  initialState,
  reducers: {
    setConversationName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setConversationId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCurrentConversation: (state, action: PayloadAction<CurrentConversationState>) => {
      const { payload } = action;
      state.avatar = payload.avatar;
      state.id = payload.id;
      state.isGroup = payload.isGroup;
      state.isOnline = payload.isOnline;
      state.name = payload.name;
    },
    clearCurrentConversation: () => initialState
  },
});

export const { setConversationId, setConversationName, setCurrentConversation, clearCurrentConversation } = currentConversationSlice.actions;
export const currentConversationReducer = currentConversationSlice.reducer;
export default currentConversationSlice;
