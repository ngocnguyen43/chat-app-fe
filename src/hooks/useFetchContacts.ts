import axios from 'axios';
import { useQuery } from 'react-query';

import { Storage } from '../service/LocalStorage';
export type ContactType = {
    "info": {
        "userId": string,
        "fullName": string,
        "profile": any
    },
    "status": string,
    "lastLogin": 0 | string,
    "conversationId": string
}
export const useFetchContacts = () => {
    const id = Storage.Get("key")
    const getContacts = async () => {
        const res = await axios.get<{ offline?: ContactType[], online?: ContactType[] }>(`http://localhost:6301/api/v1/contacts/${id ?? ""}`);
        return res.data
    };
    const query = useQuery({ queryKey: ["get-contacts", id], queryFn: getContacts, refetchOnWindowFocus: false })
    return { ...query }
}