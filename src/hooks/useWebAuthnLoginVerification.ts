/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { env } from '../config';

export const useWebAuthnLoginVerification = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return axios.post(`${env.BACK_END_URL}/auth/webauth-login-verification`, {
        email: data.email,
        data: data.data,
      });
    },
  });
};
