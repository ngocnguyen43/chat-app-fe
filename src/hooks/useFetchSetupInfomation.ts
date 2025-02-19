import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';

export type FetchSetupType = {
  isLoginBefore: boolean;
  id: string;
  picture: string;
  email: string;
  full_name: string;
  user_name: string;
  access_token: string;
  provider: string;
};
export const useFetchSetupInformation = (id: string, name: string) => {
  const { axios } = useAxios();
  const getQueries = async () => {
    const res = await axios.get<FetchSetupType>(`${env.BACK_END_URL}/auth/login/success`);
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-login-success'],
    queryFn: getQueries,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !(Boolean(id) && Boolean(name)),
  });
  return { ...execute };
};
