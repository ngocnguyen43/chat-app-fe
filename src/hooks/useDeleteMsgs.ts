import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';

export function useDeleteMsgs() {
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async ({ data, indexes }: { data: string[], indexes: number[] }) => {
      const body = new URLSearchParams({
        ids: JSON.stringify(data),
        includeLastMessage: JSON.stringify(indexes.includes(0))
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
