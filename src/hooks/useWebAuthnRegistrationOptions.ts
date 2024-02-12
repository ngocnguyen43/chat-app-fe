/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';

import { startRegistration } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useWebAuthnRegistrationVerification } from './useWebAuthnRegistrationVerification';
import { useAppSelector } from './useAppSelector';

export const useWebAuthnRegistrationOptions = () => {
  const { mutate } = useWebAuthnRegistrationVerification();
  const { entity: { email } } = useAppSelector(state => state.information)
  return useMutation({
    mutationFn: async () => {
      return await axios.post(`${env.BACK_END_URL}/auth/webauth-registration-options`, {
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
