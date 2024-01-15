import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
    password: boolean
    passkey: boolean

}
const initialState: InitialStateType = {
    password: false,
    passkey: false
}
const authOptionsSlice = createSlice({
    name: 'auth-options-slice',
    initialState,
    reducers: {
        setPasswordOptions: (state, action: PayloadAction<boolean>) => {
            state.password = action.payload
        },
        setPasskeyOptions: (state, action: PayloadAction<boolean>) => {
            state.passkey = action.payload
        }
    },
})

export const { setPasswordOptions, setPasskeyOptions } = authOptionsSlice.actions
export const authOptionsReducer = authOptionsSlice.reducer
export default authOptionsSlice
