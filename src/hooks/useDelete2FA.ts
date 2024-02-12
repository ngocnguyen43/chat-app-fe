import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useFetch2FA } from './useFetch2FA';
import { useAppSelector } from './useAppSelector';

export function useDelete2FA() {
  const { axios } = useAxios();
  const {
    entity: { email },
  } = useAppSelector((state) => state.information);
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
