import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { MessageDataType, MessageQueryType } from '../@types';
import { queryClient } from '../service';
import { socket } from '../service/socket';
import { addConversations, setCurrentConversation, setShowBouncing, updateLastMessage } from '../store';
import { clearNewConversation, setNewConversation } from '../store/new-conversation-slice';
import { clearParticipants } from '../store/participants-slice';
import { persistor } from '../store/store';
import { setTempMessage } from '../store/temp-message-slice';
import { getCurrentUnixTimestamp } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useCreateGroup } from './useCreateGroup';

export function useHandleNewGroup() {
  const { entities: conversations } = useAppSelector((state) => state.conversations);
  const { entities: newParticipants } = useAppSelector((state) => state.participants);
  const {
    entity: { profile },
  } = useAppSelector((state) => state.information);
  let userAvatar: string;
  if (profile) {
    const { avatar: tempAvatar } = profile;
    userAvatar = tempAvatar;
  }
  const { id } = useAppSelector((state) => state.newConversation);
  const { mutate: creategroup } = useCreateGroup();
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handle = useCallback(
    (data: PartialBy<MessageDataType, 'lastMessage'>) => {
      const { message, lastMessage } = data;
      const messageId = v4();
      if (newParticipants.length === 1) {
        const exist = conversations.find(
          (c) => !c.isGroup && c.participants.some((p) => p.id === newParticipants[0].id),
        );
        if (!exist) {
          const newId = v4();
          // const {
          //   data,
          //   id: userId,
          //   label,
          // } = item as unknown as { data: string; id: string; label: string; value: string };
          persistor.purge();
          dispatch(
            setNewConversation({
              id: newId,
              name: newParticipants.map((i) => i.name).join(' '),
              participants: newParticipants
                .map((i) => ({ id: i.id, avatar: i.data, fullName: i.label, isActive: true }))
                .concat({ id: userId, avatar: userAvatar, fullName: '', isActive: true }),
              isGroup: false,
              isOnline: false,
            }),
          );
          dispatch(
            setTempMessage({
              messageId,
              message,
              sender: userId,
              recipients: [],
              _count: {
                MessageReaction: 0,
              },
              isDeleted: false,
              createdAt: Date.now().toString(),
              group: getCurrentUnixTimestamp(),
            }),
          );
        } else {
          // loiii
          queryClient.setQueryData(['get-messages', exist.conversationId], (oldData: MessageQueryType) => {
            const [first, ...rest] = oldData.pages;
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
          // socket.emit('private message', {
          //   id: messageId,
          //   conversation: currentConversation,
          //   time: Date.now().toString(),
          //   message: [
          //     {
          //       type: 'text',
          //       content: text,
          //     },
          //   ],
          //   sender: userId,
          // });

          socket.emit('private message', {
            id: messageId,
            conversation: exist.conversationId,
            time: Date.now().toString(),
            message,
            sender: userId,
          });
          dispatch(
            updateLastMessage({
              id: exist.conversationId,
              lastMessage: message[0].content,
              lastMessageAt: Date.now().toString(),
              isLastMessageSeen: true,
              totalUnreadMessages: 0,
            }),
          );
          navigate('../' + exist.conversationId);
        }
      } else {
        const newId = v4();
        const createdAt = Date.now().toString();
        queryClient.setQueryData(['get-messages', id], () => {
          const messagesData = [
            {
              messageId,
              message,
              sender: userId,
              recipients: [],
              _count: {
                MessageReaction: 0,
              },
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
            conversationId: newId,
            name: newParticipants.map((i) => i.name).join(' '),
            isGroup: true,
            isLastMessageSeen: false,
            createdAt,
            creator: userId,
            lastMessage: lastMessage || message[0].content,
            lastMessageAt: createdAt,
            status: 'offline',
            totalUnreadMessages: 0,
            participants: newParticipants
              .map((i) => ({ id: i.id, avatar: i.data, fullName: i.label, isActive: true }))
              .concat({ id: userId, avatar: userAvatar, fullName: '', isActive: true }),
            state: undefined,
          }),
        );
        dispatch(
          setTempMessage({
            messageId,
            message,
            sender: userId,
            recipients: [],
            _count: {
              MessageReaction: 0,
            },
            isDeleted: false,
            createdAt: Date.now().toString(),
            group: getCurrentUnixTimestamp(),
          }),
        );
        dispatch(
          setCurrentConversation({
            id: newId,
            name: newParticipants.map((i) => i.name).join(' '),
            isGroup: true,
            participants: newParticipants
              .map((i) => ({ id: i.id, avatar: i.data, fullName: i.label, isActive: true }))
              .concat({ id: userId, avatar: userAvatar, fullName: '', isActive: true }),
            isOnline: false,
            state: undefined,
          }),
        );
        creategroup(
          { id: newId, user: newParticipants.filter((i) => i.id !== userId).map((i) => i.id) },
          {
            onSuccess: () => {
              socket.emit('private message', {
                id: messageId,
                conversation: newId,
                time: Date.now().toString(),
                message,
                sender: userId,
              });
              dispatch(clearNewConversation());
              dispatch(clearParticipants());
              navigate('../' + newId);
            },
          },
        );
      }
    },
    [conversations, creategroup, dispatch, id, navigate, newParticipants, userId],
  );
  return handle;
}
