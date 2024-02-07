/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx';

import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';

import { ConversationType, MessageQueryType } from '../../../@types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
// import { useConversation } from '../../../hooks/useConversations';
import { Storage } from '../../../service/LocalStorage';
import { socket } from '../../../service/socket';
import {
  fetchConversationsThunk,
  updateConversationStateInside,
  updateLastMessage,
  updateTotalUnreadMessages,
} from '../../../store/conversations-slice';
import { setCurrentConversation, updateCurrentConversationState } from '../../../store/current-conversation-slice';
import { formatAgo, isValidUrl } from '../../../utils';
import Icon from '../../atoms/Icon';
import { FunctionComponent, memo, useCallback, useState, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// interface ICovnersation {
//     avatar: string | string[],
//     conversationId: string,
//     conversationName: string,
//     lastMessageAt: string,
//     lastMessage: string,
//     isLastMessageRead: boolean
//     isOnline: boolean,
//     isGroup: boolean,
// }
type UpdateLastMessageType = {
  id: string;
  lastMessage: string;
  lastMessageAt: string;
  isLastMessageSeen: boolean;
  totalUnreadMessages: number;
};
type DeleteMessageSocketType = {
  conversation: string;
  ids: string[];
};
type BlockUserType =
  {
    "blocker": string,
    "user": string,
    "conversation": string
  }
const Skeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>
      </div>
    </div>
  );
};
const AVATAR_STATUS = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  none: 'bg-gray-500',
};
export const Avatar: FunctionComponent<{ status: 'online' | 'offline' | 'none'; avatar: string[]; isGroup: boolean }> =
  memo((props) => {
    const { status, avatar, isGroup } = props;
    const GroupAvatars = isGroup ? (
      avatar.map((item) => (
        <div key={item.length} className="avatar">
          <div className="w-10 rounded-full">
            <img src={item} alt="" />
          </div>
        </div>
      ))
    ) : (
      <div className="w-16">
        <img
          src={
            isValidUrl(decodeURIComponent(avatar[0]))
              ? decodeURIComponent(avatar[0])
              : 'https://d3lugnp3e3fusw.cloudfront.net/' + avatar[0]
          }
          loading="lazy"
          alt=""
          className="rounded-full  w-16 drop-shadow-sm"
        />
        <span
          className={clsx(
            'top-1 right-[2px] absolute z- w-3.5 h-3.5 border-2 border-inherit dark:border-gray-800 rounded-full',
            AVATAR_STATUS[status],
          )}
        ></span>
      </div>
    );
    return (
      <div className={clsx(isGroup ? 'avatar-group -space-x-7 rotate-[150deg] relative' : 'avatar overflow-hidden')}>
        {GroupAvatars}
      </div>
    );
  });
