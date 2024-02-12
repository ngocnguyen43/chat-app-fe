/* eslint-disable @typescript-eslint/require-await */

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { env } from '../config';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';

export const useSetTheme = () => {
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (theme: string) => {
      return await axios.post(env.BACK_END_URL + `/users/${id}/theme`, {
        theme,
        id,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['get-theme'] });
    },
  });
};
