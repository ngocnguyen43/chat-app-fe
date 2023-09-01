import React from 'react'
import ConversationName from './main/ConversationName'
import ConversationUtils from './main/ConversationUtils'
import gif from "../../assets/emojibest_com_QrPlane.gif"
import image from "../../assets/preview.png"
import fe from "../../assets/fe.jpg"

import clsx from 'clsx';

import fourDots from '../../assets/fourdots.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Message, useFetchMessage } from '../../hooks/useFetchMessage';
import { socket } from '../../service/socket';
// import { setOpen } from '../../store/advance-messages-slice';
import { convertToDate, generateRandomString, getMimeType, groupMessagesByDateTime, validURL } from '../../utils';
import Icon from './../atoms/Icon';
import { useLocation } from 'react-router-dom';
import { Storage } from '../../service/LocalStorage';
import { useFetchConversationParticipants } from '../../hooks/useFetchConversationParticipants';
import { useFormatConversationStatus } from '../../hooks/useFormatConversationStatus';
import { setConversationOpen } from '../../store/open-covnersation-slice';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useFetchPeerId } from '../../hooks/useFetchPeerId';
import { FaMicrophone } from 'react-icons/fa6';
import { URLMetadata, getMetadata, } from '../../hooks/useFetchMetaData';
import { useQuery } from 'react-query';
import { useUploadFile } from '../../hooks/useUploadFile';
// import { PreviewFile } from './../PreviewFile';
// import { TextBox } from './../TextBox';
import { FaFileAlt, FaImage } from 'react-icons/fa'
import { TbFileDescription, TbLocationFilled } from "react-icons/tb"
import { IoCloseOutline } from 'react-icons/io5';
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
    content: string | string[] | { url: string, type: "image" | "video" }[],
    type: "receiver" | "sender"
    messageType: "text" | "image"

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
        time: "1669689601",
        content: "How are you?",
        type: "receiver",
        messageType: "text"
    },
    {
        time: "1669689602",
        content: "How are you?",
        type: "receiver",
        messageType: "text"
    },
    {
        time: "1669689603",
        content: "How are you?",
        type: "receiver",
        messageType: "text"
    },
    {
        time: "1669689604",
        content: "How are you?",
        type: "sender",
        messageType: "text"
    },
    {
        time: "1669689605",
        content: ["https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fencrypted-tbn1.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcRWWl0PO7qFWCsi9Wvf57JmYbfLEWqWWx1mBqinse1nEvEnyomeU-Uuq_3snC1fh_nr50svczyRaZbOvBk&psig=AOvVaw0z1ExSIMiJBOZHua4H7gDb&ust=1693668179456000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNCVz-PbiYEDFQAAAAAdAAAAABAE",
            "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
            "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",

        ],
        type: "sender",
        messageType: "image"
    },
]
function Main() {
    const advanceMessageBoxRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const { isOpen } = useAppSelector(state => state.advanceMessage)
    const location = useLocation()
    const path = location.pathname.split("/")
    const key = Storage.Get("key")
    const dispatch = useAppDispatch()
    const id = Storage.Get("current_conversation_id")
    // const name = Storage.Get("current_conversation")
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
    // let currentUser = "";
    // let showAvatar = false;
    const textboxRef = React.useRef<HTMLDivElement>(null)
    const { mutate } = useUploadFile()
    // const [currentLocation, setCurrentLocation] = React.useState<{ lat: number, lgn: number }>()
    // const handleSetCurrentLocation = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     event.preventDefault();
    //     dispatch(setOpen(false))
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((data) => {
    //             // setCurrentLocation({ ...currentLocation, lat: data.coords.latitude, lgn: data.coords.longitude })
    //             const messageId = crypto.randomUUID()
    //             const time = Math.round(new Date().getTime() / 1000);
    //             setMessages((prev) => [...(prev as []),
    //             {
    //                 messageId,
    //                 conversationId: id,
    //                 type: "location",
    //                 sender: key,
    //                 recipients: [],
    //                 isDeleted: false,
    //                 createdAt: time.toString(),
    //                 showAvatar: false,
    //                 location: {
    //                     lat: data.coords.latitude,
    //                     lgn: data.coords.longitude
    //                 }
    //             } as Message
    //             ])
    //         })
    //     }
    // }, [dispatch, id, key])
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
        const isScrolled = event.currentTarget.offsetHeight + event.currentTarget.scrollTop < event.currentTarget.scrollHeight;
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
        scrollToBottom();
    }, [])
    React.useEffect(() => {
        const currentvalue = textboxRef.current!;
        if (currentvalue && !isBoucing) {
            currentvalue.addEventListener("input", () => {
                scrollToBottom()
            })
        }
        return () => {
            currentvalue.removeEventListener("input", () => {
                scrollToBottom();
            })
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
    const [shouldShowAdvanceMessage, setShouldShowAdvanceMessage] = React.useState<boolean>(false)
    const [shouldShowFileMessage, setShouldShowFileMessage] = React.useState<boolean>(false)
    const debounce = React.useRef<NodeJS.Timeout | null>(null)
    React.useEffect(() => {
        const handler = (event: MouseEvent) => {
            if ((advanceMessageBoxRef.current?.contains(event.target as HTMLElement) || advanceMessageButtonRef.current?.contains(event.target as HTMLElement))) {
                if (debounce.current) {
                    clearTimeout(debounce.current)
                }
                debounce.current = setTimeout(() => {
                    setShouldShowAdvanceMessage(true)
                }, 30)
            }
            else {
                if (debounce.current) {
                    clearTimeout(debounce.current)
                }
                debounce.current = setTimeout(() => {
                    setShouldShowAdvanceMessage(false)
                }, 30)
            }
        }
        document.addEventListener("mousemove", handler)
        return () => {
            document.removeEventListener("mousemove", handler)
        }
    }, [])
    // const groupedMessages = groupMessagesByDateTime(messages as [])
    return (
        <>
            <main className=' py-8 gap-6 flex flex-col  h-full w-full relative '>
                <div className='flex justify-between items-center px-10'>
                    <ConversationName />
                    <ConversationUtils />
                </div>
                <div ref={messageEl} className='h-full w-full flex flex-col gap-3 overflow-auto px-2 relative' onScroll={handleScroll} >
                    {mocks.map(item => (

                        <div key={item.time} className={clsx('w-full h-auto px-60 gap-4 flex', item.type === "sender" ? "flex-row" : "flex-row-reverse")}>
                            {item.type === "sender" && <div className='rounded-full w-14 h-14 bg-green-300'></div>}
                            {
                                item.messageType === "text" && <div className='bg-slate-200 max-w-[500px] rounded-2xl p-2  whitespace-pre-wrap break-words'>
                                    <p>{(item.content as string).repeat(20)}</p>
                                </div>
                            }
                            {
                                item.messageType === "image" &&
                                <div className='max-w-[500px] h-auto flex shrink-[1] flex-wrap'>
                                    {
                                        (item.content as string[]).map((image, index, arr) => (
                                            <div key={image} className={clsx('flex-1 rounded-[8px] overflow-hidden', arr.length === 1 ? "" : "basis-[calc(50%-0.5rem)]")}>
                                                <img src={image} alt="" className={clsx("w-full object-cover align-middle", arr.length === 1 ? "" : "h-48")} />
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    ))}

                </div>
                <div className='flex w-full  items-center gap-2 z-10 justify-center bg-inherit'>
                    <div className='w-[60%] flex items-end justify-center gap-2 relative'>

                        <div ref={advanceMessageButtonRef} className='bg-purple-700  rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center relative'>
                            <div className='cursor-pointer'  >
                                <img src={fourDots} alt="" className='w-10' />
                            </div>
                            <div ref={advanceMessageBoxRef} className={clsx('absolute bottom-12 left-0 z-10 p-2 inline-block text-sm font-medium bg-gray-600/80 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 origin-bottom-left', !shouldShowAdvanceMessage ? " opacity-0 scale-0" : "opacity-100 scale-100  ")}>
                                <button type="button" className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2" onClick={() => {
                                    setShouldShowAdvanceMessage(false);
                                    setShouldShowFileMessage(true)
                                }}>
                                    <Icon className='text-xl'>
                                        <TbFileDescription />
                                    </Icon>
                                    <span>
                                        File
                                    </span>
                                </button>
                                <button type="button" className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                                    <Icon className='text-xl'>
                                        <FaImage />
                                    </Icon>
                                    <span>
                                        Image or Video
                                    </span>
                                </button>
                                <button type="button" className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2 ">
                                    <Icon className='text-xl'>
                                        <TbLocationFilled />
                                    </Icon>
                                    <span>
                                        Location
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col bg-[#343142] min-h-[40px] w-[90%] border-2  border-none rounded-lg items-center' >
                            {/* <form onSubmit={hanldeSubmit}> */}
                            {/* <Input className='absolute !rounded-xl  !px-2 !text-xl w-full pr-4 break-all break-words'
                            onChange={(event) => setMessage(event.target.value)} value={message}
                            onBlur={handleOnBlur} onFocus={handleOnFocus}
                        /> */}
                            {/* {files.length > 0 && <div className='w-full py-2 bg-[#343142] flex gap-2 rounded-t-lg  items-center px-4'>
                        {files.map(data => {
                            return (
                                <PreviewFile url={data.url} type={data.type} file={data.file} key={data.url} onClick={handleOnclickImage} />
                            )
                        })}
                    </div>} */}

                            <div ref={textboxRef} contentEditable className=' px-4 py-2 align-middle rounded-md text-xl leading-[1.2] break-all break-words min-h-[40px] max-h-[160px]   w-full overflow-auto focus:outline-none ' onKeyDown={async (event) => await handleOnKeyDown(event)} onBlur={handleOnBlur} onFocus={handleOnFocus} >
                            </div>
                            <input className='hidden' type='file' multiple id='file' onChange={handleOnChangeFileUpLoad} />
                        </div>
                        <button className='btn-primary w-10 h-10 rounded-lg focus:outline-none flex items-center justify-center'>
                            <Icon className='text-2xl'>
                                <FaMicrophone />
                            </Icon>
                        </button>
                        {isBoucing && <div className='absolute z-20 bottom-20 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-blue-500 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-blue-400'>
                            <button onClick={handleClickBoucing}>
                                <Icon className='text-xl text-white'>
                                    <AiOutlineArrowDown />
                                </Icon>
                            </button>
                        </div>}
                    </div>
                </div>

            </main >
            {shouldShowFileMessage && <>
                <div className='fixed top-0 left-0 w-full h-screen bg-black/25 z-10'></div>
                <div className='absolute bg-white  max-w-[26.5rem]  h-auto p-2 min-h-[300px] top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col drop-shadow-lg rounded-lg overflow-hidden gap-2'>
                    {
                        // ref
                    }
                    <div className='w-full h-auto flex gap-4 items-center' >
                        <button className='w-10 h-10 rounded-full hover:bg-slate-100 flex  items-center justify-center' onClick={() => setShouldShowFileMessage(false)}>
                            <Icon className='text-3xl'>
                                <IoCloseOutline />
                            </Icon>
                        </button>
                        <span className='pointer-events-none'>Send File</span>
                    </div>
                    <div className='w-full h-full flex shrink-[1] flex-wrap gap-2'>
                        <div className=' flex-1 basis-[calc(50%-1rem)] rounded-[8px] overflow-hidden relative'>
                            <img src={fe} alt="" className="h-48 w-full object-cover align-middle" />
                            <div className='absolute right-1 top-1 bg-gray-100 rounded-full cursor-pointer'>
                                <Icon className=' text-black'>
                                    <IoCloseOutline />
                                </Icon>
                            </div>
                        </div>
                        {/* <div className=' flex-1 basis-[calc(50%-1rem)] rounded-[8px] overflow-hidden relative'>
                            <img src={fe} alt="" className="h-48 w-full object-cover align-middle" />
                            <div className='absolute right-1 top-1 bg-gray-100 rounded-full cursor-pointer'>
                                <Icon className=' text-black'>
                                    <IoCloseOutline />
                                </Icon>
                            </div>
                        </div>
                        <div className=' flex-1 basis-[calc(50%-1rem)] rounded-[8px] overflow-hidden relative'>
                            <img src={fe} alt="" className="h-48 w-full object-cover align-middle" />
                            <div className='absolute right-1 top-1 bg-gray-100 rounded-full cursor-pointer'>
                                <Icon className=' text-black'>
                                    <IoCloseOutline />
                                </Icon>
                            </div>
                        </div> */}
                    </div>
                    <button className='w-full btn-primary rounded-[8px] py-2'>Send Message</button>
                </div>
            </>}

        </>
    )
}
export default React.memo(Main)