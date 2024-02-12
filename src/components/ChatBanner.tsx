import { FunctionComponent, memo } from 'react';
import { useAppSelector } from '../hooks';
import { isValidUrl } from '../utils';

interface IChatBanner {
  isFetchingNextPage: boolean;
}
const ChatBanner: FunctionComponent<IChatBanner> = memo((props) => {
  const { isFetchingNextPage } = props;
  const { isGroup, participants, state } = useAppSelector((state) => state.currentConversation);
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const { entities: contacts } = useAppSelector((state) => state.contacts);

  const otherParticipant = participants.length === 2 ? participants.filter((i) => i.id !== userId) : undefined;
  const existContact = otherParticipant ? contacts.find((i) => i.userId === otherParticipant[0].id) : undefined;
  const avatar = otherParticipant
    ? isValidUrl(decodeURIComponent(otherParticipant[0].avatar))
      ? decodeURIComponent(otherParticipant[0].avatar)
      : 'https://d3lugnp3e3fusw.cloudfront.net/' + decodeURIComponent(otherParticipant[0].avatar)
    : undefined;
  console.log(isFetchingNextPage);

  return (
    <>
      {!isGroup && !existContact && !isFetchingNextPage && !state?.isBlocked ? (
        <div className="w-full flex items-center justify-center py-4 pb-16">
          <div className="flex flex-col gap-4 items-center justify-center">
            <img src={avatar} alt="" className="w-14 h-14 rounded-full" />
            <h1 className="font-semibold">{`You and ${
              participants.filter((i) => i.id !== userId)[0].fullName
            } is not friend.`}</h1>
            <h1 className="font-semibold">{`Become friend with them to see their status and more.`}</h1>
            <div className="w-full flex gap-2 items-center justify-center">
              <button className="text-color-base-100 font-medium bg-surface-mix-300 w-[150px] py-2 rounded-lg hover:scale-105">
                Accept
              </button>
              <button className="text-color-base-100 font-medium bg-surface-mix-300 w-[150px] py-2 rounded-lg hover:scale-105 transition-all">
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});
export default ChatBanner;
