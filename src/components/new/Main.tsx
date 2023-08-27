import React from 'react'
import ConversationName from './main/ConversationName'
import ConversationUtils from './main/ConversationUtils'

import clsx from 'clsx';
import {
    IoAttach, IoCallOutline, IoLocationOutline, IoMicOutline, IoSearchOutline,
    IoSend,
    IoVideocamOutline
} from 'react-icons/io5';

import fourDots from '../../assets/fourdots.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Message, useFetchMessage } from '../../hooks/useFetchMessage';
import { socket } from '../../service/socket';
import { setOpen } from '../../store/advance-messages-slice';
import { convertToDate, generateRandomString, getMimeType, groupMessagesByDateTime, validURL } from '../../utils';
import Icon from './../atoms/Icon';
import { useLocation } from 'react-router-dom';
import { Storage } from '../../service/LocalStorage';
import { useFetchConversationParticipants } from '../../hooks/useFetchConversationParticipants';
import { useFormatConversationStatus } from '../../hooks/useFormatConversationStatus';
import { setConversationOpen } from '../../store/open-covnersation-slice';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useFetchPeerId } from '../../hooks/useFetchPeerId';
import { FaBan } from 'react-icons/fa6';
import { URLMetadata, getMetadata, } from '../../hooks/useFetchMetaData';
import { useQuery } from 'react-query';
import { useUploadFile } from '../../hooks/useUploadFile';
import { PreviewFile } from './../PreviewFile';
import { TextBox } from './../TextBox';
// export default function Main() {
//     return (
//         <main className='w-[60%] h-full flex flex-col px-6 py-8 gap-6'>
//             <div className='flex justify-between items-center'>
//                 <ConversationName />
//                 <ConversationUtils />
//             </div>
//             <div></div>
//         </main>
//     )
// }
interface Itext {
    time: string,
    content: string | string[],
    type: "receiver" | "sender"
    messageType: "text"

}
const mocks: Itext[] = [
    {
        time: "1669862400",
        content: "Hello!",
        type: "receiver",
        messageType: "text"
    },
    {
        time: "1669776000",
        content: "Hi there!",
        type: "sender",
        messageType: "text"
    },
    {
        time: "1669689600",
        content: "How are you?",
        type: "receiver",
        messageType: "text"
    },
]
function Main() {
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageBannerRef = React.useRef<HTMLDivElement>(null)
    const { isOpen } = useAppSelector(state => state.advanceMessage)
    const location = useLocation()
    const path = location.pathname.split("/")
    const key = Storage.Get("key")
    const dispatch = useAppDispatch()
    const id = Storage.Get("current_conversation_id")
    const name = Storage.Get("current_conversation")
    const { data, isLoading, isFetching } = useFetchMessage(path[path.length - 1])
    const { data: participants, isLoading: isParticipantsLoading } = useFetchConversationParticipants()
    const [messages, setMessages] = React.useState<typeof data>([])
    const [participant, setParticipant] = React.useState<{ userId: string }[]>()
    const [status, setStatus] = React.useState<"online" | "offline">("offline")
    const [lastLogin, setLastlogin] = React.useState<string | 0>(0)
    const [isTypeing, setIsTyping] = React.useState<boolean>(false)
    const [isBoucing, setIsBoucing] = React.useState<boolean>(false)
    const [peerId, setPeerId] = React.useState<string>()
    const [url, setUrl] = React.useState<string>("")
    const [text, setText] = React.useState<string>("")
    // const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id +"l"?? "")
    const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id ?? "")
    let currentUser = "";
    let showAvatar = false;
    const textboxRef = React.useRef<HTMLDivElement>(null)
    const { mutate } = useUploadFile()
    // const [currentLocation, setCurrentLocation] = React.useState<{ lat: number, lgn: number }>()
    const handleSetCurrentLocation = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(setOpen(false))
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                // setCurrentLocation({ ...currentLocation, lat: data.coords.latitude, lgn: data.coords.longitude })
                const messageId = crypto.randomUUID()
                const time = Math.round(new Date().getTime() / 1000);
                setMessages((prev) => [...(prev as []),
                {
                    messageId,
                    conversationId: id,
                    type: "location",
                    sender: key,
                    recipients: [],
                    isDeleted: false,
                    createdAt: time.toString(),
                    showAvatar: false,
                    location: {
                        lat: data.coords.latitude,
                        lgn: data.coords.longitude
                    }
                } as Message
                ])
            })
        }
    }, [dispatch, id, key])
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
    const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const text = event.currentTarget.innerText.trim()
            if (text) {
                hanldeSubmit(text)
            }
            event.currentTarget.innerText = ""
            // console.log(files)
            if (files.length > 0) {
                await Promise.all(files.map(async (data) => {
                    const messageId = crypto.randomUUID()
                    const time = Math.round(new Date().getTime() / 1000);
                    const mime = await getMimeType(data.file)
                    // console.log(mime)
                    if (mime.startsWith("image/")) {
                        const msg = {
                            messageId,
                            conversationId: id,
                            type: "image",
                            sender: key,
                            recipients: [],
                            isDeleted: false,
                            createdAt: time.toString(),
                            showAvatar: false,
                            // url: data.url
                            url: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245"
                        } as Message;
                        mutate({ file: data.file, id: messageId, conversation: id ?? "", type: "image", "sender": key ?? "", content: "", time })
                        setMessages(prev => [...prev as [],
                            msg
                        ])
                        data.type = "image"
                    }
                    if (mime.startsWith("video/")) {
                        console.log(data.file)
                        const msg = {
                            messageId,
                            conversationId: id,
                            type: "video",
                            sender: key,
                            recipients: [],
                            isDeleted: false,
                            createdAt: time.toString(),
                            showAvatar: false,
                            url: data.url
                        } as Message;
                        setMessages(prev => [...prev as [], msg])
                    }
                }))
                setFiles([])
                // setFiles(prev => prev.)
            }
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
    // fecth metadata
    const { refetch } = useQuery<URLMetadata>({ queryKey: `query-key-${url}`, queryFn: async () => await getMetadata(url), enabled: false })
    const hanldeSubmit = (text: string) => {
        const messageId = crypto.randomUUID()
        const time = Math.round(new Date().getTime() / 1000);
        // socket.auth = { id: key }
        // socket.emit("private message", { room: id, message: { id: messageId, conversation: id, sender: key, content: text, time, type: "text" } })
        setText(() => text)
        const validUrl = validURL(text);
        console.log({ text, validUrl })
        if (validUrl) {
            setUrl(validUrl)
            // refetch().then((data) => { console.log(data.data) }, () => { })
            // console.log(metadata)
        } else {
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
                showAvatar: false,
            } as Message
            ])
        }
        // if (messages) {
        //     (messages as unknown[]).push(,)
        // }
    }
    React.useEffect(() => {
        if (url && text) {
            const messageId = crypto.randomUUID()
            const time = Math.round(new Date().getTime() / 1000);
            console.log(text.split(" ").length)
            refetch().then((data) => {
                setMessages((prev) => [...(prev as []),
                {
                    messageId,
                    conversationId: id,
                    type: "link",
                    content: text,
                    sender: key,
                    recipients: [],
                    isDeleted: false,
                    createdAt: time.toString(),
                    showAvatar: false,
                    meta: data.data
                } as Message
                ])
            }, () => { })
        }
    }, [refetch, url])
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
        socket.on("yeah", (arg) => { console.log(arg) })
        return () => {
            socket.off("user online chat")
            socket.off("user offline chat")
            socket.off("user typing")
            socket.off("user not typing")
            socket.off("yeah")
        }

    }, [participant])
    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setMessages(data)
        }
    }, [data, isFetching, isLoading])
    // const groupedMessages = groupMessagesByDateTime(messages as [])
    // const groupedMessages = React.useMemo(() => groupMessagesByDateTime(messages as []), [messages])
    const now = useFormatConversationStatus(+lastLogin)
    const [files, setFiles] = React.useState<{ file: File, url: string, type?: string }[]>([])
    const handleOnChangeFileUpLoad = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            if (event.currentTarget.files[0].size > 5500000) {
                alert("file too big")
                event.currentTarget.value = ""
            } else {
                const tmps = event.currentTarget.files
                tmps.length > 0 && Array.from(tmps).forEach((tmp) => {
                    const tmpBlob = URL.createObjectURL(tmp)
                    const obj: { file: File, url: string, type: string } = {
                        file: tmp,
                        url: tmpBlob,
                        type: ''
                    };
                    // getMimeType(tmp, mime => { obj.type = mime; obj.url = tmpBlob })
                    // console.log(obj)
                    setFiles(prev => [...prev, obj])
                })
                event.currentTarget.value = ""
            }
        }
    }, [])

    const handleOnclickImage = React.useCallback((url: string) => {
        setFiles(prev => prev.filter(item => item.url !== url))
    }, [])
    // const groupedMessages = groupMessagesByDateTime(messages as [])
    return (
        <main className=' px-6 py-8 gap-6 flex flex-col  h-full w-[60%] '>
            <div className='flex justify-between items-center'>
                <ConversationName />
                <ConversationUtils />
            </div>
            <div className='h-full w-full flex flex-col gap-4'>
                {mocks.map(item => (

                    <div key={item.type} className={clsx('w-full h-auto  gap-3 flex', item.type === "sender" ? "flex-row" : "flex-row-reverse")}>
                        {item.type === "sender" && <div className='rounded-full w-14 h-14 bg-green-300'></div>}
                        <div className='bg-slate-200 max-w-[500px] rounded-2xl p-2  whitespace-pre-wrap break-words'>
                            <p>{(item.content as string).repeat(20)}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className=' h-[calc(100%-110px)] max-h-full flex-col gap-4 overflow-y-auto pb-4' ref={messageEl} onScroll={handleScroll}>
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
                                        {<TextBox content={message.content} id={message.conversationId} type={message.type} mode={message.sender === (key) ? "receiver" : "sender"} showAvatar={message.showAvatar} meta={message.meta ?? undefined} location={message.location ?? undefined} url={message.url ?? undefined} />}
                                    </div>
                                })
                            }
                        </div>
                    )) : null
                }
                {isTypeing &&
                    <TextBox mode='typing' showAvatar={true} />
                }
            </div> */}
            <div className='flex w-full items-center gap-2 min-h-[40px] z-10'>
                <div ref={advanceMessageButtonRef} className='flex justify-between flex-col min-h-[40px] w-[5%] bottom-0'>
                    {files.length > 0 && <div className='w-full h-[70px]'></div>}
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white h-[40px] bg-[#343142]  rounded-lg text-center inline-flex items-center " type="button">
                        <img src={fourDots} alt="" className='w-28 cursor-pointer ' />
                    </button>
                    {/* <div className='relative flex items-center gap-2 flex-row h-[40px] justify-center mx-1' onClick={() => dispatch(setOpen(!isOpen))}>
                    </div> */}
                    <div ref={advanceMessageBannerRef} className={clsx('flex flex-row items-center justify-around absolute w-36 h-10 bg-white -translate-x-1/3 rounded-xl drop-shadow-md', isOpen ? "opacity-100 bottom-16 translate-y-0 visible transition-all ease-in duration-300" : "transition-all ease-out duration-300 bottom-8 -translate-y-1 invisible opacity-0")}>
                        <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' onClick={() => {
                            dispatch(setOpen(false))
                        }}>
                            <label htmlFor="file" className='cursor-pointer'>
                                <Icon className='text-xl' color='white'>
                                    <IoAttach />
                                </Icon>
                            </label>
                        </div>
                        <div className='w-6 h-6 rounded-full bg-gray-400/90 flex items-center justify-center' >
                            <Icon className='text-xl' color='white'>
                                <IoMicOutline />
                            </Icon>
                        </div>
                        <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' onClick={handleSetCurrentLocation}>
                            <Icon className='text-xl' color='white'>
                                <IoLocationOutline />
                            </Icon>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col bottom-0 bg-[#343142] min-h-[40px] w-[90%] border-2  border-none rounded-lg items-center' >
                    {/* <form onSubmit={hanldeSubmit}> */}
                    {/* <Input className='absolute !rounded-xl  !px-2 !text-xl w-full pr-4 break-all break-words'
                            onChange={(event) => setMessage(event.target.value)} value={message}
                            onBlur={handleOnBlur} onFocus={handleOnFocus}
                        /> */}
                    {files.length > 0 && <div className='w-full py-2 bg-[#343142] flex gap-2 rounded-t-lg  items-center px-4'>
                        {files.map(data => {
                            return (
                                <PreviewFile url={data.url} type={data.type} file={data.file} key={data.url} onClick={handleOnclickImage} />
                            )
                        })}
                    </div>}
                    {                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    }
                    <div ref={textboxRef} contentEditable className=' pl-4 align-middle rounded-md text-xl leading-[1.8] break-all break-words min-h-[40px] w-full  focus:outline-none' onKeyDown={async (event) => await handleOnKeyDown(event)} onBlur={handleOnBlur} onFocus={handleOnFocus}>
                    </div>
                    <input className='hidden' type='file' multiple id='file' onChange={handleOnChangeFileUpLoad} />
                </div>
                {/* <div className='flex items-center justify-center m-2'>
                    <button className='text-2xl' onClick={handleOnClick}>
                        <Icon className='text-blue-700'>
                            <IoSend />
                        </Icon>
                    </button>
                </div> */}
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
export default React.memo(Main)