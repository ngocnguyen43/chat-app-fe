import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import { delay } from '../utils';
import useAxios from './useAxios';

export type MFQRResponseType = string;
export const useGetTheme = () => {
  const { axios } = useAxios();
  const id = Storage.Get('_k') as string;
  const getQueries = async () => {
    await delay(1000);
    const res = await axios.get<{ theme: 'light' | 'dark' }>(`${env.BACK_END_URL}/user/theme/${id}`);
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-theme'],
    queryFn: getQueries,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  });
  return { ...execute };
};
