import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useFetchPasskeys } from './useFetchPasskeys';
import useAxios from './useAxios';

export const useWebAuthnRegistrationVerification = () => {
  const { refetch } = useFetchPasskeys();
  const { axios } = useAxios();

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
