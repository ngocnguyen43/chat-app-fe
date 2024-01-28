import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { delay } from '../utils';
import { useAppSelector } from './useAppSelector';

export const useValidate2FA = () => {
  const { email } = useAppSelector((state) => state.account);
  return useMutation({
    mutationFn: async (token: string) => {
      await delay(1000);
      return await axios.post(env.BACK_END_URL + '/auth/verify-otp', {
        email,
        token,
      });
    },
  });
};
