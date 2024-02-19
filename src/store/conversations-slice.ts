import axios from 'axios';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import contactsSlice from './contacts-slice';
import currentConversationSlice from './current-conversation-slice';

// [
// 	{
// 		"conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
// 		"name": "test2",
// 		"creator": null,
// 		"isGroup": false,
// 		"avatar": null,
// 		"createdAt": "1693725966131",
// 		"lastMessage": "ayoo",
// 		"lastMessageAt": "1704877506521",
// 		"isLastMessageSeen": false,
// 		"status": "offline",
// 		"totalUnreadMessages": 0,
// 		"participants": [
// 			{
// 				"id": "fee3e911-4060-47bc-9649-5cfb83961b0c"
// 			},
// 			{
// 				"id": "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
// 			}
// 		]
// 	}
// ]
export type ConversationType = {
  conversationId: string;
  name: string;
  creator: string | null;
  isGroup: boolean | undefined;
  createdAt: string;
  lastMessage: string;
  lastMessageAt: string;
  isLastMessageSeen: boolean;
  status: 'offline' | 'online';
  totalUnreadMessages: number;
  state:
  | {
    isBlocked: boolean;
    type: 'user' | 'blocker';
  }
  | undefined;
  participants: {
    id: string;
    avatar: string;
    fullName: string;
    isActive: boolean
  }[];
};

