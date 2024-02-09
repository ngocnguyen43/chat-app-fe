import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';

export function useUnblockUser() {
  const { axios } = useAxios();
  const { id } = useAppSelector((state) => state.currentConversation);
  return useMutation({
    mutationFn: async ({ blocker, user }: { blocker: string; user: string }) => {
      return axios.post(`${env.BACK_END_URL}/user/unblock`, {
        blocker,
        user,
        conversation: id,
        type: 'unblock',
      });
    },
  });
}
