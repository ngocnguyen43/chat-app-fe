/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';

export const useSetTheme = () => {
  const id = Storage.Get('_k');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (theme: string) => {
      return await axios.post(env.BACK_END_URL + '/user/theme', {
        theme,
        id,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['get-theme'] });
    },
  });
};
