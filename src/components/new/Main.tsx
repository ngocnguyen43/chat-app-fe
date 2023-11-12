import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
// import { PreviewFile } from './../PreviewFile';
// import { TextBox } from './../TextBox';
import { FaFileAlt, FaImage } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { TbFileDescription, TbLocationFilled } from 'react-icons/tb';
import { NavLink, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useCreateMediaMessage } from '../../hooks/useCreateMediaMessage';
import { useFetchConversationParticipants } from '../../hooks/useFetchConversationParticipants';
import { Message, useFetchMessage } from '../../hooks/useFetchMessage';
import { useFetchPeerId } from '../../hooks/useFetchPeerId';
import { useCreateMessage } from '../../hooks/useMessage';
import { useUploadFile } from '../../hooks/useUploadFile';
import { Storage } from '../../service/LocalStorage';
import { socket } from '../../service/socket';
import { setShowBouncing } from '../../store/bouncing-slice';
import { setCallBoxOpen } from '../../store/open-call-slice';
import { selectedMessage, unselectedMessage } from '../../store/selectedMessage-slice';
// import { setOpen } from '../../store/advance-messages-slice';
import { convertToMessageDate, formatGroupedDate, generateRandomString } from '../../utils';
import Icon from '../atoms/Icon';
import ConversationName from './main/ConversationName';
import ConversationUtils from './main/ConversationUtils';
import MessageTyping, { mockMessages } from './main/Message/MessageTyping';
import MessageInput from './main/MessageInput';
import PhoneIcon from './PhoneIcon';

interface ISingleMessage extends React.PropsWithChildren {
    data: Message["message"]
    id: string,
    sender: string | undefined
    avatar: string | undefined,
    shouldShowAvatar: boolean,
    isDelete: boolean
}
interface IMessageBox extends React.PropsWithChildren {
    messages: Message[] | undefined,
    setIsBouncing: (value: boolean) => void,
    isBouncing: boolean
}
interface IBoucingMesssageBox {
    handleClickBouncing: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const mockCallPeer = {
    id: "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
}
export const BouncingMessage: React.FunctionComponent<IBoucingMesssageBox> = ({ handleClickBouncing }) => {
    const { isOpen } = useAppSelector(state => state.bouncing)
    return <>
        <div className={clsx('absolute z-20 bottom-24 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-blue-500 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-blue-400', isOpen ? "visible" : "invisible")}>
            <button onClick={handleClickBouncing}>
                <Icon className='text-xl text-white'>
                    <AiOutlineArrowDown />
                </Icon>
            </button>
        </div>
    </>
}
const SingleMessage: React.FunctionComponent<ISingleMessage> = React.memo(function SingleMessage(props) {
    const { data, children, id, sender, avatar, shouldShowAvatar, isDelete } = props
    const [isSelected, setIsSelected] = React.useState<boolean>(false)
    const { message } = useAppSelector(state => state.selectedMessage)
    const divRef = React.useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const handleOnClick = React.useCallback(() => {
        if (isSelected) {
            setIsSelected(false)
            dispatch(unselectedMessage(id))
        } else {
            setIsSelected(true)
            dispatch(selectedMessage(id))
        }
    }, [dispatch, id, isSelected])
    // console.log(id + " " + isVisible)
    return <>
        {<div ref={divRef} className={clsx('w-full h-auto gap-4 flex py-2  relative transition-all origin-center', sender ? "flex-row" : "flex-row-reverse", isSelected ? "bg-purple-500/10 cursor-pointer" : "", message.length > 0 ? "px-72" : "px-64")} onClick={() => {
            if (message.length > 0 && !sender) {

                handleOnClick()
            }
        }}
        >
            {
                sender &&
                <motion.div className='rounded-full w-14 h-14 overflow-hidden'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, type: "tween" }}
                    style={{ originX: sender ? 0 : 1, originY: 0.5 }}
                >
                    {
                        shouldShowAvatar ?
                            <img src={"https://d3lugnp3e3fusw.cloudfront.net/" + avatar} alt='' className='w-full h-full' /> : null
                    }
                </motion.div>
            }
            <motion.div className={clsx('max-w-[500px] h-auto flex shrink-[1] flex-wrap relative ', !sender ? "cursor-pointer" : "")} onClick={() => {
                if (message.length === 0 && !sender) {

                    handleOnClick()
                }
            }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "tween" }}
                style={{ originX: sender ? 0 : 1, originY: 0.5 }}
            >
                {
                    data.map((item, _index, arr) => {
                        if (item.type === "text") {
                            return (
                                <div key={item.content} className={clsx(' text-white font-medium max-w-[500px] flex flex-col gap-1 rounded-2xl  whitespace-pre-wrap break-words ', isDelete ? "items-center justify-center px-2 border-purple-400 border-2" : "pb-8 p-2 bg-purple-400")}>
                                    {!isDelete && <p>{(item.content).repeat(20)}</p>}
                                    {isDelete && <p><i>usent message</i></p>}
                                </div>
                            )
                        } else {
                            return (
                                <div key={item.content} className={clsx('flex-1 rounded-[8px] overflow-hidden cursor-pointer', arr.length === 1 ? "" : "basis-[calc(50%-0.5rem)]")}>
                                    {item.type === "image" &&
                                        <>
                                            <img src={item.content.startsWith("blob:") ? item.content : "https://d3lugnp3e3fusw.cloudfront.net/" + item.content} alt="" className={clsx("w-full bg-gray-500 object-cover align-middle", arr.length === 1 ? "" : "h-48")} />
                                        </>
                                    }
                                    {
                                        item.type === "video" && <div className='relative'>

                                            <video src={item.content} className={clsx("w-full object-cover align-middle", arr.length === 1 ? "" : "h-48")} >
                                                <track default kind="captions" srcLang="en" />
                                            </video>
                                            <span className='absolute bottom-1 left-1 z-10 text-white'>{12}</span>
                                        </div>
                                    }
                                </div>
                            )
                        }
                    })
                }{
                    !isDelete && children
                }
            </motion.div>
            {!sender && <div className={clsx("absolute  w-6 h-6 ring-4 ring-gray-500 rounded-full flex items-center justify-center bg-red-100 -translate-x-1/2 -translate-y-1/2 top-1/2 left-40 transition-all", message.length > 0 ? "opacity-100" : "opacity-0")}>
                <Icon className={clsx("text-green-600 transition-all", isSelected ? "visible block" : "invisible hidden")} size='2em'>
                    <BsCheckLg />
                </Icon>
            </div>}
        </div >}
    </>
})

