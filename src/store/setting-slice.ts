import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import Redux from 'react-redux'
type SettingState = {
  isSettingOpen: boolean
}
const initialState: SettingState = {
  isSettingOpen: false,
}
const settingSlice = createSlice({
  name: 'setting-slice',
  initialState,
  reducers: {
    setSettingOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingOpen = action.payload
    },
  },
})
export const { setSettingOpen } = settingSlice.actions
export const settingReducer = settingSlice.reducer
export default settingSlice
