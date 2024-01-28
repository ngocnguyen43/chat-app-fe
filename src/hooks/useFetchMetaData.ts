import { useQuery } from '@tanstack/react-query';

import { URLMetadata } from '../@types';
import useAxios from './useAxios';

// "messageId": "5d367e92-7c0a-4163-a9c4-1b2afef88d1c",
// "conversationId": "d0312b62-7093-4323-9077-10b543763328",
// "type": "text",
// "content": "asasasa",
// "sender": "25de4f3b-dcff-466c-8f2e-b6a09af80198",
// "recipients": [],
// "isDeleted": false,
// "createdAt": "1691459104241"

export const getMetadata = async (params: string) => {
  const res = await fetch(`https://jsonlink.io/api/extract?url=${params}`);
  return (await res.json()) as URLMetadata;
};
export function useFetchMetaData(url: string) {
  const { axios } = useAxios();
  const getMetadata = () => {
    return axios.get<URLMetadata>(`https://jsonlink.io/api/extract?url=${url}`);
  };
  const { data, ...rest } = useQuery({
    queryKey: ['get-metadata', url],
    queryFn: getMetadata,
    enabled: false,
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return { data: data?.data, ...rest };
}
