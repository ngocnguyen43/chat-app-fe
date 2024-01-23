/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Storage } from '../service/LocalStorage';
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
  isGroup: boolean;
  avatar: string;
  createdAt: string;
  lastMessage: string;
  lastMessageAt: string;
  isLastMessageSeen: boolean;
  status: 'offline' | 'online';
  totalUnreadMessages: number;
  participants: {
    id: string;
  }[];
};

type InitialState = {
  entities: ConversationType[];
  loading: boolean;
  error: string | undefined;
};
export const fetchConversationsThunk = createAsyncThunk(
  'conversations/getAllConversations',
  async (id: string) => {
    // const conversation = Storage.Get("id")
    const userId = Storage.Get('_k');
    const ACCESS_TOKEN = Storage.Get('_a');
    return await axios
      .get<ConversationType[]>(`${import.meta.env.VITE_BACKEND_URL}/conversations/${id}`, {
        headers: {
          'x-id': userId,
          Authorization:
            `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => res.data);
  },
  {
    condition: (_, { getState }) => {
      const { conversations } = getState() as { conversations: InitialState };
      // return messages.entities.length <= 0
      // console.log(getState())
      return conversations.entities.length <= 0;
    },
  },
);
const initialState: InitialState = {
  entities: [],
  loading: false,
  error: undefined,
};
const conversationsSlice = createSlice({
  name: 'conversations-slice',
  initialState,
  reducers: {
    addConversations: (_state, _action: PayloadAction<{ participants: { id: string }[] }>) => {
      // state.entities.forEach(item => {
      //     if (item.conversationId === action.payload.conversationId) {
      //         const newMessages = [...item.messages, action.payload.message]
      //         item.messages = newMessages
      //     }
      // })
      // const existingConversation = state.entities.find(item => item.conversationId === action.payload.conversationId);
      // if (existingConversation) {
      //     // Conversation exists, add message to the existing conversation
      //     existingConversation.messages.push(action.payload.message);
      // } else {
      //     // Conversation doesn't exist, create a new conversation
      //     const newConversation = {
      //         conversationId: action.payload.conversationId,
      //         messages: [action.payload.message],
      //         // Add other properties if needed
      //     };
      //     state.entities.push(newConversation);
      // }
    },
    updateConversations: (state, action: PayloadAction<ConversationType[]>) => {
      // state.entities = action.payload
      return { ...state, entities: action.payload };
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
    deleteConversations: (_state, _action: PayloadAction<{ conversationId: string; messageIds: string[] }>) => {
      // const entity = state.entities.find(item => item.conversationId === action.payload.conversationId)
      // if (entity) {
      //     action.payload.messageIds.forEach(id => {
      //         entity?.messages.forEach(item => {
      //             if (item.messageId === id) {
      //                 item.isDeleted = true
      //                 item.message = [
      //                     {
      //                         type: "text",
      //                         content: "aloo"
      //                     }
      //                 ]
      //             }
      //         })
      //     })
      //     // state.entities = [...state.entities, entity]
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action: PayloadAction<ConversationType[]>) => {
      state.entities = [...state.entities, ...action.payload];
      state.loading = false;
    });
  },
});

export const { addConversations, deleteConversations, updateConversations, updateStatusConversation } =
  conversationsSlice.actions;
export const conversationsReducer = conversationsSlice.reducer;
export default conversationsSlice;
