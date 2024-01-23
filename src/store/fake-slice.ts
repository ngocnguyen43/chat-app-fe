import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FakeStateType = {
    counter: number;
};
const initialState: FakeStateType = {
    counter: 0,
};
const fakeSlice = createSlice({
    name: 'fake-slice',
    initialState,
    reducers: {
        increase: (state, action: PayloadAction<number>) => {
            state.counter += action.payload;
        },
    },
});

export const { increase } = fakeSlice.actions;
export const fakeReducer = fakeSlice.reducer;
export default fakeSlice;
