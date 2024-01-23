import { configureStore } from '@reduxjs/toolkit';

import { currentConversationReducer } from './current-conversation-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';
import { friendBoxReducer } from './friend-box-slice';
import { openConversationReducer } from './open-covnersation-slice';
import { openCallModalReducer } from './open-call-modal';
import { contactsReducer } from './contacts-slice';
import { selectedMessageReducer } from './selectedMessage-slice';
import { bouncingReducer } from './bouncing-slice';
import { callBoxReducer } from './open-call-slice';
import { messagesReducer } from './messages-slice';
import { conversationsReducer } from './conversations-slice';
import { errorReducer } from './error-slice';
import { providerReducer } from './provider-slice';
import { authOptionsReducer } from './auth-options-slice';
import { authStatusReducer } from './auth-status-slice';
import { fakeReducer } from './fake-slice';

const store = configureStore({
  reducer: {
    setting: settingReducer,
    socketId: socketIdReducer,
    currentConversation: currentConversationReducer,
    friendBox: friendBoxReducer,
    openconversation: openConversationReducer,
    openCallModal: openCallModalReducer,
    contacts: contactsReducer,
    selectedMessage: selectedMessageReducer,
    bouncing: bouncingReducer,
    callBox: callBoxReducer,
    messages: messagesReducer,
    conversations: conversationsReducer,
    error: errorReducer,
    provider: providerReducer,
    authOptions: authOptionsReducer,
    authStatus: authStatusReducer,
    fake: fakeReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