const LastMessage: FunctionComponent<{ lastMessage: string; isLastMessageRead: boolean }> = (props) => {
  const { lastMessage, isLastMessageRead } = props;
  return (
    <>
      <h6
        className={clsx(
          ' text-sm text-ellipsis whitespace-nowrap overflow-hidden',
          isLastMessageRead ? 'text-color-base-100 font-medium' : 'text-color-base-100 font-bold',
        )}
      >
        {lastMessage}
      </h6>
    </>
  );
};
// const mocks = [
//     {
//         avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
//         conversationId: "12345678",
//         conversationName: "John Doe",
//         lastMessageAt: "1692901434",
//         lastMessage: "Hey, how are you?",
//         isLastMessageRead: true,
//         isOnline: true,
//         isGroup: false
//     },
//     {
//         avatar: "https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0",
//         conversationId: "98765432",
//         conversationName: "Group Chat",
//         lastMessageAt: "1692815034",
//         lastMessage: "Let's meet up this weekend!",
//         isLastMessageRead: false,
//         isOnline: false,
//         isGroup: false
//     },
//     {
//         avatar: ["https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0", "https://th.bing.com/th/id/OIP.0ZK1QjittPRtG2CmAWuIjwHaEo?pid=ImgDet&rs=1"],
//         conversationId: "98765431",
//         conversationName: "Khanh Trang",
//         lastMessageAt: "1692815034",
//         lastMessage: "Let's meet up this weekend!",
//         isLastMessageRead: false,
//         isOnline: false,
//         isGroup: true
//     },
// ]
const Conversation: FunctionComponent<ConversationType> = memo((props) => {
  const {
    participants,
    conversationId,
    name,
    lastMessage,
    lastMessageAt,
    isLastMessageSeen: _isLastMessageSeen,
    status,
    isGroup,
    totalUnreadMessages,
    state
  } = props;
  const dispatch = useAppDispatch();
  const key = Storage.Get('_k') as string;
  // const { entities } = useAppSelector(state => state.contacts)
  const onClick = useCallback(() => {
    dispatch(
      setCurrentConversation({ participants, id: conversationId, isGroup, isOnline: status === 'online', name, state }),
    );
    dispatch(updateTotalUnreadMessages({ id: conversationId, total: 0 }));
  }, [conversationId, dispatch, isGroup, name, participants, state, status]);
  const [lastMsg, setlastMsg] = useState(formatAgo(+lastMessageAt));
  const location = useLocation().pathname.split('/').at(-1);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const { entities } = useAppSelector((state) => state.contacts);
  // useEffect(() => {
  //     const handleMouseMove = (event: MouseEvent) => {
  //         if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement) && !anchorRef.current.className.includes("bg-purple-500")) {
  //             anchorRef.current.classList.toggle("bg-[#353050]")
  //         }
  //     }
  //     document.addEventListener("mousemove", handleMouseMove)
  //     return () => {
  //         document.removeEventListener("mousemove", handleMouseMove)
  //     }
  // }, [])

  // {
  //     "id": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
  //     "status": "online",
  //     "lastLogin": "1704887184"
  //   }

  useEffect(() => {
    const interval = setInterval(() => {
      setlastMsg(() => formatAgo(+lastMessageAt));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [lastMessageAt]);
  // const mockStatus = entities.find(entity => entity.conversationId === conversationId)?.status || "offline"
  return (
    <NavLink
      ref={anchorRef}
      to={conversationId}
      className={clsx(
        'flex w-full justify-between rounded-lg items-center gap-4 cursor-pointer h-18 p-2 ',
        location === conversationId
          ? 'bg-surface-mix-400 drop-shadow-sm  '
          : 'hover:bg-surface-mix-400 hover:opacity-80 drop-shadow-sm',
      )}
      onClick={onClick}
    >
      {
        <Avatar
          status={entities.find((i) => i.conversationId === conversationId) ? status : 'none'}
          avatar={participants.filter((i) => i.id !== key).map((i) => i.avatar)}
          isGroup={Boolean(isGroup)}
        />
      }
      <div className="flex flex-col flex-1 justify-around overflow-hidden gap-2">
        <h2 className="font-semibold text-lg text-color-base-100">{name}</h2>
        <LastMessage lastMessage={lastMessage} isLastMessageRead={totalUnreadMessages === 0} />
      </div>
      <div className="flex flex-col gap-2 items-end">
        <h2
          className={clsx('text-[12px] text-color-base-100', totalUnreadMessages > 0 ? 'font-bold' : 'font-semibold')}
        >
          {lastMsg}
        </h2>
        <div className=" items-center justify-center flex mt-1 font-semibold">
          <Icon className=" text-[14px] text-color-base-100">
            {totalUnreadMessages === 0 ? (
              <IoCheckmarkDoneOutline />
            ) : (
              <div className="w-4 h-4 rounded-full bg text-[12px] bg-surface-mix-500 text-color-base-100 items-center justify-center flex mt-1 font-semibold">
                {totalUnreadMessages}
              </div>
            )}
          </Icon>
        </div>
      </div>
    </NavLink>
  );
});
type MessageSocketType = {
  group: string;
  createdAt: string;
  isDeleted: boolean;
  recipients: [];
  messageId: string;
  message: {
    type: 'text';
    content: string;
  }[];
  sender: string;
  conversationId: string;
};
const Conversations = () => {
  // const { data } = useConversation()
  const { entities: conversations, loading } = useAppSelector((state) => state.conversations);
  const { entities: contacts } = useAppSelector((state) => state.contacts);
  const { id } = useAppSelector(state => state.currentConversation)
  // const [conversations, setConversations] = useState(data)
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const location = useLocation();
  const path = location.pathname.split('/');
  const currentConversation = path.at(-1) as string;
  const key = Storage.Get('_k') as string;
  useEffect(() => {
    if (key) {
      dispatch(fetchConversationsThunk(key));
    }
  }, [dispatch, key]);
  useEffect(() => {
    socket.on('private message', (arg: MessageSocketType) => {
      const { conversationId, messageId, message, recipients, sender, isDeleted, group, createdAt } = arg;
      if (currentConversation === conversationId) {
        queryClient.setQueryData(['get-messages', currentConversation], (oldData: MessageQueryType) => {
          const [first, ...rest] = oldData.pages;
          console.log(oldData);

          const messagesData = [
            {
              messageId,
              message,
              sender,
              recipients,
              isDeleted,
              createdAt,
              group,
            },
            ...first.messages,
          ];

          return {
            ...oldData,
            pages: [
              {
                ...first,
                messages: [...messagesData],
              },
              ...rest,
            ],
          };
        });
      }
    });
    return () => {
      socket.off('private message');
    };
  }, [currentConversation, queryClient]);
  useEffect(() => {
    socket.on('update last message', (arg: UpdateLastMessageType) => {
      const { id, lastMessage, lastMessageAt, isLastMessageSeen, totalUnreadMessages } = arg;
      const existedContact = contacts.find((contact) => contact.conversationId === id);
      if (existedContact) {
        dispatch(updateLastMessage({ id, lastMessage, lastMessageAt, totalUnreadMessages, isLastMessageSeen }));
      } else {
        dispatch(fetchConversationsThunk(key));
      }
    });
    return () => {
      socket.off('update last message');
    };
  }, [contacts, dispatch, key]);
  useEffect(() => {
    socket.on("block-user", (arg: BlockUserType) => {
      const { conversation, blocker } = arg
      if (id) {
        dispatch(updateCurrentConversationState({ conversation, isBlocked: true, type: blocker === key ? "blocker" : "user" }))
      } else {
        dispatch(updateConversationStateInside({ conversation, isBlocked: true, type: blocker === key ? "blocker" : "user" }))
      }
    })
    return () => {
      socket.off("block-user")
    }
  }, [dispatch, id, key])
  useEffect(() => {
    socket.on('delete messages', (arg: DeleteMessageSocketType) => {
      const { conversation, ids } = arg;
      if (currentConversation === conversation) {
        queryClient.setQueryData(['get-messages', currentConversation], (data: MessageQueryType | undefined) => {
          if (data) {
            const newData = data.pages.map((entity) => {
              const updatedMessage = entity.messages.map((msg) => {
                const index = ids.indexOf(msg.messageId);
                if (index !== -1) {
                  return {
                    ...msg,
                    isDeleted: true,
                    message: [
                      {
                        type: 'text',
                        content: '',
                      },
                    ],
                  };
                } else {
                  return msg;
                }
              });
              return {
                ...entity,
                messages: updatedMessage,
              };
            });
            return {
              ...data,
              pages: newData,
            };
          }
        });
      }
    });
    return () => {
      socket.off('delete messages');
    };
  }, [currentConversation, queryClient]);
  // useEffect(() => {
  //   socket.on('update conversations', (arg: NonNullable<typeof conversations>) => {
  //     console.log(arg);
  //     dispatch(updateConversations(arg));
  //   });
  //   return () => {
  //     socket.off('update conversations');
  //   };
  // }, [dispatch]);
  // useEffect(() => {
  //   socket.on('user online chat', (arg: { id: string; status: 'online' | 'offline'; lastLogin: string }) => {
  //     dispatch(updateStatusConversation({ status: arg.status, id: arg.id }));
  //     dispatch(updateContactStatus({ status: arg.status, id: arg.id }));
  //   });
  //   socket.on('user offline chat', (arg: { id: string; status: 'online' | 'offline'; lastLogin: string }) => {
  //     dispatch(updateStatusConversation({ status: arg.status, id: arg.id }));
  //     dispatch(updateContactStatus({ status: arg.status, id: arg.id }));
  //   });
  //   return () => {
  //     socket.off('user online chat');
  //     socket.off('user offline chat');
  //   };
  // }, [dispatch]);

  return (
    <>
      {
        // conversations ?
        <div className="flex flex-col gap-1 h-full overflow-y-auto w-full">
          {conversations.map((conversation) => {
            return <Conversation key={conversation.conversationId} {...conversation} />;
          })}
          {loading && <Skeleton />}
        </div>
      }
    </>
  );
};
export default Conversations;
