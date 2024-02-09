import { PURGE } from 'redux-persist';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ParticipantType = {
  id: string;
  avatar: string;
  fullName: string;
};
type CurrentConversationState = {
  participants: ParticipantType[];
  name: string;
  id: string;
  isGroup: boolean | undefined;
  isOnline: boolean | undefined;
  state:
    | {
        isBlocked: boolean;
        type: 'user' | 'blocker';
      }
    | undefined;
};
const initialState: CurrentConversationState = {
  participants: [],
  name: '',
  id: '',
  isGroup: undefined,
  isOnline: undefined,
  state: undefined,
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
    updateCurrentConversationState: (
      state,
      action: PayloadAction<{ conversation: string; isBlocked: boolean; type: 'user' | 'blocker' }>,
    ) => {
      const { isBlocked, type } = action.payload;
      const newState = { ...state.state, isBlocked, type };
      state.state = newState;
    },
    setCurrentConversation: (state, action: PayloadAction<CurrentConversationState>) => {
      const { payload } = action;
      state.participants = payload.participants;
      state.id = payload.id;
      state.isGroup = payload.isGroup;
      state.isOnline = payload.isOnline;
      state.name = payload.name;
      state.state = payload.state;
    },
    clearCurrentConversation: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setConversationId,
  setConversationName,
  setCurrentConversation,
  clearCurrentConversation,
  updateCurrentConversationState,
} = currentConversationSlice.actions;
export const currentConversationReducer = currentConversationSlice.reducer;
export default currentConversationSlice;
