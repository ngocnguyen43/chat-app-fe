import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useFetchPasskeys } from './useFetchPasskeys';

export const useWebAuthnRegistrationVerification = () => {
  const { refetch } = useFetchPasskeys();
  return useMutation({
    mutationFn: async (data: unknown) => {
      return await axios.post(`${env.BACK_END_URL}/auth/webauth-registration-verification`, {
        data,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
    },
  });
};
