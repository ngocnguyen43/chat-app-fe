import { useQuery } from 'react-query';

import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';
import { Storage } from '../service/LocalStorage';
export type ConversationType = {
  "conversationId": string,
  "name": string,
  "creator": string | null,
  "isGroup": boolean,
  "avatar": string,
  "createdAt": string,
  "lastMessage": string,
  "lastMessageAt": string,
  "isLastMessageSeen": boolean,
  "status": "offline" | "online",
  "totalUnreadMessages": number,
  "participants":
  {
    "id": string,
  }[]
}
export function useConversation() {
  const { axios } = useAxios()
  const { id: socket } = useAppSelector((state) => state.socketId)
  const id = Storage.Get("key")

  const getConversations = () => {
    return axios.get<ConversationType[] | []>(
      `http://localhost:6101/conversations/${id || socket}`,

    )
  }
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['get-conversations', id],
    queryFn: getConversations,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
    // cacheTime: 1000 * 5,
    // refetchInterval: 1000 * 10,
  })
  return { data: data?.data, isLoading, error, isFetching }
}
