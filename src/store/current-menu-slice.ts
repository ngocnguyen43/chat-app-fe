import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentTabState = {
    name: "contact" | "conversation";
}
const initialState: CurrentTabState = {
    name: 'conversation',
}
const currentTabSlice = createSlice({
    name: 'current-conversation-slice',
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<"contact" | "conversation">) => {
            state.name = action.payload
        }
    },
})

export const { setCurrentTab } = currentTabSlice.actions
export const currentTabReducer = currentTabSlice.reducer
export default currentTabSlice
