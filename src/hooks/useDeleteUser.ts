import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export function useDeleteUser() {
  const { axios } = useAxios();
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);
  return useMutation({
    mutationFn: async () => {
      return axios.delete(`${env.BACK_END_URL}/users/${id}`);
    },
    onSuccess: () => {
      Storage.Clear();
      const e = document.getElementsByTagName('body');
      if (e.length > 0) {
        e[0].setAttribute('data-theme', 'light');
      }
      window.location.href = '/signin';
    },
    onError: () => {
      console.clear();
    },
  });
}
