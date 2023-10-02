import { useQuery } from 'react-query';
import useAxios from './useAxios';

import { Storage } from '../service/LocalStorage';
export type ACType = {
    "accessToken": string,
    url: string
}
export const useGetVACT = () => {
    const user = Storage.Get("key")
    const conversation = Storage.Get("id")
    const { axios } = useAxios()
    const getContacts = async () => {
        const res = await axios.get<ACType>(`http://localhost:6101/video/grant-identity?user=${user ?? ""}&conversation=${conversation ?? ""}`);
        return res.data
    };
    const query = useQuery({ queryKey: ["get-contacts", user], queryFn: getContacts, refetchOnWindowFocus: false })
    return { ...query }
}