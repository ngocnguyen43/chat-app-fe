import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export function useDeleteMsgs() {
  const { axios } = useAxios();
  const { entity: { userId } } = useAppSelector(state => state.information)
  return useMutation({
    mutationFn: async ({ data, indexes }: { data: string[]; indexes: number[] }) => {
      const body = new URLSearchParams({
        ids: JSON.stringify(data),
        includeLastMessage: JSON.stringify(indexes.includes(0)),
      });
      return axios.patch(
        `${env.BACK_END_URL}/conversations/${userId}/messages`,
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
