import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';
import { useAppDispatch } from './useAppDispatch';
import { setAuthError } from '../store';

export function useBlockUser() {
  const { axios } = useAxios();
  const { id } = useAppSelector((state) => state.currentConversation);
  const dispatch = useAppDispatch()
  const { entity: { userId } } = useAppSelector(state => state.information)
  return useMutation({
    mutationFn: async ({ target, type }: { target: string; type: 'block' | 'unblock' }) => {
      return axios.post(`${env.BACK_END_URL}/users/${userId}/block`, {
        target,
        conversation: id,
        type,
      });
    },
    onError: () => {
      dispatch(setAuthError(true))
    }
  },);
}
