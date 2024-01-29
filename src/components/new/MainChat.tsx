/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Storage } from '../../service/LocalStorage';
import { setCallBoxOpen } from '../../store/open-call-slice';
import { generateRandomString } from '../../utils';
import MessagesBox from '../MessagesBox';
import MessageInput from './main/MessageInput';
import PhoneIcon from './PhoneIcon';

const ConversationUtils = React.lazy(() => import('./main/ConversationUtils'));
const ConversationName = React.lazy(() => import('./main/ConversationName'));

// const mockCallPeer = {
//     id: "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
// }

function MainChat() {
  const { shouldCallBoxOpen } = useAppSelector((state) => state.callBox);

  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //     dispatch(fetchMessagesThunk(currentConversation))
  // }, [currentConversation, dispatch])

  // const handleOnClickVideo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     event.preventDefault();
  //     const randomToken = generateRandomString(92);
  //     // dispatch(setVideoToken(randomToken))
  //     Storage.Set("video-token", randomToken)
  //     const popup = window.open(`/video/${randomToken}`, "_blank", "popup=1")
  //     if (popup) {
  //         popup.onbeforeunload = function () {
  //             Storage.Del("video-token")
  //         }
  //     }
  // }
  // fecth metadata
  // const { refetch } = useQuery<URLMetadata>({ queryKey: `query-key-${url}`, queryFn: async () => await getMetadata(url), enabled: false })

  // const hanldeSubmit = (text: string) => {
  //     const messageId = crypto.randomUUID()
  //     const time = Math.round(new Date().getTime() / 1000);
  //     // socket.auth = { id: key }
  //     // socket.emit("private message", { room: id, message: { id: messageId, conversation: id, sender: key, content: text, time, type: "text" } })
  //     setText(() => text)
  //     const validUrl = validURL(text);
  //     console.log({ text, validUrl })
  //     if (validUrl) {
  //         setUrl(validUrl)
  //         // refetch().then((data) => { console.log(data.data) }, () => { })
  //         // console.log(metadata)
  //     } else {
  //         setMessages((prev) => [...(prev as []),
  //         {
  //             messageId,
  //             conversationId: id,
  //             type: "text",
  //             content: text,
  //             sender: key,
  //             recipients: [],
  //             isDeleted: false,
  //             createdAt: time.toString(),
  //             showAvatar: false,
  //         } as Message
  //         ])
  //     }
  //     // if (messages) {
  //     //     (messages as unknown[]).push(,)
  //     // }
  // }

  // React.useEffect(() => {
  //     if (url && text) {
  //         const messageId = crypto.randomUUID()
  //         const time = Math.round(new Date().getTime() / 1000);
  //         console.log(text.split(" ").length)
  //         refetch().then((data) => {
  //             setMessages((prev) => [...(prev as []),
  //             {
  //                 messageId,
  //                 conversationId: id,
  //                 type: "link",
  //                 content: text,
  //                 sender: key,
  //                 recipients: [],
  //                 isDeleted: false,
  //                 createdAt: time.toString(),
  //                 showAvatar: false,
  //                 meta: data.data
  //             } as Message
  //             ])
  //         }, () => { })
  //     }
  // }, [refetch, url])
  // React.useEffect(() => {
  //     if (peer && !isFetchPeerError) {
  //         Storage.Set("peer-id", peer.id)
  //         setPeerId(peer.id)
  //     }
  // }, [isFetchPeerError, peer])
  // React.useEffect(() => {
  //     if (!isParticipantsLoading) {
  //         setParticipant(participants?.filter((item) => item.userId !== key))
  //     }
  // }, [isParticipantsLoading, key, participants])
  // React.useEffect(() => {
  //     socket.auth = { id: key };
  //     socket.on("private message", (arg: ArrayElementType<typeof data> & { time: number }) => {
  //         if (arg.conversationId === path[path.length - 1]) {
  //             setMessages(prev => [...(prev as []), { ...arg, createdAt: arg.time.toString() }])
  //         }
  //     })
  //     return () => {
  //         socket.off("private message")
  //     }
  // }, [key, path])
  // loiii

  // React.useEffect(() => {
  //     const currentvalue = textboxRef.current!;
  //     if (currentvalue && !isBoucing) {
  //         currentvalue.addEventListener("input", () => {
  //             // scrollToBottom()
  //         })
  //     }
  //     return () => {
  //         currentvalue.removeEventListener("input", () => {
  //             // scrollToBottom();
  //         })
  //     }
  // }, [isBoucing])
  // React.useEffect(() => {
  //     dispatch(setConversationOpen(true))
  // }, [dispatch])
  // React.useEffect(() => {
  //     if (participant?.length === 1) {
  //         socket.emit("get user status", participant[0])
  //     }
  //     socket.on("get user status", (arg: { id: string, lastLogin: string, status: "online" | "offline" }) => {
  //         setStatus(arg.status)
  //         setLastlogin(arg.lastLogin ? arg.lastLogin : 0)

  //     })
  // }, [participant])
  // React.useEffect(() => {
  //     socket.on("user online chat", (arg: { id: string, status: "online" }) => {
  //         if (participant && participant.length === 1 && arg.id === participant[0].userId) {
  //             setStatus(arg.status)
  //         }
  //     })
  //     socket.on("user offline chat", (arg: { id: string, lastLogin: string, status: "offline" }) => {
  //         if (participant && participant.length === 1 && arg.id === participant[0].userId) {
  //             setStatus(arg.status)
  //             setLastlogin(arg.lastLogin)
  //         }
  //     })
  //     socket.on("user typing", (arg: string) => {
  //         if (participant && participant.length === 1 && arg === participant[0].userId) {
  //             setIsTyping(true)
  //         }
  //     })
  //     socket.on("user not typing", (arg: string) => {
  //         if (participant && participant.length === 1 && arg === participant[0].userId) {
  //             setIsTyping(false)
  //         }
  //     })
  //     socket.on("yeah", (arg) => { console.log(arg) })
  //     return () => {
  //         socket.off("user online chat")
  //         socket.off("user offline chat")
  //         socket.off("user typing")
  //         socket.off("user not typing")
  //         socket.off("yeah")
  //     }

  // }, [participant])
  // React.useEffect(() => {
  //     if (!isLoading && !isFetching) {
  //         setMessages(data)
  //     }
  // }, [data, isFetching, isLoading])
  // const groupedMessages = groupMessagesByDateTime(messages as [])
  // const groupedMessages = React.useMemo(() => groupMessagesByDateTime(messages as []), [messages])

  // React.useEffect(() => {
  //     throw new Error()
  // }, [])
  // throw new Error("");

  const handleRejectCall = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(setCallBoxOpen(false));
  };
  const handleAcceptCall = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(setCallBoxOpen(false));
    const randomToken = generateRandomString(92);
    Storage.Set('video-token', randomToken);
    const popup = window.open(`/video/${randomToken}`, '_blank', 'popup=1');
    if (popup) {
      popup.onbeforeunload = function () {
        Storage.Del('video-token');
      };
    }
  };
  // const [messages, setMessages] = React.useState(mocks)
  // const groupedMessages = groupMessagesByDateTime(messages as [])
  return (
    <>
      <main className=" pb-8 flex flex-col  h-full w-[75%] relative ">
        <div className="flex justify-between items-center px-20 bg-[#221f34] py-4">
          <ConversationName />
          <ConversationUtils />
        </div>
        <MessagesBox />
        <MessageInput />
      </main>
      {shouldCallBoxOpen && (
        <>
          <div className="absolute top-0 left-0 w-full h-screen bg-black/30 z-30 flex items-center justify-center">
            <div className="px-5 py-5 bg-[#1e1b2e] rounded-2xl">
              <div className="flex flex-col items-center justify-center">
                <div className="avatar relative ">
                  <div className={clsx('w-24 rounded-full')}>
                    <img src={'https://d3lugnp3e3fusw.cloudfront.net/' + ''} alt="minh ngoc" />
                  </div>
                </div>
                <h2 className="text-[28px] font-medium mt-5">{''} is calling you</h2>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-green-600 cursor-pointer transition-all hover:bg-green-500"
                  onClick={handleAcceptCall}
                >
                  <PhoneIcon color="green" />
                </button>
                <button
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-red-600 cursor-pointer transition-all hover:bg-red-500"
                  onClick={handleRejectCall}
                >
                  <PhoneIcon color="red" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default React.memo(MainChat);
