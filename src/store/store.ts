import { configureStore } from '@reduxjs/toolkit';

import { currentConversationReducer } from './current-conversation-slice';
import { rightMenuReducer } from './right-menu-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';
import { friendBoxReducer } from './friend-box-slice';
import { openConversationReducer } from './open-covnersation-slice';
import { openCallModalReducer } from './open-call-modal';
import { contactsReducer } from './contacts-slice';
import { selectedMessageReducer } from './selectedMessage-slice';
import { bouncingReducer } from './bouncing-slice';
import { callBoxReducer } from './open-call-slice';

const store = configureStore({
  reducer: {
    setting: settingReducer,
    rightMenu: rightMenuReducer,
    socketId: socketIdReducer,
    currentConversation: currentConversationReducer,
    friendBox: friendBoxReducer,
    openconversation: openConversationReducer,
    openCallModal: openCallModalReducer,
    contacts: contactsReducer,
    selectedMessage: selectedMessageReducer,
    bouncing: bouncingReducer,
    callBox: callBoxReducer
  },
});
export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
