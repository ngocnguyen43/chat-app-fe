import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type newConversationState = {
  avatar: string | null;
  name: string | null;
  id: string | null;
  users: string | string[] | null;
  isGroup: boolean;
  isOnline: boolean;
};
const initialState: newConversationState = {
  avatar: null,
  name: null,
  id: null,
  users: null,
  isGroup: false,
  isOnline: false,
};
const newConversationSlice = createSlice({
  name: 'new-conversation-slice',
  initialState,
  reducers: {
    setNewConversationName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setNewConversationId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setNewConversation: (state, action: PayloadAction<newConversationState>) => {
      const { payload } = action;
      state.avatar = payload.avatar;
      state.id = payload.id;
      state.isGroup = payload.isGroup;
      state.users = action.payload.users;
      state.isOnline = payload.isOnline;
      state.name = payload.name;
    },
    clearNewConversation: () => initialState,
  },
});

export const { setNewConversationId, setNewConversationName, setNewConversation, clearNewConversation } =
  newConversationSlice.actions;
export const newConversationReducer = newConversationSlice.reducer;
export default newConversationSlice;
