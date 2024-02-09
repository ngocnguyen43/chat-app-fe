import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ParticipantsType = {
  id: string;
  avatar: string;
  fullName: string;
};
type newConversationState = {
  name: string | null;
  id: string | null;
  participants: ParticipantsType[];
  isGroup: boolean | undefined;
  isOnline: boolean | undefined;
};
const initialState: newConversationState = {
  name: null,
  id: null,
  participants: [],
  isGroup: undefined,
  isOnline: undefined,
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
      const { id, isGroup, participants, isOnline, name } = action.payload;
      state.id = id;
      state.isGroup = isGroup;
      state.participants = participants;
      state.isOnline = isOnline;
      state.name = name;
    },
    clearNewConversation: () => initialState,
  },
});

export const { setNewConversationId, setNewConversationName, setNewConversation, clearNewConversation } =
  newConversationSlice.actions;
export const newConversationReducer = newConversationSlice.reducer;
export default newConversationSlice;
