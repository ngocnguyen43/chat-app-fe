import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MFASetupType = {
    shouldMFASetupOpen: boolean;
};
const initialState: MFASetupType = {
    shouldMFASetupOpen: false,
};
const mfaSetupSlice = createSlice({
    name: 'mfa-setup-slice',
    initialState,
    reducers: {
        setMFASetupOpen: (state, action: PayloadAction<boolean>) => {
            state.shouldMFASetupOpen = action.payload;
        },
    },
});

export const { setMFASetupOpen } = mfaSetupSlice.actions;
export const mfaSetupReducer = mfaSetupSlice.reducer;
export default mfaSetupSlice;
