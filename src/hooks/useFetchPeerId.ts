import { useQuery } from '@tanstack/react-query';

import useAxios from './useAxios';
import { env } from '../config';
import { PeerIdsResponse } from '../@types';

// "messageId": "5d367e92-7c0a-4163-a9c4-1b2afef88d1c",
// "conversationId": "d0312b62-7093-4323-9077-10b543763328",
// "type": "text",
// "content": "asasasa",
// "sender": "25de4f3b-dcff-466c-8f2e-b6a09af80198",
// "recipients": [],
// "isDeleted": false,
// "createdAt": "1691459104241"

export function useFetchPeerId(id: string) {
  const { axios } = useAxios();
  const getPeerId = () => {
    return axios.get<PeerIdsResponse>(`${env.BACK_END_URL}/conversation/peer/${id}`);
  };
  const { data, ...rest } = useQuery({
    queryKey: ['get-peer-id', id],
    queryFn: getPeerId,
    // enabled: false,
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return { data: data?.data, ...rest };
}
