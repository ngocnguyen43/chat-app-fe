import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service';
import useAxios from './useAxios';

export function useUpdateFullName() {
  const { axios } = useAxios();
  const id = Storage.Get('_k');

  return useMutation({
    mutationFn: async (name: string) => {
      return await axios.post(`${env.BACK_END_URL}/user/profile/fullname`, {
        id,
        name,
      });
    },
  });
}
