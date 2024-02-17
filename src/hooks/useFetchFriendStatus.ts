import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';
import { env } from '../config';

interface IFriendRequest {
  status: 'pending' | 'accepted';
  requesterId: string;
  recipientId: string;
  id: string;
}
export default function useFetchFriendStatus() {
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);

  // const { loading } = useAppSelector((state) => state.conversations);
  const { id: conversationId, participants } = useAppSelector(state => state.currentConversation)
  const otherParticipant = (participants.length === 2 || participants.length === 1) ? participants.find((i) => i.id !== id) : undefined;
  const { axios } = useAxios();
  const fetchFriendStatus = async () => {
    const res = await axios.get<IFriendRequest>(`${env.BACK_END_URL}/users/${id}/friends/${otherParticipant?.id}`);
    return res.data;
  };

  const query = useQuery({
    queryKey: ['get-friend-status', otherParticipant?.id],
    queryFn: fetchFriendStatus,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(conversationId) && Boolean(otherParticipant?.id),
  });
  return { ...query };
}
