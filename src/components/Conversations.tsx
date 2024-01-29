import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { useConversation } from '../hooks/useConversations';
import { Storage } from '../service/LocalStorage';
import { socket } from '../service/socket';
import { formatAgo } from '../utils';

type MessageProps = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isLasstMessageSeen: boolean;
  lastMessageAt: number;
  onClick: (props: { id: string; name: string }) => void;
};
const UserMessage: React.FC<MessageProps> = (props) => {
  const { id, name, lastMessage, lastMessageAt, onClick } = props;
  return (
    <div
      className="flex w-[calc(100%-4px)] flex-row justify-between cursor-pointer "
      onClick={() => onClick({ name, id })}
    >
      <div className="relative rounded-md w-12 h-12 bg-cyan-300 after:absolute"></div>
      <div className="flex flex-col justify-around flex-1 ml-2 text-ellipsis overflow-hidden">
        <span className="text-md font-bold">{name}</span>
        <h6 className="text-ellipsis overflow-hidden text-xs whitespace-nowrap">{lastMessage.repeat(20)}</h6>
      </div>
      <div className="flex flex-col justify-evenly items-end">
        <span className="text-xs">{formatAgo(lastMessageAt)}</span>
        <div className="rounded-full w-3 h-3 bg-red-500 flex items-center justify-center text-color-base-100 text-[8px]"></div>
      </div>
    </div>
  );
};
export default function Conversations() {
  const { id } = useAppSelector((state) => state.socketId);
  const { id: room } = useAppSelector((state) => state.currentConversation);
  const key = Storage.Get('_k');
  const { data } = useConversation();
  const [conversations, setConversations] = React.useState<typeof data>([]);
  React.useEffect(() => {
    socket.emit('join room', id || key);
    socket.emit('get contact status', id || key);
    socket.on('get contact status', (arg) => {
      console.log(arg);
    });
    // socket.on("user online", (arg: string) => {
    //     console.log(`user ${arg} is online`)
    // })
    // socket.on("user offline", (arg: string) => {
    //     console.log(`user ${arg} is offline`)
    // })
    // socket.on("update conversations", (args) => {
    //     console.log(args)
    // })
    return () => {
      socket.off('get contact status');
      // socket.off("update conversations")
      // socket.off("user online")
      // socket.off("user offline")
    };
  }, [id, key]);
  React.useEffect(() => {
    setConversations(data);
  }, [data]);
  React.useEffect(() => {
    socket.on('update conversations', (args: typeof data) => {
      setConversations(args);
    });
    return () => {
      socket.off('update conversations');
    };
  });
  const handleOnclick = (props: { name: string; id: string }) => {
    console.log(props);
    socket.auth = { id };
    socket.emit('leave room', room);
    // dispatch(setConversationName(props.name))
    // dispatch(setConversationId(props.id))
    Storage.Set<string>('current_conversation_id', props.id);
    Storage.Set<string>('current_conversation', props.name);
    socket.emit('join conversation', props.id);
  };
  return (
    <>
      <div className="w-full overflow-x-hidden h-full conversations">
        {/* <div>
        <span className='text-xs'>Pinned</span>
    </div> */}
        <div className="flex flex-col pr-2">
          {/* <NavLink className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " rounded-md"} to="/conversation/123456" >
            <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' />
        </NavLink>
        <NavLink className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " rounded-md"} to="./" >
            <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' />
        </NavLink>
        <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' />
        <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' /> */}
          {/* {isFetching && <div>Loading...</div>} */}
          {conversations && conversations.length > 0
            ? conversations.map((conversation, index) => {
              return (
                <NavLink
                  key={index}
                  className={(nav) => (nav.isActive ? 'bg-blue-50' : '') + ' hover:bg-blue-50 p-2 rounded-md'}
                  to={`/me/${conversation.conversationId}`}
                >
                  <UserMessage
                    avatar=""
                    id={conversation.conversationId}
                    isLasstMessageSeen={conversation.isLastMessageSeen}
                    lastMessage={conversation.lastMessage}
                    lastMessageAt={+conversation.lastMessageAt}
                    name={conversation.name}
                    onClick={handleOnclick}
                  />
                </NavLink>
              );
            })
            : null}
        </div>
        {/* <div>
        <span className='text-xs'>Direct Messages</span>
    </div>

    <div>
        <span className='text-xs'>Group Messages</span>
    </div>
    <UserMessage /> */}
      </div>
    </>
  );
}
