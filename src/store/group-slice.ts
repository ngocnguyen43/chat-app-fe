import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import Redux from 'react-redux'
type GroupSettingInitialState = {
    type: 'none' | 'users';
};
const initialState: GroupSettingInitialState = {
    type: 'none',
};
const groupSettingSlice = createSlice({
    name: 'group-setting-slice',
    initialState,
    reducers: {
        setGroupSetting: (state, action: PayloadAction<GroupSettingInitialState['type']>) => {
            state.type = action.payload;
        },
        clearGroupSetting: (state) => {
            state.type = 'none';
        },
    },
});
export const { setGroupSetting, clearGroupSetting } = groupSettingSlice.actions;
export const groupSettingReducer = groupSettingSlice.reducer;
export default groupSettingSlice;
