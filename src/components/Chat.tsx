// import clsx from 'clsx';
// import React from 'react';
// import { AiOutlineArrowDown } from 'react-icons/ai';
// import { FaBan } from 'react-icons/fa6';
// import {
//     IoAttach, IoCallOutline, IoLocationOutline, IoMicOutline, IoSearchOutline, IoSend,
//     IoVideocamOutline
// } from 'react-icons/io5';
// import { useQuery } from 'react-query';
// import { useLocation } from 'react-router-dom';

// import fourDots from '../assets/fourdots.svg';
// import { useAppDispatch, useAppSelector } from '../hooks';
// import { useFetchConversationParticipants } from '../hooks/useFetchConversationParticipants';
// import { Message, useFetchMessage } from '../hooks/useFetchMessage';
// import { getMetadata, URLMetadata } from '../hooks/useFetchMetaData';
// import { useFetchPeerId } from '../hooks/useFetchPeerId';
// import { useFormatConversationStatus } from '../hooks/useFormatConversationStatus';
// import { useUploadFile } from '../hooks/useUploadFile';
// import { Storage } from '../service/LocalStorage';
// import { socket } from '../service/socket';
// import { setOpen } from '../store/advance-messages-slice';
// import { setConversationOpen } from '../store/open-covnersation-slice';
// import {
//     convertToDate, generateRandomString, getMimeType, groupMessagesByDateTime, validURL
// } from '../utils';
// import Icon from './atoms/Icon';
// import { PreviewFile } from './PreviewFile';
// import { TextBox } from './TextBox';

