import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import { delay } from '../utils';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export type MFQRResponseType = string;
export const useGet2FAQRCode = () => {
  const { axios } = useAxios();
  const {
    entity: { email },
  } = useAppSelector((state) => state.information);
  const getQueries = async () => {
    await delay(1000);
    const searhcParams = new URLSearchParams({ email });
    const res = await axios.get<MFQRResponseType>(
      `${env.BACK_END_URL}/auth/generate-mfa?${searhcParams.toString() ?? ''}`,
    );
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-mf-qr'],
    queryFn: getQueries,
    refetchOnWindowFocus: false,
    // enabled: false,
    retry: false,
  });
  return { ...execute };
};
