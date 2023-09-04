import { useMutation } from 'react-query';

import useAxios from './useAxios';

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
      return axios.post('http://localhost:6101/message', data)
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}
