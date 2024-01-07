import { useQuery } from 'react-query';

import { Storage } from '../service/LocalStorage';
import useAxios from './useAxios';
import { env } from '../config';

export const useFetchConversationParticipants = () => {
    const id = Storage.Get("current_conversation_id")
    const { axios } = useAxios()
    const getParticipants = async () => {
        const res = await axios.get<{ userId: string }[]>(`${env.BACK_END_URL}/conversation/p/${id ?? ""}`);
        return res.data
    };
    const query = useQuery({ queryKey: ["get-conversation-participants", id], queryFn: getParticipants, refetchOnWindowFocus: false })
    return { ...query }
}