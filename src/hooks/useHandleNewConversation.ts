import { v4 } from 'uuid';
import { MessageDataType, MessageQueryType } from '../@types';
import { queryClient } from '../service';
import { socket } from '../service/socket';
import {
  setShowBouncing,
  updateLastMessage,
  addConversations,
  setCurrentConversation,
  rollbackConversations,
} from '../store';
import { clearNewConversation } from '../store/new-conversation-slice';
import { setTempMessage } from '../store/temp-message-slice';
import { getCurrentUnixTimestamp } from '../utils';
import { useAppSelector } from './useAppSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { Storage } from '../service/LocalStorage';
import { useAppDispatch } from './useAppDispatch';
import { useCreateConversation } from './useCreateConversation';
import { useCallback } from 'react';

export function useHandleConversation() {
  const location = useLocation();
  const path = location.pathname.split('/');
  const currentConversation = path.at(-1) as string;
  const { id, name, participants, isGroup } = useAppSelector((state) => state.newConversation);
  const { mutate: mutateConversation } = useCreateConversation();
  const navigate = useNavigate();
  const userId = Storage.Get('_k') as string;
  const dispatch = useAppDispatch();
  const handle = useCallback(
    (data: PartialBy<MessageDataType, 'lastMessage'>) => {
      const { message, lastMessage } = data;
      const messageId = v4();
      if (!(name && id)) {
        queryClient.setQueryData(['get-messages', currentConversation], (oldData: MessageQueryType) => {
          const [first, ...rest] = oldData.pages;
          console.log(oldData);

          const messagesData = [
            {
              messageId,
              message,
              sender: userId,
              recipients: [],
              isDeleted: false,
              createdAt: Date.now().toString(),
              group: getCurrentUnixTimestamp(),
            },
            ...first.messages,
          ];

          return {
            ...oldData,
            pages: [
              {
                ...first,
                messages: [...messagesData],
              },
              ...rest,
            ],
          };
        });
        dispatch(setShowBouncing(false));
        socket.emit('private message', {
          id: messageId,
          conversation: currentConversation,
          time: Date.now().toString(),
          message,
          sender: userId,
        });
        dispatch(
          updateLastMessage({
            id: currentConversation,
            lastMessage: lastMessage || message[0].content,
            lastMessageAt: Date.now().toString(),
            isLastMessageSeen: true,
            totalUnreadMessages: 0,
          }),
        );
      } else {
        console.log(true);
        const createdAt = Date.now().toString();
        queryClient.setQueryData(['get-messages', id], () => {
          const messagesData = [
            {
              messageId,
              message,
              sender: userId,
              recipients: [],
              isDeleted: false,
              createdAt: Date.now().toString(),
              group: getCurrentUnixTimestamp(),
            },
          ];

          return {
            pageParams: [''],
            pages: [
              {
                conversationId: id,
                hasNextPage: false,
                messages: [...messagesData],
              },
            ],
          };
        });
        dispatch(
          addConversations({
            conversationId: id,
            name,
            isGroup,
            isLastMessageSeen: false,
            createdAt,
            creator: null,
            lastMessage: lastMessage || message[0].content,
            lastMessageAt: createdAt,
            status: 'offline',
            totalUnreadMessages: 0,
            participants,
            state: undefined,
          }),
        );
        dispatch(
          setTempMessage({
            messageId,
            message,
            sender: userId,
            recipients: [],
            isDeleted: false,
            createdAt: Date.now().toString(),
            group: getCurrentUnixTimestamp(),
          }),
        );
        dispatch(
          setCurrentConversation({
            id,
            name,
            isGroup,
            participants,
            isOnline: false,
            state: undefined,
          }),
        );
        dispatch(clearNewConversation());
        mutateConversation(
          { id, recipient: participants.find((i) => i.id !== userId)!.id, sender: userId },
          {
            onError: () => {
              dispatch(rollbackConversations());
              dispatch(clearNewConversation());
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['get-messages', id],
              });
              socket.emit('private message', {
                id: messageId,
                conversation: id,
                time: Date.now().toString(),
                message,
                sender: userId,
              });
              navigate('../' + id);
            },
          },
        );
      }
    },
    [currentConversation, dispatch, id, isGroup, mutateConversation, name, navigate, participants, userId],
  );
  return handle;
}
