import { FunctionComponent, useMemo } from 'react';
import { useAppSelector } from '../hooks';
import { isValidUrl } from '../utils';
import useFetchFriendStatus from '../hooks/useFetchFriendStatus';
import useAcceptFriendRequest from '../hooks/useAcceptFriendRequest';
import useCreateFriendRequest from '../hooks/useCreateFriendRequest';
import useDeleteFriendRequest from '../hooks/useDeleteFriendRequest';

interface IChatBanner {
  isFetchingNextPage: boolean;
}
const ChatBanner: FunctionComponent<IChatBanner> = (props) => {
  const { isFetchingNextPage } = props;
  const { isGroup, participants, state } = useAppSelector((state) => state.currentConversation);
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const otherParticipant = participants.length === 2 ? participants.filter((i) => i.id !== userId) : undefined;
  const { data, refetch } = useFetchFriendStatus(otherParticipant ? otherParticipant[0].id : undefined);
  const { mutate: createFriendRequest } = useCreateFriendRequest(otherParticipant ? otherParticipant[0].id : undefined);
  const { mutate: acceptRequest } = useAcceptFriendRequest(data?.id);
  const { mutate: deleteRequest } = useDeleteFriendRequest(data?.id);
  const avatar = useMemo(() => {
    return otherParticipant
      ? isValidUrl(decodeURIComponent(otherParticipant[0].avatar))
        ? decodeURIComponent(otherParticipant[0].avatar)
        : 'https://d3lugnp3e3fusw.cloudfront.net/' + decodeURIComponent(otherParticipant[0].avatar)
      : undefined;
  }, [otherParticipant]);
  return (
    <>
      {!isGroup && !isFetchingNextPage && !state?.isBlocked ? (
        <div className="w-full flex items-center justify-center py-4 pb-8">
          <div className="flex flex-col gap-4 items-center justify-center">
            {data && <img src={avatar} alt="" className="w-24 h-24 rounded-full" />}
            {data && (data.status === 'pending' || !Object.keys(data).length) ? (
              <>
                <h1 className="font-semibold">{`You and ${participants.filter((i) => i.id !== userId)[0].fullName
                  } were not friend.`}</h1>
                <h1 className="font-semibold">{`Become friend with them to see their status and more.`}</h1>
              </>
            ) : null}
            {data && data.status === 'accepted' ? (
              <>
                <h1 className="font-semibold mt-4">{`You and ${participants.filter((i) => i.id !== userId)[0].fullName
                  } were  friend.`}</h1>
              </>
            ) : null}

            <div className="w-full flex gap-2 items-center justify-center ">
              {data && Object.keys(data).length && data.status !== 'accepted' && data.requesterId === userId ? (
                <button
                  className="text-color-base-100 font-medium bg-surface-mix-300 w-[150px] transition-all py-2 rounded-lg hover:scale-105"
                  onClick={() =>
                    deleteRequest(undefined, {
                      onSuccess: () => {
                        refetch();
                      },
                    })
                  }
                >
                  Cancel request
                </button>
              ) : null}
              {data && Object.keys(data).length && data.status !== 'accepted' && data.recipientId === userId ? (
                <>
                  <button
                    className="text-color-base-100 font-medium bg-surface-mix-300 w-[150px] transition-all py-2 rounded-lg hover:scale-105"
                    onClick={() => acceptRequest(undefined)}
                  >
                    Accept
                  </button>
                  <button
                    className="text-color-base-100 font-medium bg-surface-mix-300 w-[150px] transition-all py-2 rounded-lg hover:scale-105"
                    onClick={() =>
                      deleteRequest(undefined, {
                        onSuccess: () => {
                          refetch();
                        },
                      })
                    }
                  >
                    Decline
                  </button>
                </>
              ) : null}
              {data && !Object.keys(data).length ? (
                <button
                  className="text-color-base-100 font-medium bg-surface-mix-300 w-[150px] py-2 rounded-lg hover:scale-105"
                  onClick={() =>
                    createFriendRequest(undefined, {
                      onSuccess: () => {
                        refetch();
                      },
                    })
                  }
                >
                  Send Request
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ChatBanner;
