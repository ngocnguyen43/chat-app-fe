import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';
import { Storage } from '../service/LocalStorage';
import { env } from '../config';
import { ConversationType } from '../@types';

export function useConversation() {
  const { axios } = useAxios();
  const { id: socket } = useAppSelector((state) => state.socketId);
  const id = Storage.Get('_k');

  const getConversations = () => {
    return axios.get<ConversationType[] | []>(`${env.BACK_END_URL}/conversations/${id || socket}`);
  };
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['get-conversations', id],
    queryFn: getConversations,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
    // cacheTime: 1000 * 5,
    // refetchInterval: 1000 * 10,
  });
  return { data: data?.data, isLoading, error, isFetching };
}
