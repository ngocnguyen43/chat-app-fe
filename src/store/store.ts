import { configureStore } from '@reduxjs/toolkit';

import { advanceMessageReducer } from './advance-messages-slice';
import { currentConversationReducer } from './current-conversation-slice';
import { rightMenuReducer } from './right-menu-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';

const store = configureStore({
  reducer: {
    advanceMessage: advanceMessageReducer,
    setting: settingReducer,
    rightMenu: rightMenuReducer,
    socketId: socketIdReducer,
    currentConversation: currentConversationReducer
  },
})
export type ApplicationState = ReturnType<typeof store.getState>
export type ApplicationDispatch = typeof store.dispatch
export default store
