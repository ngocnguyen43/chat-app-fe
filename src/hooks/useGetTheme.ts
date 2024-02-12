import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import { delay } from '../utils';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export type MFQRResponseType = string;
export const useGetTheme = () => {
  const { axios } = useAxios();
  const { entity: { userId: id } } = useAppSelector(state => state.information);
  const getQueries = async () => {
    await delay(1000);
    const res = await axios.get<{ theme: 'light' | 'dark' }>(`${env.BACK_END_URL}/users/${id}/theme`);
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-theme', id],
    queryFn: getQueries,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  });
  return { ...execute };
};
