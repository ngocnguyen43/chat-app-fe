import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
type MessageType = {
    messageId: string,
    message:
    {
        type: "link" | "video" | "image" | "text" | "location" | "file",
        content: string
    }[]
    ,
    sender?: string | undefined;
    recipients: string[];
    isDeleted: boolean;
    createdAt: string;
    group: string;
}
type MessagesType = {
    conversationId: string,
    messages: MessageType[]
}

type InitialState = {
    entities: MessagesType[]
    loading: boolean
    error: string | undefined,
}
export const fetchMessagesThunk = createAsyncThunk(
    'messages/getAllMessages',
    async (id: string) => {
        // const conversation = Storage.Get("id")
        return await axios.get<MessagesType>(`${import.meta.env.VITE_BACKEND_URL}/conversation/${id}`, {
            headers: {
                'x-id': 'fee3e911-4060-47bc-9649-5cfb83961b0c',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE3OTA3MDg0ODAsInVzZXJJZCI6ImIyNzlhMzNmLTE2NjEtNGZjZS1iYmJjLTg2OTlhNTllYjAzNiIsImlhdCI6MTY4MDcwNzA0NiwiZW1haWwiOiJ0ZXN0NEBnbWFpbC5jb20ifQ.-TTvV0macYshJ2X_KsXer-ZhXdBJtmZT4zfHL-fjzgk"
            }
        }).then(res => res.data)

    },
    {
        condition: (id, { getState }) => {
            const { messages } = getState() as { messages: InitialState }
            return messages.entities.filter(item => item.conversationId === id).length <= 0
        },
    }
)
const initialState: InitialState = {
    entities: [],
    loading: false,
    error: undefined
}
const messagesSlice = createSlice({
    name: 'messages-slice',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ conversationId: string, message: MessageType }>) => {
            state.entities.forEach(item => {
                if (item.conversationId === action.payload.conversationId) {
                    const newMessages = [...item.messages, action.payload.message]
                    item.messages = newMessages
                }
            })
        },
        deleteMessages: (state, action: PayloadAction<{ conversationId: string, messageIds: string[] }>) => {
            const entity = state.entities.find(item => item.conversationId === action.payload.conversationId)
            if (entity) {
                action.payload.messageIds.forEach(id => {
                    entity?.messages.forEach(item => {
                        if (item.messageId === id) {
                            item.isDeleted = true
                            item.message = [
                                {
                                    type: "text",
                                    content: "aloo"
                                }
                            ]
                        }
                    })
                })
                // state.entities = [...state.entities, entity]
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessagesThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMessagesThunk.fulfilled, (state, action: PayloadAction<MessagesType>) => {
            state.entities = [...state.entities, action.payload]
            state.loading = false
        })
    },
})

export const { addMessage, deleteMessages } = messagesSlice.actions
export const messagesReducer = messagesSlice.reducer
export default messagesSlice
