import { configureStore } from '@reduxjs/toolkit'
import { advanceMessageReducer } from './advance-messages-toggle-slice'
import { settingReducer } from './setting-slice'

const store = configureStore({
  reducer: {
    advanceMessage: advanceMessageReducer,
    setting: settingReducer,
  },
})
export type ApplicationState = ReturnType<typeof store.getState>
export type ApplicationDispatch = typeof store.dispatch
export default store
