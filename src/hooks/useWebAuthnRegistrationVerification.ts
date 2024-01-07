import axios from 'axios';
import { useMutation } from 'react-query';
import { env } from '../config';

export const useWebAuthnRegistrationVerification = () => {
  return useMutation({
    mutationFn: async (data: unknown) => {
      return axios.post(
        `${env.BACK_END_URL}/auth/webauth-registration-verification`,
        {
          data,
        }
      )
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}
