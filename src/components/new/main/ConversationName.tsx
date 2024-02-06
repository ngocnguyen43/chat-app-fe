import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { Storage } from '../../../service/LocalStorage';
import { Avatar } from '../nav/Conversations';
import { FunctionComponent, memo } from 'react';

interface IConversationname {
  isGroup?: boolean;
  name?: string;
}
const ConversationName: FunctionComponent<IConversationname> = () => {
  const { participants, isGroup, name } = useAppSelector((state) => state.currentConversation);
  const { name: newName, isGroup: newIsGroup, participants: newAvatar } = useAppSelector(state => state.newConversation)
  const { entities } = useAppSelector((state) => state.contacts);
  const path = useLocation().pathname.split('/').at(-1);
  const id = Storage.Get('_k');
  const rawAvatar = participants.filter((i) => i.id !== id).map(i => i.avatar);

  const existedContact = entities.find((entity) => entity.conversationId === path);
  const status = existedContact ? existedContact.status : "none"

  return (
    <div className="flex gap-4 h-16 items-center">
      {/* <div className="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring ring-red-400 ring-offset-2 ring-offset-base-100 scale-105">
                <svg className="absolute w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div> */}
      <div>
        <Avatar
          avatar={rawAvatar.length > 0 ? rawAvatar : newAvatar.filter((i) => i.id !== id).map(i => i.avatar)}
          isGroup={isGroup ? Boolean(isGroup) : Boolean(newIsGroup)}
          status={status}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-xl font-semibold text-color-base-100">{name || newName}</h2>
        {isGroup && <h4 className="text-sm">10 members</h4>}
        {!(isGroup) ? (
          status === 'online' ? (
            <h4 className="text-sm text-color-base-100">online</h4>
          ) : (
            <h4 className="text-sm text-color-base-100  font-medium">offline</h4>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default memo(ConversationName);
