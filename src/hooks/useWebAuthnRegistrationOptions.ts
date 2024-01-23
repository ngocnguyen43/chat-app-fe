/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { startRegistration } from '@simplewebauthn/browser';

import { useWebAuthnRegistrationVerification } from './useWebAuthnRegistrationVerification';
import { env } from '../config';

export const useWebAuthnRegistrationOptions = () => {
  const { mutate } = useWebAuthnRegistrationVerification();
  return useMutation({
    mutationFn: async () => {
      return axios.post(`${env.BACK_END_URL}/auth/webauth-registration-options`, {
        email: 'test1@gmail.com',
      });
    },
    onSuccess: async (data) => {
      const options = data?.data;
      options.authenticatorSelection.residentKey = 'required';
      options.authenticatorSelection.requireResidentKey = true;
      options.extensions = {
        credProps: true,
      };
      const loginRes = await startRegistration(options);
      console.log(loginRes);
      mutate({ user: { email: 'test1@gmail.com' }, loginRes });
    },
  });
};
