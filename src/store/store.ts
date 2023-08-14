import { configureStore } from '@reduxjs/toolkit';

import { advanceMessageReducer } from './advance-messages-slice';
import { currentConversationReducer } from './current-conversation-slice';
import { rightMenuReducer } from './right-menu-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';
import { friendBoxReducer } from './friend-box-slice';
import { currentTabReducer } from './current-menu-slice';
import { openConversationReducer } from './open-covnersation-slice';

const store = configureStore({
  reducer: {
    advanceMessage: advanceMessageReducer,
    setting: settingReducer,
    rightMenu: rightMenuReducer,
    socketId: socketIdReducer,
    currentConversation: currentConversationReducer,
    friendBox: friendBoxReducer,
    currentTab: currentTabReducer,
    openconversation: openConversationReducer
  },
})
export type ApplicationState = ReturnType<typeof store.getState>
export type ApplicationDispatch = typeof store.dispatch
export default store
