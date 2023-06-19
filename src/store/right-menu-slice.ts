import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type RightMenuState = {
  isRMenuOpen: boolean
}
const initialState: RightMenuState = {
  isRMenuOpen: false,
}
const rightMenuSlice = createSlice({
  name: 'right-menu-slice',
  initialState,
  reducers: {
    setRMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isRMenuOpen = action.payload
    },
  },
})

export const { setRMenuOpen } = rightMenuSlice.actions
export const rightMenuReducer = rightMenuSlice.reducer
export default rightMenuSlice
