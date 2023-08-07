import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SocketIdState = {
    id: string
}
const initialState: SocketIdState = {
    id: "",
}
const socketIdSlice = createSlice({
    name: 'socket-id',
    initialState,
    reducers: {
        SetId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
    },
})
export const socketIdReducer = socketIdSlice.reducer
export const { SetId: setId } = socketIdSlice.actions
export default socketIdSlice
