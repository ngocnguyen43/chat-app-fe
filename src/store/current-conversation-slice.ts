import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentConversationState = {
    name: string
    id: string,
}
const initialState: CurrentConversationState = {
    name: '',
    id: ""
}
const currentConversationSlice = createSlice({
    name: 'current-conversation-slice',
    initialState,
    reducers: {
        setConversationName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setConversationId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        }
    },
})

export const { setConversationId, setConversationName } = currentConversationSlice.actions
export const currentConversationReducer = currentConversationSlice.reducer
export default currentConversationSlice
