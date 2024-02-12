import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export function useUpdateAvatarLink() {
  const { axios } = useAxios();
  const { entity: { userId: id } } = useAppSelector(state => state.information);

  return useMutation({
    mutationFn: async (url: string) => {
      return await axios.post(`${env.BACK_END_URL}/user/profile`, {
        id,
        avatar: url,
      });
    },
  });
}
