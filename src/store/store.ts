import { configureStore } from '@reduxjs/toolkit';

import { currentConversationReducer } from './current-conversation-slice';
import { rightMenuReducer } from './right-menu-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';
import { friendBoxReducer } from './friend-box-slice';
import { currentTabReducer } from './current-menu-slice';
import { openConversationReducer } from './open-covnersation-slice';
import { openCallModalReducer } from './open-call-modal';
import { contactsReducer } from './contacts-slice';
import { selectedMessageReducer } from './selectedMessage-slice';
import { bouncingReducer } from './bouncing-slice';

const store = configureStore({
  reducer: {
    setting: settingReducer,
    rightMenu: rightMenuReducer,
    socketId: socketIdReducer,
    currentConversation: currentConversationReducer,
    friendBox: friendBoxReducer,
    currentTab: currentTabReducer,
    openconversation: openConversationReducer,
    openCallModal: openCallModalReducer,
    contacts: contactsReducer,
    selectedMessage: selectedMessageReducer,
    bouncing: bouncingReducer
  },
});
export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
