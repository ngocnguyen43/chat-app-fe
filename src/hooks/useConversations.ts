import { useQuery } from '@tanstack/react-query';

import { ConversationType } from '../@types';
import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export function useConversation() {
  const { axios } = useAxios();
  // const { id: socket } = useAppSelector((state) => state.socketId);
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);

  const getConversations = () => {
    return axios.get<ConversationType[] | []>(`${env.BACK_END_URL}/conversations}`);
  };
  const query = useQuery({
    queryKey: ['get-conversations', id],
    queryFn: getConversations,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
    // cacheTime: 1000 * 5,
    // refetchInterval: 1000 * 10,
  });
  return { ...query };
}
