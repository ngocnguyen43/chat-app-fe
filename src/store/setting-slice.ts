import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import Redux from 'react-redux'
type SettingState = {
  type: "none" | "general" | "advance" | "delete" | "account";
};
const initialState: SettingState = {
  type: "none",
};
const settingSlice = createSlice({
  name: 'setting-slice',
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<"none" | "general" | "advance" | "delete" | "account">) => {
      state.type = action.payload;
    },
    clearSetting: (state) => {
      state.type = "none"
    }
  },
});
export const { setSetting, clearSetting } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;
export default settingSlice;
