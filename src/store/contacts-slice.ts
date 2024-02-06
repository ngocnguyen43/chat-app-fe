import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';

type ContactResponse = {
  userId: string;
  fullName: string;
  profile: {
    avatar: string
  };
  status: 'online' | 'offline';
  lastLogin: string;
  conversationId: string;
};
// First, create the thunk
export const fetchContactsThunk = createAsyncThunk('contacts/getAllContacts', async () => {
  const ACCESS_TOKEN = Storage.Get('_a');
  const id = Storage.Get('_k');
  return await axios
    .get<ContactResponse[]>(`${env.BACK_END_URL}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'x-id': id,
      },
    })
    .then((res) => res.data);
});

interface ContactState {
  entities: ContactResponse[];
  loading: boolean;
  error: string | undefined;
}

const initialState = {
  entities: [
    // {
    //     avatar: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245",
    //     conversationId: "a3730a54-8e05-42db-9092-1b3d91775cc4",
    //     fullName: "test10",
    //     lastLogin: "1694079939",
    //     status: "online",
    //     userId: "0df1ab3a-d905-45b0-a4c1-9e80ed660011"
    // },
    // {
    //     avatar: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245",
    //     conversationId: "a3730a54-8e05-42db-9092-1b3d91775cc5",
    //     fullName: "test11",
    //     lastLogin: "1694079939",
    //     status: "online",
    //     userId: "0df1ab3a-d905-45b0-a4c1-9e80ed660012"
    // },
    // {
    //     avatar: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245",
    //     conversationId: "a3730a54-8e05-42db-9092-1b3d91775cc6",
    //     fullName: "test12",
    //     lastLogin: "1694079939",
    //     status: "offline",
    //     userId: "0df1ab3a-d905-45b0-a4c1-9e80ed660013"
    // },
    // {
    //     avatar: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245",
    //     conversationId: "a3730a54-8e05-42db-9092-1b3d91775cc7",
    //     fullName: "test13",
    //     lastLogin: "1694079939",
    //     status: "offline",
    //     userId: "0df1ab3a-d905-45b0-a4c1-9e80ed660014"
    // },
    // {
    //     avatar: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245",
    //     conversationId: "a3730a54-8e05-42db-9092-1b3d91775cc8",
    //     fullName: "test15",
    //     lastLogin: "1694079939",
    //     status: "offline",
    //     userId: "0df1ab3a-d905-45b0-a4c1-9e80ed660015"
    // },
  ],
  loading: false,
  error: undefined,
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
    setOnlineMocks: (state) => {
      const tempArr = [...state.entities];
      const entity = tempArr.find((item) => item.userId === '0df1ab3a-d905-45b0-a4c1-9e80ed660010');
      if (entity) {
        entity.status = 'online';
      }
      tempArr.sort(sortCb);
      state.entities = tempArr;
    },
    clearConntacts: (state) => {
      state.entities = initialState.entities;
    },
    updateContactStatus: (state, action: PayloadAction<{ status: 'online' | 'offline'; id: string }>) => {
      const updatedEntities = state.entities.map((entity) => {
        if (entity.userId === action.payload.id) {
          return {
            ...entity,
            status: action.payload.status,
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
    });
    builder.addCase(fetchContactsThunk.fulfilled, (state, action: PayloadAction<ContactResponse[]>) => {
      // Add user to the state array
      const temp = [...action.payload, ...state.entities];
      state.entities = temp.sort(sortCb);
      state.loading = false;
    });
    builder.addCase(fetchContactsThunk.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))

export const contactsReducer = contactsSlice.reducer;
export const { setOnlineMocks, clearConntacts, updateContactStatus } = contactsSlice.actions;
export default contactsSlice;
