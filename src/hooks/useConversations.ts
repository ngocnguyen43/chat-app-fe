import { useQuery } from 'react-query';

import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';
import { Storage } from '../service/LocalStorage';
export type Conversation = {
  conversationId: string
  name: string
  creator: string | null
  isGroup: boolean
  avatar: string
  createdAt: string
  lastMessage: string
  lastMessageAt: string
  isLastMessageSeen: boolean
}
export function useConversation() {
  const { axios } = useAxios()
  const { id: socket } = useAppSelector((state) => state.socketId)
  const id = Storage.Get("key")

  const getConversations = () => {
    return axios.get<Conversation[] | []>(
      `http://localhost:6101/conversations/${id || socket}`
    )
  }
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['get-conversations', id],
    queryFn: getConversations,
    refetchOnWindowFocus: false,
  })
  return { data: data?.data, isLoading, error, isFetching }
}
