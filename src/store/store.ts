import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {},
})
export type ApplicationState = ReturnType<typeof store.getState>
export type ApplicationDispatch = typeof store.dispatch
export default store
