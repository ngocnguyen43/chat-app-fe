import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CallBoxType = {
    shouldCallBoxOpen: boolean
    room: string
}
const initialState: CallBoxType = {
    shouldCallBoxOpen: false,
    room: ""
}
const callBoxSlice = createSlice({
    name: 'call-box-slice',
    initialState,
    reducers: {
        setCallBoxOpen: (state, action: PayloadAction<boolean>) => {
            state.shouldCallBoxOpen = action.payload
        },
        setRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload
        }
    },
})

export const { setCallBoxOpen, setRoom } = callBoxSlice.actions
export const callBoxReducer = callBoxSlice.reducer
export default callBoxSlice
