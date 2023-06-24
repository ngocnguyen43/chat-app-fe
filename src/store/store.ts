import { configureStore } from '@reduxjs/toolkit'
import { advanceMessageReducer } from './advance-messages-slice'
import { settingReducer } from './setting-slice'
import { rightMenuReducer } from './right-menu-slice'

const store = configureStore({
  reducer: {
    advanceMessage: advanceMessageReducer,
    setting: settingReducer,
    rightMenu: rightMenuReducer,
  },
})
export type ApplicationState = ReturnType<typeof store.getState>
export type ApplicationDispatch = typeof store.dispatch
export default store
