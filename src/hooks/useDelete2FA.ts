import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import useAxios from './useAxios';
import { useFetch2FA } from './useFetch2FA';

export function useDelete2FA() {
  const { axios } = useAxios();
  const email = Storage.Get('_e') as string;
  const { refetch } = useFetch2FA();
  return useMutation({
    mutationFn: async () => {
      const searhcParams = new URLSearchParams({ email });
      return axios.delete(`${env.BACK_END_URL}/auth/mf-otps?${searhcParams.toString() ?? ''}`);
    },
    onSuccess: () => {
      refetch();
    },
  });
}
