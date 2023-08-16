import clsx from 'clsx';
import React from 'react';
import { BsSend } from 'react-icons/bs';
import {
    IoAttach, IoCallOutline, IoImages, IoLocationOutline, IoMicOutline, IoSearchOutline,
    IoVideocamOutline
} from 'react-icons/io5';

import fourDots from '../assets/fourdots.svg';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Message, useFetchMessage } from '../hooks/useFetchMessage';
import { useCreateMessage } from '../hooks/useMessage';
import { socket } from '../service/socket';
import { setOpen } from '../store/advance-messages-slice';
import { convertToDate, generateRandomString, groupMessagesByDateTime } from '../utils';
import Icon from './atoms/Icon';
import { useLocation } from 'react-router-dom';
import { Storage } from '../service/LocalStorage';
import { useFetchConversationParticipants } from '../hooks/useFetchConversationParticipants';
import { useFormatConversationStatus } from '../hooks/useFormatConversationStatus';
import { setConversationOpen } from '../store/open-covnersation-slice';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useFetchPeerId } from '../hooks/useFetchPeerId';
import { FaBan } from 'react-icons/fa6';

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
    mode: "sender" | "receiver" | "typing"
    content: string
    type: "text" | "image" | "location" | "hybrid"
    isRead: boolean
    showAvatar: boolean
    // time: number,
    id: string,
}
const MessageBox: React.FC<Partial<MessageProps>> = React.memo(({ content, type, mode = "receiver", showAvatar, id, className }) => {
    // const timestamp = unixTimestampToDateWithHour(time)
    return (
        <>
            {mode !== "typing" ? <div className={clsx('flex gap-2 px-2 items-center my-3 relative', { "justify-end ": mode === "receiver", "justify-start": mode === "sender" })}>
                {(showAvatar) && <span className='bg-cyan-300 rounded-md w-10 h-10 absolute top-0'>
                </span>}
                <div id={id} className={clsx('bg-blue-100 rounded-md p-2 text-sm max-w-[300px] break-words', { "ml-12": mode === "sender", "mr-12": mode === "receiver" })}>
                    {type === "text" && content}
                    {type === "image" && <img src={content} alt=''></img>}
                </div>
            </div> :
                <div className='flex gap-2 items-center relative'>
                    <span className='bg-cyan-300 rounded-md w-10 h-10 absolute top-0'></span>
                    <div className={clsx('bg-blue-50 rounded-md p-2 ml-12 h-10 flex items-center gap-1 ', className || "")}>
                        <div className='animate-dot-flashing-linear w-2 h-2 rounded-full bg-gray-500 relative text-gray-500 delay-0'></div>
                        <div className='animate-dot-flashing w-2 h-2 rounded-full bg-gray-200 relative text-gray-500 delay-500'></div>
                        <div className='animate-dot-flashing w-2 h-2 rounded-full bg-gray-400 relative text-gray-500 delay-1000'></div>
                    </div>
                </div >
            }
        </>
    )
})
function Chat() {
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageBannerRef = React.useRef<HTMLDivElement>(null)
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
    const [isTypeing, setIsTyping] = React.useState<boolean>(false)
    const [isBoucing, setIsBoucing] = React.useState<boolean>(false)
    const [peerId, setPeerId] = React.useState<string>()
    // const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id +"l"?? "")
    const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id ?? "")
    let currentUser = "";
    let showAvatar = false;
    const textboxRef = React.useRef<HTMLDivElement>(null)
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
    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        event.preventDefault();
        // const initHeight = event.currentTarget;
        // console.log("check init height", initHeight)
        // console.log(first)
        const isScrolled = event.currentTarget.offsetHeight + event.currentTarget.scrollTop < event.currentTarget.scrollHeight
        setIsBoucing(isScrolled)
        // console.log("scroll height", event.currentTarget.scrollHeight)

    }
    const handleClickBoucing = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        scrollToBottom()
    }
    const handleOnFocus = (event: React.FocusEvent<HTMLDivElement, Element>) => {
        event.preventDefault()
        socket.emit("typing", { room: id, user: key })
    }
    const handleOnBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
        event.preventDefault()
        socket.emit("not typing", { room: id, user: key })
    }
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const text = event.currentTarget.innerText
            hanldeSubmit(text)
            event.currentTarget.innerText = ""
        }
    }
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        console.log(textboxRef.current?.innerText)
        if (textboxRef.current?.innerText) {
            textboxRef.current.innerText = ""
        }
    }
    const handleOnClickVideo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const randomToken = generateRandomString(92);
        // dispatch(setVideoToken(randomToken))
        Storage.Set("video-token", randomToken)
        const popup = window.open(`/video/${randomToken}`, "_blank", "popup=1")
        if (popup) {
            popup.onbeforeunload = function () {
                Storage.Del("video-token")
            }
        }
    }
    const hanldeSubmit = (text: string) => {
        const messageId = crypto.randomUUID()
        const time = Math.round(new Date().getTime() / 1000);
        socket.auth = { id: key }
        socket.emit("private message", { room: id, message: { id: messageId, conversation: id, sender: key, content: text, time, type: "text" } })
        setMessages((prev) => [...(prev as []),
        {
            messageId,
            conversationId: id,
            type: "text",
            content: text,
            sender: key,
            recipients: [],
            isDeleted: false,
            createdAt: time.toString(),
            showAvatar: false
        } as Message
        ])
        // if (messages) {
        //     (messages as unknown[]).push(,)
        // }
    }
    React.useEffect(() => {
        if (peer && !isFetchPeerError) {
            Storage.Set("peer-id", peer.id)
            setPeerId(peer.id)
        }
    }, [isFetchPeerError, peer])
    React.useEffect(() => {
        if (!isParticipantsLoading) {
            setParticipant(participants?.filter((item) => item.userId !== key))
        }
    }, [isParticipantsLoading, key, participants])
    React.useEffect(() => {
        socket.auth = { id: key };
        socket.on("private message", (arg: ArrayElementType<typeof data> & { time: number }) => {
            if (arg.conversationId === path[path.length - 1]) {
                setMessages(prev => [...(prev as []), { ...arg, createdAt: arg.time.toString() }])
            }
        })
        return () => {
            socket.off("private message")
        }
    }, [key, path])
    // loiii
    React.useEffect(() => {
        if (messageEl && !isBoucing) {
            messageEl.current?.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
            });
            // messageEl.current?.addEventListener('load', event => {
            //     const { currentTarget: target } = event;
            //     (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
            // });
        }
    }, [isBoucing])
    React.useEffect(() => {
        if (!isBoucing) {
            scrollToBottom();
        }
    }, [isBoucing])
    React.useEffect(() => {
        dispatch(setConversationOpen(true))
    }, [dispatch])
    React.useEffect(() => {
        if (participant?.length === 1) {
            socket.emit("get user status", participant[0])
        }
        socket.on("get user status", (arg: { id: string, lastLogin: string, status: "online" | "offline" }) => {
            setStatus(arg.status)
            setLastlogin(arg.lastLogin ? arg.lastLogin : 0)

        })
    }, [participant])
    React.useEffect(() => {
        socket.on("user online chat", (arg: { id: string, status: "online" }) => {
            if (participant && participant.length === 1 && arg.id === participant[0].userId) {
                setStatus(arg.status)
            }
        })
        socket.on("user offline chat", (arg: { id: string, lastLogin: string, status: "offline" }) => {
            if (participant && participant.length === 1 && arg.id === participant[0].userId) {
                setStatus(arg.status)
                setLastlogin(arg.lastLogin)
            }
        })
        socket.on("user typing", (arg: string) => {
            if (participant && participant.length === 1 && arg === participant[0].userId) {
                setIsTyping(true)
            }
        })
        socket.on("user not typing", (arg: string) => {
            if (participant && participant.length === 1 && arg === participant[0].userId) {
                setIsTyping(false)
            }
        })

        return () => {
            socket.off("user online chat")
            socket.off("user offline chat")
            socket.off("user typing")
            socket.off("user not typing")
        }

    }, [participant])
    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setMessages(data)
        }
    }, [data, isFetching, isLoading])
    const groupedMessages = groupMessagesByDateTime(messages as [])
    const now = useFormatConversationStatus(+lastLogin)
    // const groupedMessages = groupMessagesByDateTime(messages as [])
    return (
        <main className='relative flex flex-col px-2  h-full w-[900px] '>
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
                    <div>
                        <Icon className='text-2xl cursor-pointer ' >
                            <button>
                                <IoCallOutline />
                            </button>
                        </Icon>
                    </div>
                    <div className='relative flex items-center justify-center' title={clsx(!peerId ? "video call is not available in this time" : "")}>
                        <Icon className={clsx('text-2xl', peerId ? "cursor-pointer" : "cursor-default")} >
                            <button onClick={handleOnClickVideo} disabled={!peerId} >
                                <IoVideocamOutline />
                            </button>
                        </Icon>
                        {!peerId ? <Icon className='absolute top-1/2 left-1/2 -translate-x-1/2 text-red-500 text-3xl -translate-y-1/2'>
                            <FaBan />
                        </Icon> : null}
                    </div>
                    <div>
                        <Icon className='text-2xl cursor-pointer' >
                            <IoSearchOutline />
                        </Icon>
                    </div>
                    {/* <span onClick={() => dispatch(setRMenuOpen(!isRMenuOpen))}>
                        <Icon className='text-xl cursor-pointer' >
                            <BsThreeDotsVertical />
                        </Icon>
                    </span> */}
                </div>
            </div>
            <div className=' h-[calc(100%-100px)] flex-col gap-4 overflow-y-auto pb-4' ref={messageEl} onScroll={handleScroll}>
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
                {isTypeing &&
                    <MessageBox mode='typing' showAvatar={true} />
                }
            </div>
            <div className='flex w-full items-center gap-1 min-h-[40px] z-10'>
                <div ref={advanceMessageButtonRef} className='flex justify-between flex-row min-h-[40px] w-[5%]'>
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
                    {/* <div className='w-full bg-white'>
                </div> */}
                </div>
                <div className='flex flex-col bottom-0 bg-white min-h-[40px] w-[90%] border-2 border-solid border-blue-300 rounded-md items-center' >
                    {/* <form onSubmit={hanldeSubmit}> */}
                    {/* <Input className='absolute !rounded-xl  !px-2 !text-xl w-full pr-4 break-all break-words'
                            onChange={(event) => setMessage(event.target.value)} value={message}
                            onBlur={handleOnBlur} onFocus={handleOnFocus}
                        /> */}
                    {/* <div className='w-full h-[50px] '></div> */}
                    <div ref={textboxRef} contentEditable className=' pl-2 align-middle rounded-md text-xl leading-[1.8] break-all break-words min-h-[40px] w-full  focus:outline-none' onKeyDown={handleOnKeyDown} onBlur={handleOnBlur} onFocus={handleOnFocus}>
                    </div>
                </div>
                <div className='flex items-center justify-center m-2'>
                    <button className='text-2xl' onClick={handleOnClick}>
                        <BsSend />
                    </button>
                </div>
            </div>
            {isBoucing && <div className='absolute z-20 bottom-16 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-blue-500 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-blue-400'>
                <button onClick={handleClickBoucing}>
                    <Icon className='text-xl text-white'>
                        <AiOutlineArrowDown />
                    </Icon>
                </button>
            </div>}
        </main>
    )
}
export default React.memo(Chat)