type InitialState = {
  entities: ConversationType[];
  history: ConversationType[];
  furture: ConversationType[];
  loading: boolean;
  isError: boolean;
};
export const fetchConversationsThunk = createAsyncThunk(
  'conversations/getAllConversations',
  async (id: string) => {
    // const conversation = Storage.Get("id")
    // const ACCESS_TOKEN = Storage.Get('_a');
    return await axios
      .get<ConversationType[]>(`${import.meta.env.VITE_BACKEND_URL}/conversations`, {
        withCredentials: true,
        headers: {
          'x-id': id,
          // Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => res.data);
  },
  // {
  //   condition: (_, { getState }) => {
  //     const { conversations } = getState() as { conversations: InitialState };
  //     // return messages.entities.length <= 0
  //     // console.log(getState())
  //     return conversations.entities.length <= 0;
  //   },
  // },
);
const initialState: InitialState = {
  entities: [],
  history: [],
  furture: [],
  loading: true,
  isError: false,
};
const conversationsSlice = createSlice({
  name: 'conversations-slice',
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<ConversationType>) => {
      const newConversation = action.payload;
      const present = [...state.entities];
      state.history = present;
      state.entities.unshift(newConversation);
    },
    updateLastMessage: (
      state,
      action: PayloadAction<{
        id: string;
        lastMessage: string;
        lastMessageAt: string;
        isLastMessageSeen: boolean;
        totalUnreadMessages: number;
      }>,
    ) => {
      const { id, lastMessage, lastMessageAt, isLastMessageSeen, totalUnreadMessages } = action.payload;
      const entities = state.entities.filter((i) => i.conversationId !== id);
      const draftState = state.entities.find((i) => i.conversationId === id);
      if (!draftState) {
        return;
      }
      const data = { ...draftState, lastMessage, lastMessageAt, isLastMessageSeen, totalUnreadMessages };
      state.entities = [...entities, data].sort((a, b) => {
        return +b.lastMessageAt - +a.lastMessageAt;
      });
    },
    updateTotalUnreadMessages: (state, action: PayloadAction<{ id: string; total: number }>) => {
      const { id, total } = action.payload;
      const currentConversation = state.entities.find((item) => item.conversationId === id);
      const rest = state.entities.filter((item) => item.conversationId !== id);
      if (!currentConversation) {
        return;
      }
      currentConversation.totalUnreadMessages = total;
      state.entities = [...rest, currentConversation].sort((a, b) => {
        return +b.lastMessageAt - +a.lastMessageAt;
      });
    },
    updateConversations: (state, action: PayloadAction<ConversationType[]>) => {
      // state.entities = action.payload
      const data = action.payload;
      const entities = data.sort((a, b) => {
        return +b.lastMessageAt - +a.lastMessageAt;
      });
      return { ...state, entities };
    },
    updateLastDeletedMsg: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const data = state.entities.find((i) => i.conversationId === id);
      if (!data) {
        return;
      }
      data.lastMessage = 'Unsent message';
      state.entities.sort((a, b) => {
        return +b.lastMessageAt - +a.lastMessageAt;
      });
    },
    updateStatusConversation: (state, action: PayloadAction<{ status: 'online' | 'offline'; id: string }>) => {
      const updatedEntities = state.entities.map((entity) => {
        if (!entity.isGroup && entity.participants.some((u) => u.id === action.payload.id)) {
          // Create a new object with the updated status
          return {
            ...entity,
            status: action.payload.status,
          };
        }
        return entity;
      });
      state.entities = updatedEntities;
      // state.entities.forEach(entity => {
      //     console.log(existParticipant)
      //     if (existParticipant && !entity.isGroup) {
      //         entity.status = action.payload.status
      //     }
      // })
    },
    deleteConversations: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const present = [...state.entities];
      state.history = present;
      state.entities = present
        .filter((item) => item.conversationId !== id)
        .sort((a, b) => {
          return +b.lastMessageAt - +a.lastMessageAt;
        });
    },
    inactiveParticipants: (state, action: PayloadAction<{ conversationId: string, userId: string }>) => {
      const { conversationId, userId } = action.payload
      console.log({ conversationId, userId });

      const preset = [...state.entities];
      state.history = preset;
      // const existConversation = preset.find
      state.entities = preset
        .map((entity) => {
          if (entity.conversationId !== conversationId) {
            return entity;
          }
          else {
            const participants = entity.participants.map(p => {
              if (p.id === userId) {
                return {
                  ...p,
                  isActive: false
                }
              }
              return p
            })
            return { ...entity, participants };
          }
        })
        .sort((a, b) => {
          return +b.lastMessageAt - +a.lastMessageAt;
        });
    },
    updateConversationStateInside: (
      state,
      action: PayloadAction<{ conversation: string; type: 'user' | 'blocker'; isBlocked: boolean }>,
    ) => {
      const { conversation, type, isBlocked } = action.payload;
      const preset = [...state.entities];
      state.history = preset;
      state.entities = preset
        .map((entity) => {
          if (entity.conversationId !== conversation) {
            return entity;
          }
          return { ...entity, state: { ...entity.state, isBlocked, type } };
        })
        .sort((a, b) => {
          return +b.lastMessageAt - +a.lastMessageAt;
        });
    },

    rollbackConversations: (state) => {
      if (state.history.length === 0) return;
      const history = [...state.history];
      state.entities = history;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.pending, (state) => {
      state.loading = true;
      state.entities = [];
    });
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action: PayloadAction<ConversationType[]>) => {
      const data = [...action.payload].sort((a, b) => {
        return +b.lastMessageAt - +a.lastMessageAt;
      });
      state.entities = data;
      state.loading = false;
    });
    builder.addCase(fetchConversationsThunk.rejected, (state) => {
      state.loading = true;
      state.entities = [];
      state.isError = true;
    });
    builder.addCase(contactsSlice.actions.updateContactStatus, (state, action) => {
      const updatedEntities = state.entities.map((entity) => {
        if (!entity.isGroup && entity.participants.some((u) => u.id === action.payload.id)) {
          // Create a new object with the updated status
          return {
            ...entity,
            status: action.payload.status,
          };
        }
        return entity;
      });
      state.entities = updatedEntities;
    });
    builder.addCase(currentConversationSlice.actions.updateCurrentConversationState, (state, action) => {
      const { conversation, type, isBlocked } = action.payload;
      const preset = [...state.entities];
      state.history = preset;
      state.entities = preset
        .map((entity) => {
          if (entity.conversationId !== conversation) {
            return entity;
          }
          return { ...entity, state: { ...entity.state, isBlocked, type } };
        })
        .sort((a, b) => {
          return +b.lastMessageAt - +a.lastMessageAt;
        });
    });
  },
});

export const {
  addConversations,
  deleteConversations,
  updateConversations,
  updateStatusConversation,
  rollbackConversations,
  updateLastMessage,
  updateLastDeletedMsg,
  updateTotalUnreadMessages,
  updateConversationStateInside,
  inactiveParticipants
} = conversationsSlice.actions;
export const conversationsReducer = conversationsSlice.reducer;
export default conversationsSlice;
