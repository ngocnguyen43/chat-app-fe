import { useMutation } from '@tanstack/react-query';

import useAxios from './useAxios';
import { env } from '../config';

export function useDeleteMsgs() {
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (data: string[]) => {
      const body = new URLSearchParams({
        ids: JSON.stringify(data),
      });
      return axios.patch(
        `${env.BACK_END_URL}/messages`,
        body,
        // {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // }
      );
    },
  });
}
