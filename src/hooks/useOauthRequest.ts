import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { env } from '../config';
export type Oauth2QueryType = {
  url: string;
};
export const useOauth2Request = () => {
  const { axios } = useAxios();
  const getQueries = async () => {
    const res = await axios.get<Oauth2QueryType>(`${env.BACK_END_URL}/auth/oauth-request`);
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-oauth-url'],
    queryFn: getQueries,
    refetchOnWindowFocus: false,
    enabled: false,
  });
  return { ...execute };
};
