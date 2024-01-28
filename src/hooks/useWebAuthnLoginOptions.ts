/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import React from 'react';

import { startAuthentication } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { UserContext } from '../store/context';
import { useWebAuthnLoginVerification } from './useWebAuthnLoginVerification';

export const useWebAuthnLoginOptions = () => {
  const { mutate } = useWebAuthnLoginVerification();
  const { user } = React.useContext(UserContext);
  return useMutation({
    mutationFn: async (email: string) => {
      return await axios.post(`${env.BACK_END_URL}/auth/webauth-login-options`, {
        email,
      });
    },
    onSuccess: async (data) => {
      const options = data.data;
      const loginRes = await startAuthentication(options);
      const request = {
        email: user,
        data: loginRes,
      };
      mutate(request);
    },
    onError: () => {
      alert('Authentiaction failed!');
    },
  });
};
