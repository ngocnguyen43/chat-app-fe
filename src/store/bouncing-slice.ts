import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
    isOpen: boolean
}
const initialState: InitialStateType = {
    isOpen: false,
}
const bouncingSlice = createSlice({
    name: 'bouncing-slice',
    initialState,
    reducers: {
        setShowBouncing: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
    },
})

export const { setShowBouncing } = bouncingSlice.actions
export const bouncingReducer = bouncingSlice.reducer
export default bouncingSlice
