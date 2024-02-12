import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';

export type QueriesType = {
  userId: string;
  email: string;
  fullName: string;
  request:
  | [
    {
      status: 'pending' | 'accepted';
    },
  ]
  | [];
  profile: { avatar: string } | null;
  state: {
    isBlocker: boolean;
    type: 'user' | 'blocker';
  };
};
export const useQueryUserWithExclude = (query: string, exclude: string[] | []) => {
  const { axios } = useAxios();
  const getQueries = async () => {
    const params = new URLSearchParams({ q: query, e: exclude.toString() });
    const res = await axios.get<QueriesType[]>(`${env.BACK_END_URL}/users?${params.toString()}`);
    return res.data;
  };
  const execute = useQuery({
    queryKey: query ? ['get-queries-exclude', query] : ['get-queries-exclude'],
    queryFn: getQueries,
    enabled: Boolean(query),
  });
  return { ...execute };
};