const MessagesBox = React.memo(function MessageBox({ messages }: IMessageBox) {
    const messageEl = React.useRef<HTMLDivElement>(null);
    // console.log(messages)
    const { entities } = useAppSelector(state => state.contacts)
    const [mockMsgs, setMockMsgs] = React.useState(mockMessages)
    const dispatch = useAppDispatch()
    const scrollToBottom = () => {
        if (messageEl.current) {
            messageEl.current.scrollTop = messageEl.current.scrollHeight;
        }
    };
    const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        event.preventDefault();
        const isScrolled = event.currentTarget.offsetHeight + event.currentTarget.scrollTop < event.currentTarget.scrollHeight;
        dispatch(setShowBouncing(isScrolled))

    }, [dispatch])
    const handleClickBouncing = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        scrollToBottom()
    }
    React.useEffect(() => {
        const current = messageEl.current
        const handler = (event: Event) => {
            const { currentTarget: target } = event;
            (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
        }
        if (current) {
            current.addEventListener('DOMNodeInserted', handler);
            current.addEventListener('load', handler);
            return () => {
                current.removeEventListener("DOMNodeInserted", handler)
                current.removeEventListener("load", handler)
            }
        }

    }, [])
    React.useEffect(() => {
        scrollToBottom();
    })
    return (
        <div ref={messageEl} className='h-full w-full flex flex-col overflow-y-auto px-[1px] transition-all' onScroll={handleScroll}>
            {mockMsgs && mockMsgs.map((c, i, arr) => {
                const imgUrl = entities.find(entity => entity.userId === c.sender)?.avatar
                const shouldShowAvatar = i === 0 || c.sender !== arr[i - 1].sender || c.group !== arr[i - 1].group
                return (
                    <React.Fragment key={Math.random() + c.createdAt}>
                        {i > 0 && c.group !== arr[i - 1].group && <div className='w-full flex items-center justify-center '>
                            <div className='bg-purple-400 my-3 p-2 rounded-2xl'>
                                <span className='text-white font-medium'>
                                    {formatGroupedDate(c.group)}
                                </span>
                            </div>
                        </div>}
                        {i === 0 && <div className='w-full flex items-center justify-center'>
                            <div className='bg-purple-400 my-3 p-2 rounded-2xl'>
                                <span className='text-white font-medium'>
                                    {formatGroupedDate(c.group)}
                                </span>
                            </div></div>}
                        {
                            <SingleMessage data={c.message} id={c.messageId} sender={c.sender} avatar={imgUrl} shouldShowAvatar={shouldShowAvatar} isDelete={c.isDeleted}>{<div className='absolute bottom-2 right-2 text-black font-medium text-[10px]'>
                                <span className='p-1 text-white'>{convertToMessageDate(c.createdAt)}</span>
                            </div>}</SingleMessage>
                        }
                    </React.Fragment>
                )
            })}
            {
                <div className={clsx('w-full')}>
                    <div className='flex items-center ml-64 gap-4'>
                        <div className='rounded-full w-14 h-14 overflow-hidden  '>
                            <img src={"https://d3lugnp3e3fusw11.cloudfront.net/"} alt='' className='w-full h-full' />
                        </div>
                        <div className={clsx('bg-purple-400 rounded-xl p-4 flex items-center gap-1 ')}>
                            <div className='animate-dots-flashing w-2 h-2 rounded-full bg-white relative text-gray-800 delay-0 '></div>
                            <div className='animate-dots-flashing w-2 h-2 rounded-full bg-white relative  animation-delay-[100ms] '></div>
                            <div className='animate-dots-flashing w-2 h-2 rounded-full bg-white relative  animation-delay-[200ms] '></div>
                        </div>
                    </div>
                </div>
            }
            {/* <MessageTyping /> */}
            <BouncingMessage handleClickBouncing={handleClickBouncing} />
        </div>
    )
})
const getCurrentUnixTimestamp = () => {
    const date = new Date().toLocaleDateString()
    const group = new Date(date).getTime().toString();
    return group
}
function Main() {
    const location = useLocation()
    const path = location.pathname.split("/")
    const key = Storage.Get("key")
    const conversationId = path.at(-1)
    const savedConversationId = Storage.Get("id") as string
    const userId = Storage.Get("key") as string;
    // const name = Storage.Get("current_conversation")
    // const [messages, setMessages] = React.useState<typeof data>([])
    // const [peerId, setPeerId] = React.useState<string>()
    const [text, setText] = React.useState<string>("")
    // const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id +"l"?? "")
    // const { data: peer, isError: isFetchPeerError } = useFetchPeerId(conversationId ?? "")
    // let currentUser = "";
    // let showAvatar = false;
    const { mutate } = useCreateMessage()
    const { mutate: mutateMedia } = useCreateMediaMessage()
    // const location = useLocation()
    const currentConversation = location.pathname.split("/").at(-1) as string;
    // const { data: messageApi } = useFetchMessage(currentConversation)
    const [messages, setMessages] = React.useState(mockMessages || []);
    const [isBoucing, setIsBoucing] = React.useState<boolean>(false)
    const { shouldCallBoxOpen } = useAppSelector(state => state.callBox)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        socket.on("update messages", (args: Message[]) => {
            setMessages(args)
        })
    })
    // React.useEffect(() => {
    //     if (messageApi) {
    //         setMessages(messageApi);
    //     }
    // }, [messageApi])
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

    const handleOnFocus = (event: React.FocusEvent<HTMLDivElement, Element>) => {
        event.preventDefault()
        socket.emit("typing", { room: conversationId, user: key })
        socket.emit("mark unread messages", { conversation: conversationId, user: key, time: Date.now().toString() })
    }
    const handleOnBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
        event.preventDefault()
        socket.emit("not typing", { room: conversationId, user: key })
    }
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const text = event.currentTarget.innerText.trim()
            const messageId = v4();
            if (text) {
                setMessages(prev => [...prev,
                {
                    messageId,
                    conversationId: currentConversation,
                    message: [{
                        type: 'text',
                        content: text,
                    }],
                    // sender?: {
                    //   id: string,
                    //   avatar: string
                    // }
                    recipients: [],
                    isDeleted: false,
                    createdAt: Date.now().toString(),
                    group: getCurrentUnixTimestamp(),
                }
                ])
                // socket.emit("private message", ({ id: messageId, conversation: conversationId ?? savedConversationId, time: Date.now().toString(), message: [{ type: "text", content: text }], sender: userId }))
            }
            event.currentTarget.innerText = ""
            // console.log(files)
            // if (files.length > 0) {
            //     await Promise.all(files.map(async (data) => {
            //         const messageId = crypto.randomUUID()
            //         const time = Math.round(new Date().getTime() / 1000);
            //         const mime = await getMimeType(data.file)
            //         // console.log(mime)
            //         if (mime.startsWith("image/")) {
            //             const msg = {
            //                 messageId,
            //                 conversationId: id,
            //                 type: "image",
            //                 sender: key,
            //                 recipients: [],
            //                 isDeleted: false,
            //                 createdAt: time.toString(),
            //                 showAvatar: false,
            //                 // url: data.url
            //                 url: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245"
            //             } as Message;
            //             mutate({ file: data.file, id: messageId, conversation: id ?? "", type: "image", "sender": key ?? "", content: "", time })
            //             setMessages(prev => [...prev as [],
            //                 msg
            //             ])
            //             data.type = "image"
            //         }
            //         if (mime.startsWith("video/")) {
            //             console.log(data.file)
            //             const msg = {
            //                 messageId,
            //                 conversationId: id,
            //                 type: "video",
            //                 sender: key,
            //                 recipients: [],
            //                 isDeleted: false,
            //                 createdAt: time.toString(),
            //                 showAvatar: false,
            //                 url: data.url
            //             } as Message;
            //             setMessages(prev => [...prev as [], msg])
            //         }
            //     }))
            //     setFiles([])
            //     // setFiles(prev => prev.)
            // }
        }
    }
    const handleSubmitFiles = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (files.length > 0) {
            const messageId = v4();
            const data = files.map(file => {
                return {
                    content: file.url,
                    type: file.file.type.split("/")[0] as "image" | "video" | "text"
                }
            })
            console.log(new Date(+getCurrentUnixTimestamp()).toISOString())
            console.log(new Date().toISOString())
            setMessages(prev => [...prev, {
                messageId,
                conversationId: currentConversation,
                group: getCurrentUnixTimestamp(),
                message: data,
                recipients: [],
                isDeleted: false,
                createdAt: Date.now().toString(),
            }])
            mutateMedia({ id: messageId, conversation: conversationId as string, time: Date.now().toString(), sender: key as string, file: files })
            // setShouldOpenFilePreview(false)
            setFiles([])
        }
    }
    console.log(getCurrentUnixTimestamp())
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
    const [files, setFiles] = React.useState<{ file: File, url: string, type?: string }[]>([])
    React.useEffect(() => {
        if (files.length > 0) {
            return () => {
                files.forEach(file => URL.revokeObjectURL(file.url))
            }
        }
    }, [files, files.length])
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
                        type: tmp.type.split("/")[1]
                    };
                    setFiles(prev => [...prev, obj])
                })
                event.currentTarget.value = ""
                // setShouldOpenFilePreview(true)
            }
        }
    }, [])
    const handleRejectCall = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        dispatch(setCallBoxOpen(false))
    }
    const handleAcceptCall = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        dispatch(setCallBoxOpen(false))
        const randomToken = generateRandomString(92);
        Storage.Set("video-token", randomToken)
        const popup = window.open(`/video/${randomToken}`, "_blank", "popup=1")
        if (popup) {
            popup.onbeforeunload = function () {
                Storage.Del("video-token")
            }
        }
    }
    // const [messages, setMessages] = React.useState(mocks)
    // const groupedMessages = groupMessagesByDateTime(messages as [])
    React.useEffect(() => {
        if (files.length > 0) {
            return () => {
                files.map(file => URL.revokeObjectURL(file.url))
            }
        }
    }, [files])
    const { entities } = useAppSelector(state => state.contacts)
    const { avatar, fullName } = entities.find(i => i.userId === "0df1ab3a-d905-45b0-a4c1-9e80ed660012")!
    return (
        <>
            <main className=' pb-8 flex flex-col  h-full w-[75%] relative '>
                <div className='flex justify-between items-center px-20 bg-[#221f34] py-4'>
                    <ConversationName />
                    <ConversationUtils />
                </div>
                <MessagesBox messages={messages} isBouncing={isBoucing} setIsBouncing={setIsBoucing} />
                <MessageInput handleOnBlur={handleOnBlur} handleOnChangeFileUpLoad={handleOnChangeFileUpLoad} handleOnFocus={handleOnFocus} handleOnKeyDown={handleOnKeyDown} />
            </main >
            {files.length > 0 && <>
                <div className='fixed top-0 left-0 w-full h-screen bg-black/25 z-10'></div>
                <div className='absolute bg-white  max-w-[26.5rem]  h-auto p-2 min-h-[300px] top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col drop-shadow-lg rounded-lg overflow-hidden gap-2'>
                    {
                        // ref
                    }
                    <div className='w-full h-auto flex gap-4 items-center' >
                        <button className='w-10 h-10 rounded-full hover:bg-slate-100 flex  items-center justify-center' onClick={() => {
                            // setShouldOpenFilePreview(false)
                            files.length > 0 && files.forEach(file => URL.revokeObjectURL(file.url))
                            setFiles([])
                        }}>
                            <Icon className='text-2xl'>
                                <IoCloseOutline />
                            </Icon>
                        </button>
                        <span className='pointer-events-none'>Send File</span>
                    </div>
                    <div className='w-full h-full flex shrink-[1] flex-wrap gap-2'>
                        {
                            files.map((item, _index, arr) => {
                                const id = v4();
                                console.log(item.type)
                                return (
                                    <div key={item.file.name + id} className={clsx('flex-1 rounded-[8px] overflow-hidden relative', arr.length === 1 ? "w-96" : "basis-[calc(50%-0.5rem)]")}>
                                        <img src={item.url} alt="" className={clsx("w-full object-cover align-middle", arr.length === 1 ? "h-full" : "h-48")} />
                                        <div className='absolute right-1 top-1 w-4 h-4 bg-gray-100 rounded-full cursor-pointer'>
                                            <button onClick={() => setFiles(prev => prev.filter(file => file.url !== item.url))}>
                                                <Icon className=' text-black'>
                                                    <IoCloseOutline />
                                                </Icon>
                                            </button>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <button className='w-full btn-primary rounded-[8px] py-2' onClick={handleSubmitFiles}>Send Message</button>
                </div>
            </>}
            {shouldCallBoxOpen && <>
                <div className='absolute top-0 left-0 w-full h-screen bg-black/30 z-30 flex items-center justify-center'>
                    <div className='px-5 py-5 bg-[#1e1b2e] rounded-2xl'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className="avatar relative ">
                                <div className={clsx("w-24 rounded-full")}>
                                    <img src={"https://d3lugnp3e3fusw.cloudfront.net/" + avatar} alt='minh ngoc' />
                                </div>
                            </div>
                            <h2 className='text-[28px] font-medium mt-5'>{fullName} is calling you</h2>
                        </div>
                        <div className='flex items-center justify-between mt-10'>
                            <button className='w-16 h-16 rounded-full flex items-center justify-center bg-green-600 cursor-pointer transition-all hover:bg-green-500' onClick={handleAcceptCall}>
                                <PhoneIcon color='green' />
                            </button>
                            <button className='w-16 h-16 rounded-full flex items-center justify-center bg-red-600 cursor-pointer transition-all hover:bg-red-500' onClick={handleRejectCall}>
                                <PhoneIcon color='red' />
                            </button>
                        </div>
                    </div>
                </div>
            </>}

        </>
    )
}
export default React.memo(Main)
