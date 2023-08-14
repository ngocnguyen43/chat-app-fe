import clsx from 'clsx';
import React from 'react';
import { BsSend } from 'react-icons/bs';
import {
    IoAttach, IoCallOutline, IoImages, IoLocationOutline, IoMicOutline, IoSearchOutline,
    IoVideocamOutline
} from 'react-icons/io5';

import fourDots from '../assets/fourdots.svg';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useFetchMessage } from '../hooks/useFetchMessage';
import { useCreateMessage } from '../hooks/useMessage';
import { socket } from '../service/socket';
import { setOpen } from '../store/advance-messages-slice';
import { convertToDate, groupMessagesByDateTime } from '../utils';
import Icon from './atoms/Icon';
import Input from './atoms/Input';
import { useLocation } from 'react-router-dom';
import { Storage } from '../service/LocalStorage';
import { useFetchConversationParticipants } from '../hooks/useFetchConversationParticipants';
import { useFormatConversationStatus } from '../hooks/useFormatConversationStatus';
import { setConversationOpen } from '../store/open-covnersation-slice';

interface MessageProps {
    mode?: "sender" | "receiver"
    content: string
    type: "text" | "image" | "location" | "hybrid"
    isRead?: boolean
    showAvatar: boolean
    // time: number,
    id: string,
}
const MessageBox: React.FC<MessageProps> = React.memo(({ content, type, mode = "receiver", showAvatar, id }) => {
    // const timestamp = unixTimestampToDateWithHour(time)
    return (
        <>
            <div className={clsx('flex gap-2 px-2 items-center my-3 relative', { "justify-end ": mode === "receiver", "justify-start": mode === "sender" })}>
                {(showAvatar) && <span className='bg-cyan-300 rounded-md w-10 h-10 absolute top-0'>
                </span>}
                <div id={id} className={clsx('bg-blue-100 rounded-md p-2 text-sm max-w-[300px] break-words', { "ml-12": mode === "sender", "mr-12": mode === "receiver" })}>
                    {type === "text" && content}
                    {type === "image" && <img src={content} alt=''></img>}
                </div>
            </div>
        </>
    )
})
export default function Chat() {
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageBannerRef = React.useRef<HTMLDivElement>(null)
    const [message, setMessage] = React.useState<string>("")
    const { isOpen } = useAppSelector(state => state.advanceMessage)
    // const { isRMenuOpen } = useAppSelector(state => state.rightMenu)
    const location = useLocation()
    const path = location.pathname.split("/")
    const key = Storage.Get("key")
    const dispatch = useAppDispatch()
    // console.log("advance message:::::", isOpen);
    const id = Storage.Get("current_conversation_id")
    const name = Storage.Get("current_conversation")
    const { data, error, isLoading, isFetching } = useFetchMessage(path[path.length - 1])
    const { data: participants, error: fetchParticipantsError, isLoading: isParticipantsLoading } = useFetchConversationParticipants()
    const mutation = useCreateMessage();
    const [messages, setMessages] = React.useState<typeof data>([])
    const [participant, setParticipant] = React.useState<{ userId: string }[]>()
    const [status, setStatus] = React.useState<"online" | "offline">("offline")
    const [lastLogin, setLastlogin] = React.useState<string | 0>(0)
    let currentUser = "";
    let showAvatar = false;
    // React.useEffect(() => {
    //     const advanceMessageHandler = (e: MouseEvent) => {
    //         if ((!(advanceMessageBannerRef.current?.contains(e.target as Node)) && !advanceMessageButtonRef.current?.contains(e.target as Node) && isOpen) || (advanceMessageBannerRef.current?.contains(e.target as Node) && isOpen)) {
    //             dispatch(setOpen(false))
    //         }
    //     }
    //     document.addEventListener("mousedown", advanceMessageHandler)
    //     return () => {
    //         document.removeEventListener("mousedown", advanceMessageHandler)
    //     }
    // })
    const messageEl = React.useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (messageEl.current) {
            messageEl.current.scrollTop = messageEl.current.scrollHeight;
        }
    };
    React.useEffect(() => {
        if (!isParticipantsLoading) {
            setParticipant(participants?.filter((item) => item.userId !== key))
        }
    }, [isParticipantsLoading, key, participants])
    React.useEffect(() => {
        socket.auth = { id: key };
        socket.on("private message", (arg: ArrayElementType<typeof data> & { time: number }) => {
            setMessages(prev => [...(prev as []), { ...arg, createdAt: arg.time.toString() }])
        })
        return () => {
            socket.off("private message response")
        }
    }, [key])
    React.useEffect(() => {
        if (messageEl) {
            messageEl.current?.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])
    React.useEffect(() => {
        scrollToBottom();
    })
    React.useEffect(() => {
        dispatch(setConversationOpen(true))
    }, [dispatch])
    React.useEffect(() => {
        if (participant?.length === 1) {
            socket.emit("get user status", participant[0])
        }
        socket.on("get user status", (arg: { id: string, lastLogin: string, status: "online" | "offline" }) => {
            console.log(arg)
            setStatus(arg.status)
            setLastlogin(arg.lastLogin ? arg.lastLogin : 0)

        })
    }, [participant])
    React.useEffect(() => {
        socket.on("user online chat", (arg: { id: string, status: "online" }) => {
            setStatus(arg.status)
        })
        socket.on("user offline chat", (arg: { id: string, lastLogin: string, status: "offline" }) => {
            setStatus(arg.status)
            setLastlogin(arg.lastLogin)
        })
        return () => {
            socket.off("get user status")
            socket.off("user online chat")
            socket.off("user offline chat")
        }

    })
    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setMessages(data)
        }
    }, [data, isFetching, isLoading])
    const groupedMessages = groupMessagesByDateTime(messages as [])
    const hanldeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const messageId = crypto.randomUUID()
        const time = Math.round(new Date().getTime() / 1000);
        //  mutation.mutate({ id: messageId, conversation: id, sender: user, content: message, time: time, type: "text" })
        // {
        //     "messageId": "1e9a9078-219b-4fe3-90af-4d65b37a1414",
        //     "conversationId": "02c97165-a887-4db7-8c47-d29f13d162c5",
        //     "type": "text",
        //     "content": "hi",
        //     "sender": "b279a33f-1661-4fce-bbbc-8699a59eb036",
        //     "recipients": [
        //         "da1af207-b00c-478d-8632-920ee1a96a66"
        //     ],
        //     "isDeleted": false,
        //     "createdAt": "1690679599"
        // },
        socket.auth = { id: key }
        socket.emit("private message", { room: id, message: { id: messageId, conversation: id, sender: key, content: message, time, type: "text" } })
        if (messages) {
            (messages as unknown[]).push({
                messageId,
                conversationId: id,
                type: "text",
                content: message,
                sender: key,
                recipients: [],
                isDeleted: false,
                createdAt: time.toString(),
                showAvatar: false
            },)
            setMessage("")
        }
    }
    console.log(status)
    const now = useFormatConversationStatus(+lastLogin)
    // const groupedMessages = groupMessagesByDateTime(messages as [])
    return (
        <main className=' flex flex-col px-2  h-full w-[900px] '>
            <div className='flex flex-row items-center  justify-between h-16 px-4 border-b-2'>
                <div className='flex items-center justify-center gap-8'>
                    <div className='justify-self-stretch grid'>
                        <div className='justify-self-end rounded-md w-12 h-12 bg-cyan-300'></div>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>{name}</h2>
                        <span className='text-sm flex items-center gap-2 '><div className={clsx('h-3 w-3 rounded-full ', status === "online" ? "bg-green-500" : "bg-red-500")}></div>  {status === "online" ? "online" : lastLogin === 0 ? "a long time ago" : now}</span>
                    </div>
                </div>
                <div className='flex flex-row gap-6 ml-4'>
                    <Icon className='text-2xl cursor-pointer' >
                        <IoCallOutline />
                    </Icon>
                    <Icon className='text-2xl cursor-pointer' >
                        <IoVideocamOutline />
                    </Icon>
                    <Icon className='text-2xl cursor-pointer' >
                        <IoSearchOutline />
                    </Icon>
                    {/* <span onClick={() => dispatch(setRMenuOpen(!isRMenuOpen))}>
                        <Icon className='text-xl cursor-pointer' >
                            <BsThreeDotsVertical />
                        </Icon>
                    </span> */}
                </div>
            </div>
            <div className=' h-[calc(100%-100px)] flex-col gap-4 overflow-y-auto pb-4' ref={messageEl}>
                {isFetching && <div>Loading...</div>}
                {
                    groupedMessages && Object.entries(groupedMessages).length > 0 ? Object.entries(groupedMessages).map(([date, timeGroups]) => (
                        <div key={date}>
                            <div className='text-sm w-full flex justify-center'>
                                <span>{convertToDate(date)}</span>
                            </div>
                            {
                                Object.entries(timeGroups).map(([time, message]) => {
                                    showAvatar = currentUser !== message.sender
                                    currentUser = message.sender
                                    message.showAvatar = showAvatar
                                    return <div key={time}>
                                        {<MessageBox content={message.content.repeat(20)} id={message.conversationId} type="text" mode={message.sender === (key) ? "receiver" : "sender"} showAvatar={message.showAvatar} />}
                                    </div>
                                })
                            }
                        </div>
                    )) : null
                }
            </div>
            <div ref={advanceMessageButtonRef} className='flex justify-between flex-row w-full h-[40px]'>
                <div className='relative flex items-center gap-2 flex-row h-full mx-1' onClick={() => dispatch(setOpen(!isOpen))}>
                    <img src={fourDots} alt="" className='w-14 cursor-pointer ' />
                </div>
                <div ref={advanceMessageBannerRef} className={clsx('flex flex-row items-center justify-around absolute w-36 h-10 bg-white -translate-x-1/3 rounded-xl drop-shadow-md', isOpen ? "opacity-100 bottom-16 translate-y-0 visible transition-all ease-in duration-300" : "transition-all ease-out duration-300 bottom-8 -translate-y-1 invisible opacity-0")}>
                    <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' >
                        <Icon className='text-xl' color='white'>
                            <IoAttach />
                        </Icon>
                    </div>
                    <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' >
                        <Icon className='text-base' color='white'>
                            <IoImages />
                        </Icon>
                    </div>
                    <div className='w-6 h-6 rounded-full bg-gray-400/90 flex items-center justify-center' >
                        <Icon className='text-xl' color='white'>
                            <IoMicOutline />
                        </Icon>
                    </div>
                    <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' >
                        <Icon className='text-xl' color='white'>
                            <IoLocationOutline />
                        </Icon>
                    </div>
                </div>
                <div className='relative flex w-full bottom-0'>
                    <form onSubmit={hanldeSubmit}>
                        <Input className='absolute !rounded-xl  !px-2 !text-xl w-full ' onChange={(event) => setMessage(event.target.value)} value={message} />
                        <button className='absolute text-2xl top-[1/6] right-0 translate-y-[50%] -translate-x-4'>
                            <BsSend />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
