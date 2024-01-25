import { useMutation } from '@tanstack/react-query';
import { Storage } from '../service/LocalStorage';
import useAxios from './useAxios';
import { env } from '../config';
import { useFetchPasskeys } from './useFetchPasskeys';

export function useDeletePasskey() {
  const { axios } = useAxios();
  const userId = Storage.Get('_k') as string;
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
