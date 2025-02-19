import clsx from 'clsx';
import { MouseEvent, UIEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { useFetchMessage } from '../hooks/useFetchMessage';
import { socket } from '../service/socket';
import { setShowBouncing } from '../store/bouncing-slice';
import { convertToMessageDate, formatGroupedDate } from '../utils';
import BouncingMessage from './BoucingMessage';
import SingleMessage from './SingleMessage';
import { setAuthError } from '../store';
import ChatBanner from './ChatBanner';
import useUpdateReaction from '../hooks/useUpdateReaction';

const MessagesBox = () => {
  // console.log("check:::", ref)
  const messageEl = useRef<HTMLDivElement>(null);
  const { entities } = useAppSelector((state) => state.contacts);
  const { isGroup } = useAppSelector((state) => state.currentConversation);
  const { entities: tempMessages } = useAppSelector((state) => state.tempMessage);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname.split('/');
  const { fetchNextPage, data, hasNextPage, isFetchingNextPage, isError } = useFetchMessage(path.at(-1) as string);
  const { isOpen } = useAppSelector((state) => state.bouncing);
  const scrollToBottom = () => {
    if (messageEl.current) {
      messageEl.current.scrollTop = messageEl.current.scrollHeight;
      // messageEl.current.scrollIntoView({
      //     behavior: "smooth",
      //     block: "end"
      // })
    }
  };
  // useEffect(() => {
  //     if (inView) {
  //         console.log(true);

  //         fetchNextPage()
  //     }
  // }, [fetchNextPage, inView])
  useEffect(() => {
    if (isError) {
      dispatch(setAuthError(true));
    }
  }, [dispatch, isError]);
  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      event.preventDefault();
      const isScrolled = !event.currentTarget.scrollTop
        ? !!event.currentTarget.scrollTop
        : event.currentTarget.offsetHeight + event.currentTarget.scrollTop < event.currentTarget.scrollHeight;
      dispatch(setShowBouncing(isScrolled));
    },
    [dispatch],
  );
  const handleClickBouncing = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    scrollToBottom();
    dispatch(setShowBouncing(false));
  };
  // useEffect(() => {
  //     const current = messageEl.current
  //     const handler = (event: Event) => {
  //         const { currentTarget: target } = event;
  //         if ((target as HTMLElement).scrollTop < 2000) {
  //             console.log(current);
  //             (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'instant' });
  //         }
  //         // (target as HTMLElement).scroll({ behavior: 'smooth' });
  //     }
  //     if (current) {
  //         current.addEventListener('DOMNodeInserted', handler);
  //         current.addEventListener('load', handler);
  //         return () => {
  //             current.removeEventListener("DOMNodeInserted", handler)
  //             current.removeEventListener("load", handler)
  //         }
  //     }

  // }, [])
  // useEffect(() => {
  //     // if (messageEl.current) {
  //     //     messageEl.current.scrollIntoView({block})
  //     // }
  //     if (messageEl.current) {
  //         messageEl.current.scroll({ top: 2100, behavior: "instant", })
  //     }

  //     // scrollToBottom();
  //     // console.log(true)
  // })
  // {
  //     "conversation": "a3730a54-8e05-42db-9092-1b3d91775cc2",
  //     "userId": "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
  //   }

  const [showTyping, shouldShowTyping] = useState<boolean>(false);
  useEffect(() => {
    socket.on('user typing', (args: { conversation: string; userId: string }) => {
      console.log(path[2] === args.conversation);
      if (path[2] === args.conversation) {
        shouldShowTyping(true);
      }
    });
    socket.on('user not typing', (args: { conversation: string; userId: string }) => {
      if (path[2] === args.conversation) {
        shouldShowTyping(false);
      }
    });
    return () => {
      socket.off('user typing');
      socket.off('user not typing');
    };
  }, [path]);
  useEffect(() => {
    if (!isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);
  const updateReaction = useUpdateReaction();
  useEffect(() => {
    socket.on('update reaction', (arg: { action: 'remove' | 'create'; messageId: string }) => {
      const { action, messageId } = arg;
      updateReaction(action, messageId, false);
    });
    return () => {
      socket.off('update reaction');
    };
  });
  const intObserver = useRef<IntersectionObserver>();

  useLayoutEffect(() => {
    if (messageEl.current) {
      messageEl.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);
  const lastPostRef = useCallback(
    (message: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
          // timer.current = setTimeout(() => {
          //     // messageEl.current.scrollTop = 1000
          // }, 1000);
        }
      });
      if (message) intObserver.current.observe(message);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );
  const {
    entity: { profile },
  } = useAppSelector((state) => state.information);
  // const rawData = data && data.pages[0].messages.length > 0 ? data :
  let userAvatar: string;
  if (profile) {
    const { avatar: tempAvatar } = profile;
    userAvatar = tempAvatar;
  }
  const content =
    data &&
    data.pages.map((e, index) => {
      const data = e.messages.length > 0 ? e.messages : tempMessages;
      return data.map((c, i, arr) => {
        const imgUrl = entities.find((entity) => entity.userId === c.sender)?.avatar || userAvatar;
        const shouldShowAvatar =
          i === arr.length - 1 ||
          (i <= arr.length - 2 && (c.sender !== arr[i + 1].sender || c.group !== arr[i + 1].group));
        return (
          <div key={Math.random() + c.createdAt}>
            {i < arr.length - 1 && c.group !== arr[i + 1].group && (
              <div className="w-full flex items-center justify-center ">
                <div className="bg-surface-mix-300 my-3 p-2 rounded-2xl">
                  <span className="text-color-base-100 font-medium">{formatGroupedDate(c.group)}</span>
                </div>
              </div>
            )}
            {i === arr.length - 1 && (
              <div className="w-full lol flex items-center justify-center">
                <div className="bg-surface-mix-300 my-3 p-2 rounded-2xl">
                  <span className="text-color-base-100 font-medium">{formatGroupedDate(c.group)}</span>
                </div>
              </div>
            )}
            {
              <SingleMessage
                ref={i === arr.length - 2 ? lastPostRef : null}
                message={c.message}
                id={c.messageId}
                sender={c.sender}
                avatar={imgUrl}
                shouldShowAvatar={shouldShowAvatar}
                isDelete={c.isDeleted}
                index={index + i}
                reactions={c._count.MessageReaction}
              >
                {
                  <div className="absolute bottom-2 right-2 text-black font-medium text-[10px]">
                    <span className="p-1 text-color-base-100">{convertToMessageDate(c.createdAt)}</span>
                  </div>
                }
              </SingleMessage>
            }
          </div>
        );
      });
    });
  // console.log(messageEl)
  // const otherParticipant = participants.length === 2 ? participants.filter(i => i.id !== userId) : undefined
  // const existContact = otherParticipant ? entities.find(i => i.userId === otherParticipant[0].id) : undefined
  // const avatar = (otherParticipant ? (isValidUrl(decodeURIComponent(otherParticipant[0].avatar)))
  //   ? decodeURIComponent(otherParticipant[0].avatar)
  //   : 'https://d3lugnp3e3fusw.cloudfront.net/' + decodeURIComponent(otherParticipant[0].avatar) : undefined)

  return (
    <div className="h-screen pb-12 w-full flex flex-col overflow-hidden px-[1px] transition-all">
      {/* <div className='bg-red-200 w-full h-8 ' ref={ref}>Hello</div> */}
      {/* {
                status === "pending" ? (
                    <p className='bg-red-200'> Loading ....</p>
                ) : status === 'error' ? (
                    <p> Error</p>
                ) : (
                    <></>
                )
            } */}
      <div ref={messageEl} className=" w-full flex flex-col-reverse overflow-y-scroll h-screen" onScroll={handleScroll}>
        {/* status === 'pending' ? (
                    <p>Loading...</p>
                ) : status === 'error' ? (
                    <span>Error: {error.message}</span>
                ) */}
        {content}
        {/* {(!isGroup && !existContact && !isFetchingNextPage && !state?.isBlocked) &&
          <div className='w-full flex items-center justify-center py-4 pb-16'>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <img src={avatar} alt="" className='w-14 h-14 rounded-full' />
              <h1 className='font-semibold'>{`You and ${participants.filter(i => i.id !== userId)[0].fullName} is not friend.`}</h1>
              <h1 className='font-semibold'>{`Become friend with them to see their status and more.`}</h1>
              <button className='text-color-base-100 font-medium bg-surface-mix-500 px-4 py-2 rounded-lg hover:scale-105 transition-all'>Send Request</button>
            </div>
          </div>} */}
        {data && !isGroup && <ChatBanner />}
      </div>
      {showTyping && (
        <div className={clsx('w-full')}>
          <div className="flex items-center ml-64 gap-4">
            <div className="rounded-full w-14 h-14 overflow-hidden  ">
              <img src={'https://d3lugnp3e3fusw11.cloudfront.net/'} alt="" className="w-full h-full" />
            </div>
            <div className={clsx('bg-surface-mix-300 rounded-xl p-4 flex items-center gap-1 ')}>
              <div className="animate-dots-flashing w-2 h-2 rounded-full bg-white relative text-gray-800 delay-0 "></div>
              <div className="animate-dots-flashing w-2 h-2 rounded-full bg-white relative  animation-delay-[100ms] "></div>
              <div className="animate-dots-flashing w-2 h-2 rounded-full bg-white relative  animation-delay-[200ms] "></div>
            </div>
          </div>
        </div>
      )}
      {/* <MessageTyping /> */}
      <BouncingMessage handleClickBouncing={handleClickBouncing} />
    </div>
  );
};
export default MessagesBox;
