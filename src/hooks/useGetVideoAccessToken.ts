import { useQuery } from 'react-query';
import useAxios from './useAxios';

import { Storage } from '../service/LocalStorage';
import { useAppSelector } from './useAppSelector';
import { env } from '../config';
export type ACType = {
    "accessToken": string,
    url: string
}
export const useGetVACT = () => {
    const user = Storage.Get("key")
    const { room } = useAppSelector(state => state.callBox)
    const { axios } = useAxios()
    const getContacts = async () => {
        const res = await axios.get<ACType>(`${env.BACK_END_URL}/video/grant-identity?user=${user ?? ""}&conversation=${room}`);
        return res.data
    };
    const query = useQuery({ queryKey: ["get-contacts", user], queryFn: getContacts, refetchOnWindowFocus: false })
    return { ...query }
}