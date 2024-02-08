import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authOptionsReducer } from './auth-options-slice';
import { authStatusReducer } from './auth-status-slice';
import { bouncingReducer } from './bouncing-slice';
import { contactsReducer } from './contacts-slice';
import { conversationsReducer } from './conversations-slice';
import { currentConversationReducer } from './current-conversation-slice';
import { errorReducer } from './error-slice';
import { fakeReducer } from './fake-slice';
import { messagesReducer } from './messages-slice';
import { mfaSetupReducer } from './MFA-setup-slice';
import { openCallModalReducer } from './open-call-modal';
import { callBoxReducer } from './open-call-slice';
import { providerReducer } from './provider-slice';
import { selectedMessageReducer } from './selected-Message-slice';
import { settingReducer } from './setting-slice';
import { socketIdReducer } from './socket-id-slide';
import { accountReducer } from './account-slice';
import { avatarReducer } from './avatar-slice';
import { newConversationReducer } from './new-conversation-slice';
import { tempMessageReducer } from './temp-message-slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { tempFilesUrlReducer } from './temp-files-slice';
import { participantsReducer } from './participants-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentConversation', 'currentConversation.participants'],
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
    }),
  ],
};

const rootReducer = combineReducers({
  setting: settingReducer,
  socketId: socketIdReducer,
  currentConversation: currentConversationReducer,
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
  tempFileUrls: tempFilesUrlReducer,
  participants: participantsReducer,
  fake: fakeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type ApplicationState = ReturnType<typeof rootReducer>;
export type ApplicationDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
