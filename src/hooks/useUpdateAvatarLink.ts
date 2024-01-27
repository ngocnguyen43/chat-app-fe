import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service';
import useAxios from './useAxios';

export function useUpdateAvatarLink() {
  const { axios } = useAxios();
  const id = Storage.Get('_k');

  return useMutation({
    mutationFn: async (url: string) => {
      return await axios.post(`${env.BACK_END_URL}/user/profile`, {
        id,
        avatar: url,
      });
    },
  });
}
