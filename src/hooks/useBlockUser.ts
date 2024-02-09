import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';

export function useBlockUser() {
  const { axios } = useAxios();
  const { id } = useAppSelector((state) => state.currentConversation);
  return useMutation({
    mutationFn: async ({ blocker, user, type }: { blocker: string; user: string; type: 'block' | 'unblock' }) => {
      return axios.post(`${env.BACK_END_URL}/user/block`, {
        blocker,
        user,
        conversation: id,
        type,
      });
    },
  });
}
