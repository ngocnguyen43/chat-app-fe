import { useMutation } from 'react-query';

import useAxios from './useAxios';
import { env } from '../config';

type Message = {
  "id": string,
  "conversation": string
  "time": string
  "message": {
    "type": "text" | "image" | "video",
    "content": string
  }[],
  "sender": string
}
export function useCreateMessage() {
  const { axios } = useAxios()
  return useMutation({
    mutationFn: async (data: Message) => {
      return axios.post(`${env.BACK_END_URL}/message`, data)
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}