// function Chat() {
//     const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
//     const advanceMessageBannerRef = React.useRef<HTMLDivElement>(null)
//     const { isOpen } = useAppSelector(state => state.advanceMessage)
//     const location = useLocation()
//     const path = location.pathname.split("/")
//     const key = Storage.Get("_k")
//     const dispatch = useAppDispatch()
//     const id = Storage.Get("current_conversation_id")
//     const name = Storage.Get("current_conversation")
//     const { data, isLoading, isFetching } = useFetchMessage(path[path.length - 1])
//     const { data: participants, isLoading: isParticipantsLoading } = useFetchConversationParticipants()
//     const [messages, setMessages] = React.useState<typeof data>([])
//     const [participant, setParticipant] = React.useState<{ userId: string }[]>()
//     const [status, setStatus] = React.useState<"online" | "offline">("offline")
//     const [lastLogin, setLastlogin] = React.useState<string | 0>(0)
//     const [isTypeing, setIsTyping] = React.useState<boolean>(false)
//     const [isBoucing, setIsBoucing] = React.useState<boolean>(false)
//     const [peerId, setPeerId] = React.useState<string>()
//     const [url, setUrl] = React.useState<string>("")
//     const [text, setText] = React.useState<string>("")
//     // const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id +"l"?? "")
//     const { data: peer, isError: isFetchPeerError } = useFetchPeerId(id ?? "")
//     let currentUser = "";
//     let showAvatar = false;
//     const textboxRef = React.useRef<HTMLDivElement>(null)
//     const { mutate } = useUploadFile()
//     // const [currentLocation, setCurrentLocation] = React.useState<{ lat: number, lgn: number }>()
//     const handleSetCurrentLocation = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         event.preventDefault();
//         dispatch(setOpen(false))
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((data) => {
//                 // setCurrentLocation({ ...currentLocation, lat: data.coords.latitude, lgn: data.coords.longitude })
//                 const messageId = crypto.randomUUID()
//                 const time = Math.round(new Date().getTime() / 1000);
//                 setMessages((prev) => [...(prev as []),
//                 {
//                     messageId,
//                     conversationId: id,
//                     type: "location",
//                     sender: key,
//                     recipients: [],
//                     isDeleted: false,
//                     createdAt: time.toString(),
//                     showAvatar: false,
//                     location: {
//                         lat: data.coords.latitude,
//                         lgn: data.coords.longitude
//                     }
//                 } as Message
//                 ])
//             })
//         }
//     }, [dispatch, id, key])
//     // React.useEffect(() => {
//     //     const advanceMessageHandler = (e: MouseEvent) => {
//     //         if ((!(advanceMessageBannerRef.current?.contains(e.target as Node)) && !advanceMessageButtonRef.current?.contains(e.target as Node) && isOpen) || (advanceMessageBannerRef.current?.contains(e.target as Node) && isOpen)) {
//     //             dispatch(setOpen(false))
//     //         }
//     //     }
//     //     document.addEventListener("mousedown", advanceMessageHandler)
//     //     return () => {
//     //         document.removeEventListener("mousedown", advanceMessageHandler)
//     //     }
//     // })
//     const messageEl = React.useRef<HTMLDivElement>(null);
//     const scrollToBottom = () => {
//         if (messageEl.current) {
//             messageEl.current.scrollTop = messageEl.current.scrollHeight;
//         }
//     };
//     const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
//         event.preventDefault();
//         // const initHeight = event.currentTarget;
//         // console.log("check init height", initHeight)
//         // console.log(first)
//         const isScrolled = event.currentTarget.offsetHeight + event.currentTarget.scrollTop < event.currentTarget.scrollHeight
//         setIsBoucing(isScrolled)
//         // console.log("scroll height", event.currentTarget.scrollHeight)

//     }
//     const handleClickBoucing = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         scrollToBottom()
//     }
//     const handleOnFocus = (event: React.FocusEvent<HTMLDivElement, Element>) => {
//         event.preventDefault()
//         socket.emit("typing", { room: id, user: key })
//     }
//     const handleOnBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
//         event.preventDefault()
//         socket.emit("not typing", { room: id, user: key })
//     }
//     const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             const text = event.currentTarget.innerText.trim()
//             if (text) {
//                 hanldeSubmit(text)
//             }
//             event.currentTarget.innerText = ""
//             // console.log(files)
//             if (files.length > 0) {
//                 await Promise.all(files.map(async (data) => {
//                     const messageId = crypto.randomUUID()
//                     const time = Math.round(new Date().getTime() / 1000);
//                     const mime = await getMimeType(data.file)
//                     // console.log(mime)
//                     if (mime.startsWith("image/")) {
//                         const msg = {
//                             messageId,
//                             conversationId: id,
//                             type: "image",
//                             sender: key,
//                             recipients: [],
//                             isDeleted: false,
//                             createdAt: time.toString(),
//                             showAvatar: false,
//                             // url: data.url
//                             url: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245"
//                         } as Message;
//                         mutate({ file: data.file, id: messageId, conversation: id ?? "", type: "image", "sender": key ?? "", content: "", time })
//                         setMessages(prev => [...prev as [],
//                             msg
//                         ])
//                         data.type = "image"
//                     }
//                     if (mime.startsWith("video/")) {
//                         console.log(data.file)
//                         const msg = {
//                             messageId,
//                             conversationId: id,
//                             type: "video",
//                             sender: key,
//                             recipients: [],
//                             isDeleted: false,
//                             createdAt: time.toString(),
//                             showAvatar: false,
//                             url: data.url
//                         } as Message;
//                         setMessages(prev => [...prev as [], msg])
//                     }
//                 }))
//                 setFiles([])
//                 // setFiles(prev => prev.)
//             }
//         }
//     }

//     const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault()
//         console.log(textboxRef.current?.innerText)
//         if (textboxRef.current?.innerText) {
//             textboxRef.current.innerText = ""
//         }
//     }
//     const handleOnClickVideo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         const randomToken = generateRandomString(92);
//         // dispatch(setVideoToken(randomToken))
//         Storage.Set("video-token", randomToken)
//         const popup = window.open(`/video/${randomToken}`, "_blank", "popup=1")
//         if (popup) {
//             popup.onbeforeunload = function () {
//                 Storage.Del("video-token")
//             }
//         }
//     }
//     // fecth metadata
//     const { refetch } = useQuery<URLMetadata>({ queryKey: `query-key-${url}`, queryFn: async () => await getMetadata(url), enabled: false })
//     const hanldeSubmit = (text: string) => {
//         const messageId = crypto.randomUUID()
//         const time = Math.round(new Date().getTime() / 1000);
//         // socket.auth = { id: key }
//         // socket.emit("private message", { room: id, message: { id: messageId, conversation: id, sender: key, content: text, time, type: "text" } })
//         setText(() => text)
//         const validUrl = validURL(text);
//         console.log({ text, validUrl })
//         if (validUrl) {
//             setUrl(validUrl)
//             // refetch().then((data) => { console.log(data.data) }, () => { })
//             // console.log(metadata)
//         } else {
//             setMessages((prev) => [...(prev as []),
//             {
//                 messageId,
//                 conversationId: id,
//                 type: "text",
//                 content: text,
//                 sender: key,
//                 recipients: [],
//                 isDeleted: false,
//                 createdAt: time.toString(),
//                 showAvatar: false,
//             } as Message
//             ])
//         }
//         // if (messages) {
//         //     (messages as unknown[]).push(,)
//         // }
//     }
//     React.useEffect(() => {
//         if (url && text) {
//             const messageId = crypto.randomUUID()
//             const time = Math.round(new Date().getTime() / 1000);
//             console.log(text.split(" ").length)
//             refetch().then((data) => {
//                 setMessages((prev) => [...(prev as []),
//                 {
//                     messageId,
//                     conversationId: id,
//                     type: "link",
//                     content: text,
//                     sender: key,
//                     recipients: [],
//                     isDeleted: false,
//                     createdAt: time.toString(),
//                     showAvatar: false,
//                     meta: data.data
//                 } as Message
//                 ])
//             }, () => { })
//         }
//     }, [refetch, url])
//     React.useEffect(() => {
//         if (peer && !isFetchPeerError) {
//             Storage.Set("peer-id", peer.id)
//             setPeerId(peer.id)
//         }
//     }, [isFetchPeerError, peer])
//     React.useEffect(() => {
//         if (!isParticipantsLoading) {
//             setParticipant(participants?.filter((item) => item.userId !== key))
//         }
//     }, [isParticipantsLoading, key, participants])
//     React.useEffect(() => {
//         socket.auth = { id: key };
//         socket.on("private message", (arg: ArrayElementType<typeof data> & { time: number }) => {
//             if (arg.conversationId === path[path.length - 1]) {
//                 setMessages(prev => [...(prev as []), { ...arg, createdAt: arg.time.toString() }])
//             }
//         })
//         return () => {
//             socket.off("private message")
//         }
//     }, [key, path])
//     // loiii
//     React.useEffect(() => {
//         if (messageEl && !isBoucing) {
//             messageEl.current?.addEventListener('DOMNodeInserted', event => {
//                 const { currentTarget: target } = event;
//                 (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
//             });
//             // messageEl.current?.addEventListener('load', event => {
//             //     const { currentTarget: target } = event;
//             //     (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
//             // });
//         }
//     }, [isBoucing])
//     React.useEffect(() => {
//         if (!isBoucing) {
//             scrollToBottom();
//         }
//     }, [isBoucing])
//     React.useEffect(() => {
//         dispatch(setConversationOpen(true))
//     }, [dispatch])
//     React.useEffect(() => {
//         if (participant?.length === 1) {
//             socket.emit("get user status", participant[0])
//         }
//         socket.on("get user status", (arg: { id: string, lastLogin: string, status: "online" | "offline" }) => {
//             setStatus(arg.status)
//             setLastlogin(arg.lastLogin ? arg.lastLogin : 0)

//         })
//     }, [participant])
//     React.useEffect(() => {
//         socket.on("user online chat", (arg: { id: string, status: "online" }) => {
//             if (participant && participant.length === 1 && arg.id === participant[0].userId) {
//                 setStatus(arg.status)
//             }
//         })
//         socket.on("user offline chat", (arg: { id: string, lastLogin: string, status: "offline" }) => {
//             if (participant && participant.length === 1 && arg.id === participant[0].userId) {
//                 setStatus(arg.status)
//                 setLastlogin(arg.lastLogin)
//             }
//         })
//         socket.on("user typing", (arg: string) => {
//             if (participant && participant.length === 1 && arg === participant[0].userId) {
//                 setIsTyping(true)
//             }
//         })
//         socket.on("user not typing", (arg: string) => {
//             if (participant && participant.length === 1 && arg === participant[0].userId) {
//                 setIsTyping(false)
//             }
//         })
//         socket.on("yeah", (arg) => { console.log(arg) })
//         return () => {
//             socket.off("user online chat")
//             socket.off("user offline chat")
//             socket.off("user typing")
//             socket.off("user not typing")
//             socket.off("yeah")
//         }

//     }, [participant])
//     React.useEffect(() => {
//         if (!isLoading && !isFetching) {
//             setMessages(data)
//         }
//     }, [data, isFetching, isLoading])
//     // const groupedMessages = groupMessagesByDateTime(messages as [])
//     const groupedMessages = React.useMemo(() => groupMessagesByDateTime(messages as []), [messages])
//     const now = useFormatConversationStatus(+lastLogin)
//     const [files, setFiles] = React.useState<{ file: File, url: string, type?: string }[]>([])
//     const handleOnChangeFileUpLoad = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         event.preventDefault();
//         if (event.currentTarget.files && event.currentTarget.files.length > 0) {
//             if (event.currentTarget.files[0].size > 5500000) {
//                 alert("file too big")
//                 event.currentTarget.value = ""
//             } else {
//                 const tmps = event.currentTarget.files
//                 tmps.length > 0 && Array.from(tmps).forEach((tmp) => {
//                     const tmpBlob = URL.createObjectURL(tmp)
//                     const obj: { file: File, url: string, type: string } = {
//                         file: tmp,
//                         url: tmpBlob,
//                         type: ''
//                     };
//                     // getMimeType(tmp, mime => { obj.type = mime; obj.url = tmpBlob })
//                     // console.log(obj)
//                     setFiles(prev => [...prev, obj])
//                 })
//                 event.currentTarget.value = ""
//             }
//         }
//     }, [])

//     const handleOnclickImage = React.useCallback((url: string) => {
//         setFiles(prev => prev.filter(item => item.url !== url))
//     }, [])
//     // const groupedMessages = groupMessagesByDateTime(messages as [])
//     return (
//         <main className='relative flex flex-col px-2  h-full w-[900px] '>
//             <div className='flex flex-row items-center  justify-between h-16 px-4 border-b-2'>
//                 <div className='flex items-center justify-center gap-8'>
//                     <div className='justify-self-stretch grid'>
//                         <div className='justify-self-end rounded-md w-12 h-12 bg-cyan-300'></div>
//                     </div>
//                     <div>
//                         <h2 className='font-bold text-lg'>{name}</h2>
//                         <span className='text-sm flex items-center gap-2 '><div className={clsx('h-3 w-3 rounded-full ', status === "online" ? "bg-green-500" : "bg-red-500")}></div>  {status === "online" ? "online" : lastLogin === 0 ? "a long time ago" : now}</span>
//                     </div>
//                 </div>
//                 <div className='flex flex-row gap-6 ml-4'>
//                     <div>
//                         <Icon className='text-2xl cursor-pointer ' >
//                             <button>
//                                 <IoCallOutline />
//                             </button>
//                         </Icon>
//                     </div>
//                     <div className='relative flex items-center justify-center' title={clsx(!peerId ? "video call is not available in this time" : "")}>
//                         <Icon className={clsx('text-2xl', peerId ? "cursor-pointer" : "cursor-default")} >
//                             <button onClick={handleOnClickVideo} disabled={!peerId} >
//                                 <IoVideocamOutline />
//                             </button>
//                         </Icon>
//                         {!peerId ? <Icon className='absolute top-1/2 left-1/2 -translate-x-1/2 text-red-500 text-3xl -translate-y-1/2'>
//                             <FaBan />
//                         </Icon> : null}
//                     </div>
//                     <div>
//                         <Icon className='text-2xl cursor-pointer' >
//                             <IoSearchOutline />
//                         </Icon>
//                     </div>
//                     {/* <span onClick={() => dispatch(setRMenuOpen(!isRMenuOpen))}>
//                         <Icon className='text-xl cursor-pointer' >
//                             <BsThreeDotsVertical />
//                         </Icon>
//                     </span> */}
//                 </div>
//             </div>
//             <div className=' h-[calc(100%-110px)] max-h-full flex-col gap-4 overflow-y-auto pb-4' ref={messageEl} onScroll={handleScroll}>
//                 {isFetching && <div>Loading...</div>}
//                 {
//                     groupedMessages && Object.entries(groupedMessages).length > 0 ? Object.entries(groupedMessages).map(([date, timeGroups]) => (
//                         <div key={date}>
//                             <div className='text-sm w-full flex justify-center'>
//                                 <span>{convertToDate(date)}</span>
//                             </div>
//                             {
//                                 Object.entries(timeGroups).map(([time, message]) => {
//                                     showAvatar = currentUser !== message.sender
//                                     currentUser = message.sender
//                                     message.showAvatar = showAvatar
//                                     return <div key={time}>
//                                         {<TextBox content={message.content} id={message.conversationId} type={message.type} mode={message.sender === (key) ? "receiver" : "sender"} showAvatar={message.showAvatar} meta={message.meta ?? undefined} location={message.location ?? undefined} url={message.url ?? undefined} />}
//                                     </div>
//                                 })
//                             }
//                         </div>
//                     )) : null
//                 }
//                 {isTypeing &&
//                     <TextBox mode='typing' showAvatar={true} />
//                 }
//             </div>
//             <div className='flex w-full items-center gap-1 min-h-[40px] z-10'>
//                 <div ref={advanceMessageButtonRef} className='flex justify-between flex-col min-h-[40px] w-[5%] bottom-0'>
//                     {files.length > 0 && <div className='w-full h-[70px]'></div>}
//                     <div className='relative flex items-center gap-2 flex-row h-[40px] justify-center mx-1' onClick={() => dispatch(setOpen(!isOpen))}>
//                         <img src={fourDots} alt="" className='w-14 cursor-pointer ' />
//                     </div>
//                     <div ref={advanceMessageBannerRef} className={clsx('flex flex-row items-center justify-around absolute w-36 h-10 bg-white -translate-x-1/3 rounded-xl drop-shadow-md', isOpen ? "opacity-100 bottom-16 translate-y-0 visible transition-all ease-in duration-300" : "transition-all ease-out duration-300 bottom-8 -translate-y-1 invisible opacity-0")}>
//                         <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' onClick={() => {
//                             dispatch(setOpen(false))
//                         }}>
//                             <label htmlFor="file" className='cursor-pointer'>
//                                 <Icon className='text-xl' color='white'>
//                                     <IoAttach />
//                                 </Icon>
//                             </label>
//                         </div>
//                         <div className='w-6 h-6 rounded-full bg-gray-400/90 flex items-center justify-center' >
//                             <Icon className='text-xl' color='white'>
//                                 <IoMicOutline />
//                             </Icon>
//                         </div>
//                         <div className='w-6 h-6 rounded-full bg-gray-400/90 drop-shadow flex items-center justify-center' onClick={handleSetCurrentLocation}>
//                             <Icon className='text-xl' color='white'>
//                                 <IoLocationOutline />
//                             </Icon>
//                         </div>
//                     </div>
//                     {/* <div className='w-full bg-white'>
//                 </div> */}
//                 </div>
//                 <div className='flex flex-col bottom-0 bg-white min-h-[40px] w-[90%] border-2 border-solid border-blue-300 rounded-md items-center' >
//                     {/* <form onSubmit={hanldeSubmit}> */}
//                     {/* <Input className='absolute !rounded-xl  !px-2 !text-xl w-full pr-4 break-all break-words'
//                             onChange={(event) => setMessage(event.target.value)} value={message}
//                             onBlur={handleOnBlur} onFocus={handleOnFocus}
//                         /> */}
//                     {files.length > 0 && <div className='w-full min-h-[70px] py-2 bg-blue-200 flex gap-2  items-center px-4'>
//                         {files.map(data => {
//                             return (
//                                 <PreviewFile url={data.url} type={data.type} file={data.file} key={data.url} onClick={handleOnclickImage} />
//                             )
//                         })}
//                     </div>}
//                     {                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
//                     }                    <div ref={textboxRef} contentEditable className=' pl-2 align-middle rounded-md text-xl leading-[1.8] break-all break-words min-h-[40px] w-full  focus:outline-none' onKeyDown={async (event) => await handleOnKeyDown(event)} onBlur={handleOnBlur} onFocus={handleOnFocus}>
//                     </div>
//                     <input className='hidden' type='file' multiple id='file' onChange={handleOnChangeFileUpLoad} />
//                 </div>
//                 <div className='flex items-center justify-center m-2'>
//                     <button className='text-2xl' onClick={handleOnClick}>
//                         <Icon className='text-blue-700'>
//                             <IoSend />
//                         </Icon>
//                     </button>
//                 </div>
//             </div>
//             {isBoucing && <div className='absolute z-20 bottom-16 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-blue-500 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-blue-400'>
//                 <button onClick={handleClickBoucing}>
//                     <Icon className='text-xl text-white'>
//                         <AiOutlineArrowDown />
//                     </Icon>
//                 </button>
//             </div>}
//         </main>
//     )
// }
// export default React.memo(Chat)