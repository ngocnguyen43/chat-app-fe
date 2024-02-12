import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export type PasskeysResponseType = {
  id: string;
  createdAt: string;
};
export const useFetchPasskeys = () => {
  const { axios } = useAxios();
  const {
    entity: { email },
  } = useAppSelector((state) => state.information);
  const getQueries = async () => {
    const searhcParams = new URLSearchParams({ email });
    const res = await axios.get<PasskeysResponseType[] | []>(
      `${env.BACK_END_URL}/auth/passkeys?${searhcParams.toString() ?? ''}`,
    );
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-passkeys'],
    queryFn: getQueries,
    refetchOnWindowFocus: false,
    // enabled: false,
    retry: false,
    staleTime: Infinity,
  });
  return { ...execute };
};
