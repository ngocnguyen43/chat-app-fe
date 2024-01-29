import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MessageType = {
  messageId: string;
  message: {
    type: 'link' | 'video' | 'image' | 'text' | 'location' | 'file';
    content: string;
  }[];
  sender?: string | undefined;
  recipients: string[];
  isDeleted: boolean;
  createdAt: string;
  group: string;
};
type MessagesType = {
  conversationId: string;
  messages: MessageType[];
};

type InitialState = {
  entities: MessagesType[];
};
// export const fetchMessagesThunk = createAsyncThunk(
//     'messages/getAllMessages',
//     async (id: string) => {
//         // const conversation = Storage.Get("id")
//         const userId = Storage.Get("_k");
//         return await axios.get<MessagesType>(`${import.meta.env.VITE_BACKEND_URL}/conversation/${id}`, {
//             headers: {
//                 'x-id': userId,
//                 Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE3OTA3MDg0ODAsInVzZXJJZCI6ImIyNzlhMzNmLTE2NjEtNGZjZS1iYmJjLTg2OTlhNTllYjAzNiIsImlhdCI6MTY4MDcwNzA0NiwiZW1haWwiOiJ0ZXN0NEBnbWFpbC5jb20ifQ.-TTvV0macYshJ2X_KsXer-ZhXdBJtmZT4zfHL-fjzgk"
//             }
//         }).then(res => res.data)

//     },
//     {
//         condition: (id, { getState }) => {
//             const { messages } = getState() as { messages: InitialState }
//             return messages.entities.filter(item => item.conversationId === id).length <= 0
//         },
//     }
// )
const initialState: InitialState = {
  entities: [],
};
const messagesSlice = createSlice({
  name: 'messages-slice',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: MessageType }>) => {
      // state.entities.forEach(item => {
      //     if (item.conversationId === action.payload.conversationId) {
      //         const newMessages = [...item.messages, action.payload.message]
      //         item.messages = newMessages
      //     }
      // })
      const existingConversation = state.entities.find((item) => item.conversationId === action.payload.conversationId);

      if (existingConversation) {
        // Conversation exists, add message to the existing conversation
        existingConversation.messages.push(action.payload.message);
      } else {
        // Conversation doesn't exist, create a new conversation
        const newConversation = {
          conversationId: action.payload.conversationId,
          messages: [action.payload.message],
          // Add other properties if needed
        };

        state.entities.unshift(newConversation);
      }
    },
    deleteMessages: (state, action: PayloadAction<{ conversationId: string; messageIds: string[] }>) => {
      const entity = state.entities.find((item) => item.conversationId === action.payload.conversationId);
      if (entity) {
        action.payload.messageIds.forEach((id) => {
          entity?.messages.forEach((item) => {
            if (item.messageId === id) {
              item.isDeleted = true;
              item.message = [
                {
                  type: 'text',
                  content: 'aloo',
                },
              ];
            }
          });
        });
        // state.entities = [...state.entities, entity]
      }
    },
  },
});

export const { addMessage, deleteMessages } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
export default messagesSlice;
