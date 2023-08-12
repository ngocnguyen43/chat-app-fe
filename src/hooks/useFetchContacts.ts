import axios from 'axios';
import { useQuery } from 'react-query';

import { useAppSelector } from './useAppSelector';
export type ContactType = {
    "info": {
        "userId": string,
        "fullName": string,
        "profile": any
    },
    "status": string,
    "lastLogin": number | string,
    "conversationId": string
}
export const useFetchContacts = () => {
    const { id } = useAppSelector(state => state.socketId)
    const getContacts = async () => {
        const res = await axios.get<{ offline?: ContactType[], online?: ContactType[] }>(`http://localhost:6301/api/v1/contacts/${id}`);
        return res.data
    };
    const query = useQuery({ queryKey: ["get-contacts", id], queryFn: getContacts, refetchOnWindowFocus: false })
    return { ...query }
}