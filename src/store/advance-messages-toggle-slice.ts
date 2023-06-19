import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AdvanceMessageToggleState = {
  isOpen: boolean
}
const initialState: AdvanceMessageToggleState = {
  isOpen: false,
}
const advanceMessageSlice = createSlice({
  name: 'advance-message',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})
export const advanceMessageReducer = advanceMessageSlice.reducer
export const { setOpen } = advanceMessageSlice.actions
export default advanceMessageSlice
