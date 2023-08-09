import { useQuery } from 'react-query';

import useAxios from './useAxios';

// "messageId": "5d367e92-7c0a-4163-a9c4-1b2afef88d1c",
// "conversationId": "d0312b62-7093-4323-9077-10b543763328",
// "type": "text",
// "content": "asasasa",
// "sender": "25de4f3b-dcff-466c-8f2e-b6a09af80198",
// "recipients": [],
// "isDeleted": false,
// "createdAt": "1691459104241"
export type Message = {
  messageId: string
  conversationId: string
  type: 'text' | unknown
  content: string
  sender: string
  recipients?: string[]
  isDeleted?: boolean
  createdAt: string
  showAvatar?: boolean
}
export function useFetchMessage(id: string) {
  const { axios } = useAxios()
  const getMessages = () => {
    return axios.get<Message[] | []>(`http://localhost:6101/conversation/${id}`)
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ['get-messages', id],
    queryFn: getMessages,
    // enabled: false,
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
  return { data: data?.data, error, isLoading }
}
