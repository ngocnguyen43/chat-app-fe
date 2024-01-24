/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { startAuthentication } from '@simplewebauthn/browser';

import { useWebAuthnLoginVerification } from './useWebAuthnLoginVerification';
import { env } from '../config';
import React from 'react';
import { UserContext } from '../store/context';

export const useWebAuthnLoginOptions = () => {
  const { mutate } = useWebAuthnLoginVerification();
  const { user } = React.useContext(UserContext);
  return useMutation({
    mutationFn: async (email: string) => {
      return axios.post(`${env.BACK_END_URL}/auth/webauth-login-options`, {
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
