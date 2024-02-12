import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export const useFetch2FA = () => {
  const { entity: { email } } = useAppSelector(state => state.information)
  const { axios } = useAxios();
  const get2FA = async () => {
    const searhcParams = new URLSearchParams({ email });
    const res = await axios.get<{ '2fa': boolean }>(
      `${env.BACK_END_URL}/auth/mf-otps?${searhcParams.toString() ?? ''}`,
    );
    return res.data;
  };
  const query = useQuery({ queryKey: ['get-2fa'], queryFn: get2FA, refetchOnWindowFocus: false, staleTime: Infinity });
  return { ...query };
};
