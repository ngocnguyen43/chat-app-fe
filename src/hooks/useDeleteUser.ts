import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import { delay } from '../utils';
import useAxios from './useAxios';

export function useDeleteUser() {
  const { axios } = useAxios();
  const navigate = useNavigate();
  const id = Storage.Get('_k');
  return useMutation({
    mutationFn: async () => {
      await delay(1000);
      return axios.delete(`${env.BACK_END_URL}/user?id=${id}`);
    },
    onSuccess: () => {
      Storage.Clear();
      navigate('/');
    },
    onError: () => {
      console.clear();
    },
  });
}
