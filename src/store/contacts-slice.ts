import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { env } from '../config';
import currentConversationSlice from './current-conversation-slice';

type ContactResponse = {
  userId: string;
  fullName: string;
  avatar: string;
  status: 'online' | 'offline';
  lastLogin: string;
  conversationId: string;
  state: {
    isBlocked: boolean;
    type: 'user' | 'blocker';
  };
};
export const fetchContactsThunk = createAsyncThunk('contacts/getAllContacts', async (id: string) => {
  return await axios
    .get<ContactResponse[]>(`${env.BACK_END_URL}/users/${id}/contacts`, {
      withCredentials: true,
      headers: {
        'x-id': id,
      },
    })
    .then((res) => res.data);
});

interface ContactState {
  entities: ContactResponse[];
  loading: boolean;
  isError: boolean;
}

const initialState = {
  entities: [],
  loading: true,
  isError: false,
} as ContactState;
function sortCb(
  a: ArrayElementType<typeof initialState.entities>,
  b: ArrayElementType<typeof initialState.entities>,
): number {
  // Compare the "status" property of objects a and b
  if (a.status === 'online' && b.status === 'offline') {
    return -1; // "online" comes before "offline"
  } else if (a.status === 'offline' && b.status === 'online') {
    return 1; // "offline" comes after "online"
  } else {
    return 0; // Leave the order unchanged
  }
}
// Then, handle actions in your reducers:
const contactsSlice = createSlice({
  name: 'auth-status',
  initialState: { ...initialState, entities: [...initialState.entities.sort(sortCb)] },
  reducers: {
    clearConntacts: () => initialState,
    updateContactState: (
      state,
      action: PayloadAction<{ id: string; isBlocked: boolean; type: 'user' | 'blocker' }>,
    ) => {
      const { id, isBlocked, type } = action.payload;
      const updatedEntities = state.entities.map((entity) => {
        if (entity.conversationId === id) {
          return {
            ...entity,
            state: {
              isBlocked,
              type,
            },
          };
        }
        return entity;
      });
      state.entities = updatedEntities;
    },
    updateContactStatus: (
      state,
      action: PayloadAction<{ status: 'online' | 'offline'; id: string; lastLogin: string }>,
    ) => {
      const { status, id, lastLogin } = action.payload;
      const updatedEntities = state.entities.map((entity) => {
        if (entity.userId === id) {
          return {
            ...entity,
            status,
            lastLogin,
          };
        }
        return entity;
      });
      state.entities = updatedEntities;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchContactsThunk.pending, (state) => {
      state.loading = true;
      state.entities = [];
    });
    builder.addCase(fetchContactsThunk.fulfilled, (state, action: PayloadAction<ContactResponse[]>) => {
      // Add user to the state array
      const temp = [...action.payload, ...state.entities];
      state.entities = temp.sort(sortCb);
      state.loading = false;
    });
    builder.addCase(fetchContactsThunk.rejected, (state) => {
      state.loading = true;
      state.isError = true;
      // throw new Error("")
    });
    builder.addCase(currentConversationSlice.actions.updateCurrentConversationState, (state, action) => {
      const { conversation, isBlocked, type } = action.payload;
      const updatedEntities = state.entities.map((entity) => {
        if (entity.conversationId === conversation) {
          return {
            ...entity,
            state: {
              isBlocked,
              type,
            },
          };
        }
        return entity;
      });
      state.entities = updatedEntities;
    });
  },
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))

export const contactsReducer = contactsSlice.reducer;
export const { clearConntacts, updateContactStatus, updateContactState } = contactsSlice.actions;
export default contactsSlice;
