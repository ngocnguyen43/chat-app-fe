import { useInfiniteQuery } from '@tanstack/react-query';

import useAxios from './useAxios';
import { env } from '../config';
import { Messages } from '../@types';

// "messageId": "5d367e92-7c0a-4163-a9c4-1b2afef88d1c",
// "conversationId": "d0312b62-7093-4323-9077-10b543763328",
// "type": "text",
// "content": "asasasa",
// "sender": "25de4f3b-dcff-466c-8f2e-b6a09af80198",
// "recipients": [],
// "isDeleted": false,
// "createdAt": "1691459104241"

export function useFetchMessage(id: string) {
  const { axios } = useAxios()

  const getMessages = async ({ pageParam }: { pageParam: string }) => {
    const searchParams = new URLSearchParams({ lai: pageParam }).toString()
    return (await axios.get<Messages>(`${env.BACK_END_URL}/conversation/${id}?${searchParams}`)).data
  }
  const query = useInfiniteQuery(
    // enabled: false,
    // staleTime: Infinity,
    {
      queryKey: ['get-messages', id],
      queryFn: getMessages,
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.messages.at(-1)?.messageId : undefined,
      refetchOnWindowFocus: false
      // enabled: false
      // staleTime: 1 * 60,
      // staleTime: Infinity
    }
    // {
    //   getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.messages.at(-1).messageId : null

    // }
  )
  // const { data, error, isLoading, isFetching } = useInfiniteQuery({
  //   queryKey: ['get-messages', id],
  //   queryFn: (lai = "") => getMessages(lai),
  //   // enabled: false,
  //   // staleTime: Infinity,
  //   getNextPageParam: (lastPages) => {
  //     return lastPages && lastPages.messages.length > 0 ? lastPages.messages.at(-1)?.messageId : undefined
  //   },
  //   refetchOnWindowFocus: false,

  // })
  return { ...query }
}
