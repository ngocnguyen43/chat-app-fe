import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { env } from '../config';
import React from 'react';
import { Storage } from '../service/LocalStorage';

export type PasskeysResponseType = {
    id: string
    createdAt: string
};
export const useFetchPasskeys = () => {
    const { axios } = useAxios();
    const email = Storage.Get("_e") as string
    const getQueries = async () => {
        const searhcParams = new URLSearchParams({ email })
        const res = await axios.get<PasskeysResponseType[] | []>(`${env.BACK_END_URL}/auth/passkeys?${searhcParams.toString() ?? ''}`);
        return res.data;
    };
    const execute = useQuery({
        queryKey: ['get-passkeys'],
        queryFn: getQueries,
        refetchOnWindowFocus: false,
        // enabled: false,
        retry: false,
        staleTime: Infinity
    });
    return { ...execute };
};
