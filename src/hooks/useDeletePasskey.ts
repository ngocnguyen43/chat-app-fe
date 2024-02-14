import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useFetchPasskeys } from './useFetchPasskeys';
import { useAppSelector } from './useAppSelector';

export function useDeletePasskey() {
  const { axios } = useAxios();
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const { refetch } = useFetchPasskeys();
  return useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`${env.BACK_END_URL}/auth/passkey?i=${encodeURIComponent(id)}&u=${userId}`);
    },
    onSuccess: () => {
      refetch();
    },
  });
}
