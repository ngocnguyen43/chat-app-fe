/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { LoginResponse } from '../@types';
import { env } from '../config';

export const useWebAuthnLoginVerification = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.post<LoginResponse>(`${env.BACK_END_URL}/auth/webauth-login-verification`, {
        email: data.email,
        data: data.data,
      });
    },
    onSuccess: () => {
      // const { id, access_token: ACT } = data.data;
      // dispatch(setId(id));
      // Storage.Set<string>('_k', id);
      // Storage.Set<string>('_a', ACT);
      navigate('/me');
    },
  });
};
