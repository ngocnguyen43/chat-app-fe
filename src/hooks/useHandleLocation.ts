import { useCallback } from 'react';
import { MessageQueryType } from '../@types';
import { queryClient } from '../service';
import { v4 } from 'uuid';
import { useAppSelector } from './useAppSelector';
import { getCurrentUnixTimestamp } from '../utils';
import { socket } from '../service/socket';

export default function useHandleLocation() {
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const { id: currentConversation } = useAppSelector((state) => state.currentConversation);
  return useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        // setCurrentLocation({ ...currentLocation, lat: data.coords.latitude, lgn: data.coords.longitude })
        const messageId = v4();
        queryClient.setQueryData(['get-messages', currentConversation], (oldData: MessageQueryType) => {
          const [first, ...rest] = oldData.pages;

          const messagesData = [
            {
              messageId,
              message: [{ type: 'coordinate', content: { lat: data.coords.latitude, long: data.coords.longitude } }],
              sender: userId,
              recipients: [],
              isDeleted: false,
              _count: {
                MessageReaction: 0,
              },
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
        socket.emit('private message', {
          id: messageId,
          conversation: currentConversation,
          time: Date.now().toString(),
          message: [{ type: 'coordinate', content: { lat: data.coords.latitude, long: data.coords.longitude } }],
          sender: userId,
        });
      });
    } else {
      console.log('Geolocation not supported');
    }
  }, [currentConversation, userId]);
}
