import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';

type Message = {
  id: string;
  conversation: string;
  time: string;
  message: {
    type: 'text' | 'image' | 'video';
    content: string;
  }[];
  sender: string;
};
export function useMutateMessage() {
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (data: Message) => {
      return axios.post(`${env.BACK_END_URL}/message`, data);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
