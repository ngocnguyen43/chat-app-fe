import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export function useUpdateProfile() {
  const { axios } = useAxios();
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);

  return useMutation({
    mutationFn: async (body: Partial<{ email: string; bio: string; fullName: string }>) => {
      return await axios.post(`${env.BACK_END_URL}/users/${id}/profile`, {
        id,
        ...body,
      });
    },
  });
}
