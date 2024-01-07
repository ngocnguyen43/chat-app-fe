/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { useMutation } from 'react-query';

import { startAuthentication } from '@simplewebauthn/browser';

import { useWebAuthnLoginVerification } from './useWebAuthnLoginVerification';
import { env } from '../config';

export const useWebAuthnLoginOptions = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: _mutate } = useWebAuthnLoginVerification()
  return useMutation({
    mutationFn: async (email: string) => {
      return axios.post(
        `${env.BACK_END_URL}/auth/webauth-login-options`,
        {
          email
        }
      )
    },
    onSuccess: async (data) => {
      const options = data.data
      console.log(options)
      const loginRes = await startAuthentication(options)
      // const request = {
      //   email: 'minhngocx2003.403@gmail.com',
      //   data: loginRes,
      // }
      // mutate(request)
      console.log(loginRes)
    },
  })
}
