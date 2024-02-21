import { FunctionComponent, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { Avatar } from '../nav/Conversations';

interface IConversationname {
  isGroup?: boolean;
  name?: string;
}
export const ConversationSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
    </div>
  );
};

const ConversationName: FunctionComponent<IConversationname> = () => {
  const { participants, isGroup } = useAppSelector((state) => state.currentConversation);
  const {
    name: newName,
    isGroup: newIsGroup,
    participants: newAvatar,
  } = useAppSelector((state) => state.newConversation);
  const { entities } = useAppSelector((state) => state.contacts);
  const path = useLocation().pathname.split('/').at(-1);
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);
  const rawAvatar = participants.filter((i) => i.isActive === true).filter((i) => i.id !== id).map((i) => i.avatar);

  const existedContact = entities.find((entity) => entity.conversationId === path);
  const status = existedContact ? (existedContact.state.isBlocked ? 'none' : existedContact.status) : 'none';

  return (
    <div className="flex gap-4 h-16 items-center">
      {/* <div className="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring ring-red-400 ring-offset-2 ring-offset-base-100 scale-105">
                <svg className="absolute w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div> */}
      <div>
        <Avatar
          avatar={
            rawAvatar.length > 0
              ? rawAvatar
              : newAvatar
                .filter((i) => i.id !== id)
                .filter((i) => i.isActive === true)
                .map((i) => i.avatar)
          }
          isGroup={isGroup ? Boolean(isGroup) : Boolean(newIsGroup)}
          status={status}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-xl font-semibold text-color-base-100">
          {participants
            .filter((p) => p.id !== id)
            .filter((i) => i.isActive === true)
            .map((i) => i.fullName)
            .join(' ') || newName}
        </h2>
        {isGroup ? (
          <h4 className="text-sm text-color-base-100 font-medium">{`${participants.filter((i) => i.isActive === true).length
            } members`}</h4>
        ) : status === 'none' ? (
          <h4 className="text-sm text-color-base-100 font-medium">unknown</h4>
        ) : (
          <h4 className="text-sm text-color-base-100  font-medium">{status}</h4>
        )}
      </div>
    </div>
  );
};
export default memo(ConversationName);
