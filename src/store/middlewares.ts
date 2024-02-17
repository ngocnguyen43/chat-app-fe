import { createListenerMiddleware } from '@reduxjs/toolkit';
import { fetchConversationsThunk } from './conversations-slice';
import { ApplicationState } from './store';
import { setCurrentConversation } from './current-conversation-slice';

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: fetchConversationsThunk.fulfilled,
  effect: (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    //   console.log('Todo added: ', action.payload)
    listenerApi.cancelActiveListeners();
    const {
      information: {
        entity: { userId },
      },
      contacts,
    } = listenerApi.getState() as ApplicationState;
    const conversations = action.payload;
    if (!conversations.length) {
      return;
    }
    const pathname = window.location.pathname.split('/');
    const path = pathname.at(-1);
    if (pathname.length < 3 || path?.length !== 36) {
      return;
    }

    const existConversation = conversations.find((c) => c.conversationId === path);
    const existContacts = contacts.entities.find((c) => c.userId === userId);
    if (!existConversation) {
      return;
    }
    const { participants, isGroup, conversationId, state } = existConversation;
    // Can cancel other running instances
    listenerApi.dispatch(
      setCurrentConversation({
        id: conversationId,
        participants: participants.filter((p) => p.id !== userId),
        isGroup,
        state,
        name: participants
          .filter((p) => p.id !== userId)
          .map((p) => p.fullName)
          .join(' '),
        isOnline: existContacts && existContacts.status === 'online',
      }),
    );
    // Run async logic
  },
});
