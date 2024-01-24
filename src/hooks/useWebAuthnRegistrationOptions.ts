/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { startRegistration } from '@simplewebauthn/browser';

import { useWebAuthnRegistrationVerification } from './useWebAuthnRegistrationVerification';
import { env } from '../config';
import { Storage } from '../service';

export const useWebAuthnRegistrationOptions = () => {
  const { mutate } = useWebAuthnRegistrationVerification();
  const email = Storage.Get("_e") as string
  return useMutation({
    mutationFn: async () => {
      return axios.post(`${env.BACK_END_URL}/auth/webauth-registration-options`, {
        email,
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
      mutate({ user: { email }, loginRes });
    },
  });
};
