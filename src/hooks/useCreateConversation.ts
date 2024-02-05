/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';

export interface ICreateConversation {
  id: string;
  sender: string;
  recipient: string;
}
export const useCreateConversation = () => {
  return useMutation({
    mutationFn: async (dto: ICreateConversation) => {
      return await axios.post(env.BACK_END_URL + '/conversation', dto);
    },
    // onError: (error) => {
    //     return error
    // },
  });
};
