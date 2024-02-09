/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';

export interface ICreateGroup {
  id: string;
  user: string[];
}
export const useCreateGroup = () => {
  const { axios } = useAxios();

  return useMutation({
    mutationFn: async (dto: ICreateGroup) => {
      return await axios.post(env.BACK_END_URL + '/conversation/group', dto);
    },
    // onError: (error) => {
    //     return error
    // },
  });
};
