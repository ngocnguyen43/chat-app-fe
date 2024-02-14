import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { delay } from '../utils';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';

export const useValidate2FA = () => {
  const { email } = useAppSelector((state) => state.account);
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (token: string) => {
      await delay(1000);
      return await axios.post(env.BACK_END_URL + '/auth/validate-otp', {
        email,
        token,
      });
    },
  });
};
