import axios from 'axios';
import { useMutation } from 'react-query';

import { startAuthentication } from '@simplewebauthn/browser';

import { useWebAuthnLoginVerification } from './useWebAuthnLoginVerification';

export const useWebAuthnLoginOptions = () => {
  const { mutate } = useWebAuthnLoginVerification()
  return useMutation({
    mutationFn: async (email: string) => {
      return axios.post(
        'http://localhost:6001/api/v1/auth/webauth-login-options',
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
