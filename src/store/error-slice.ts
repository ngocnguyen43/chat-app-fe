import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
    hasError: boolean
}
const initialState: InitialStateType = {
    hasError: false,
}
const errorSlice = createSlice({
    name: 'error-slice',
    initialState,
    reducers: {
        shouldHaveError: (state, action: PayloadAction<boolean>) => {
            state.hasError = action.payload
        },
    },
})

export const { shouldHaveError } = errorSlice.actions
export const errorReducer = errorSlice.reducer
export default errorSlice
