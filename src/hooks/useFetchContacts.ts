import { useQuery } from 'react-query';
import useAxios from './useAxios';

import { Storage } from '../service/LocalStorage';
export type ContactType = {
    "userId": string,
    "fullName": string,
    "avatar": string,
    "status": "online" | "offline",
    "lastLogin": string,
    "conversationId": string
}
export const useFetchContacts = () => {
    const id = Storage.Get("key")
    const { axios } = useAxios()
    const getContacts = async () => {
        const res = await axios.get<ContactType[]>(`http://localhost:6301/api/v1/contacts/${id ?? ""}`);
        return res.data
    };
    const query = useQuery({ queryKey: ["get-contacts", id], queryFn: getContacts, refetchOnWindowFocus: false })
    return { ...query }
}