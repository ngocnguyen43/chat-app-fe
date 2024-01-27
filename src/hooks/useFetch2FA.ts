import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

import { Storage } from '../service/LocalStorage';
import { env } from '../config';

export const useFetch2FA = () => {
    const email = Storage.Get('_e') as string;
    const { axios } = useAxios();
    const get2FA = async () => {
        const searhcParams = new URLSearchParams({ email });
        const res = await axios.get<{ "2fa": boolean }>(`${env.BACK_END_URL}/auth/mf-otps?${searhcParams.toString() ?? ""}`);
        return res.data;
    };
    const query = useQuery({ queryKey: ['get-2fa'], queryFn: get2FA, refetchOnWindowFocus: false });
    return { ...query };
};
