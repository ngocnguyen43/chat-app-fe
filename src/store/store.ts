import { configureStore } from '@reduxjs/toolkit';

import { authOptionsReducer } from './auth-options-slice';
import { authStatusReducer } from './auth-status-slice';
import { bouncingReducer } from './bouncing-slice';
import { contactsReducer } from './contacts-slice';
import { conversationsReducer } from './conversations-slice';
import { currentConversationReducer } from './current-conversation-slice';
import { errorReducer } from './error-slice';
import { fakeReducer } from './fake-slice';
import { friendBoxReducer } from './friend-box-slice';
import { messagesReducer } from './messages-slice';
import { mfaSetupReducer } from './MFA-setup-slice';
import { openCallModalReducer } from './open-call-modal';
import { callBoxReducer } from './open-call-slice';
import { openConversationReducer } from './open-covnersation-slice';
import { providerReducer } from './provider-slice';
import { selectedMessageReducer } from './selected-Message-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';
import { accountReducer } from './account-slice';
import { avatarReducer } from './avatar-slice';
import { newConversationReducer } from './new-conversation-slice';
import { tempMessageReducer } from './temp-message-slice';

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
    mfaSetupBox: mfaSetupReducer,
    account: accountReducer,
    avatar: avatarReducer,
    newConversation: newConversationReducer,
    tempMessage: tempMessageReducer,
    fake: fakeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
