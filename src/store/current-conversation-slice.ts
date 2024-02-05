import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ParticipantType = {
  id: string,
  avatar: string
}
type CurrentConversationState = {
  participants: ParticipantType[];
  name: string;
  id: string;
  isGroup: boolean;
  isOnline: boolean;
};
const initialState: CurrentConversationState = {
  participants: [],
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
      state.participants = payload.participants;
      state.id = payload.id;
      state.isGroup = payload.isGroup;
      state.isOnline = payload.isOnline;
      state.name = payload.name;
    },
    clearCurrentConversation: () => initialState,
  },
});

export const { setConversationId, setConversationName, setCurrentConversation, clearCurrentConversation } =
  currentConversationSlice.actions;
export const currentConversationReducer = currentConversationSlice.reducer;
export default currentConversationSlice;
