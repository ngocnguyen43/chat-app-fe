import clsx from 'clsx';
import React from 'react';
import { IconContext } from 'react-icons';
import { BsSend, BsThreeDotsVertical } from 'react-icons/bs';
import {
    IoAttach, IoCallOutline, IoImages, IoLocationOutline, IoMicOutline, IoSearchOutline,
    IoVideocamOutline
} from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';

import fourDots from '../assets/fourdots.svg';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setOpen } from '../store/advance-messages-slice';
import { setRMenuOpen } from '../store/right-menu-slice';
import Icon from './atoms/Icon';
import Input from './atoms/Input';
import { formatTime, unixTimestampToDateWithHour } from '../utils';

interface MessageProps {
    mode?: "sender" | "receiver"
    content: string
    type: "text" | "image" | "location" | "hybrid"
    isRead?: boolean
    showAvatar: boolean
    time: number,
}
type MesageType = {
    content: string,
    sender: string,
    time: string,
    type: "text" | "image" | "location" | "hybrid"
    showAvatar?: boolean
}
const messages: MesageType[] = [
    {
        content: "abcabc",
        sender: "1",
        time: "1691337438",
        type: "text"
    },
    {
        content: "abcabc",
        sender: "1",
        time: "1691337438",
        type: "text"
    },
    {
        content: "hahaha",
        sender: "2",
        time: "1691331438",
        type: "text"
    },
    {
        content: "abcabc",
        sender: "2",
        time: "1691331438",
        type: "text"
    },
    {
        content: "abcabc",
        sender: "2",
        time: "1691331438",
        type: "text"
    },
    {
        content: "ngoc",
        sender: "1",
        time: "1691331438",
        type: "text"
    },
    {
        content: "ngoc",
        sender: "2",
        time: "1691331438",
        type: "text"
    },
    {
        content: "ngoc",
        sender: "2",
        time: "1691331438",
        type: "text"
    },
    {
        content: "ngoc",
        sender: "2",
        time: "1691331438",
        type: "text"
    },
    {
        content: "ngoc",
        sender: "1",
        time: "1691331438",
        type: "text"
    },
]
const dates = new Set();
const generateMessage = () => {
    const words = ["The sky", "above", "the port", "was", "the color of television", "tuned", "to", "a dead channel", ".", "All", "this happened", "more or less", ".", "I", "had", "the story", "bit by bit", "from various people", "and", "as generally", "happens", "in such cases", "each time", "it", "was", "a different story", ".", "It", "was", "a pleasure", "to", "burn"];
    const text = [];
    let x = 7;
    while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
    return text.join(" ");
}
// type SenderProps = RequireOnly<MessageProps, "content" | "isRead" | "type">

const RenderDate: React.FC<{ timestamp: number }> = ({ timestamp }) => {
    const date = unixTimestampToDateWithHour(timestamp)
    dates.add(date)
    return <span>{formatTime(timestamp)}</span>
}
const Message: React.FC<MessageProps> = ({ content, type, mode = "receiver", isRead, showAvatar, time }) => {
    const timestamp = unixTimestampToDateWithHour(time)
    return (
        <>
            <div className='text-sm w-full flex justify-center'>{dates.has(timestamp) ? null : <RenderDate timestamp={time} />}</div>
            <div className={clsx('flex gap-2 px-2 items-center my-4 relative', { "justify-end ": mode == "receiver", "justify-start": mode == "sender" })}>
                {showAvatar && <span className='bg-cyan-300 rounded-md w-10 h-10 absolute top-0'>
                </span>}
                <div className={clsx('bg-blue-100 rounded-md p-2 text-sm max-w-[300px] break-words', { "ml-12": mode === "sender", "mr-12": mode === "receiver" })}>
                    {type == "text" && content}
                    {type == "image" && <img src={content} alt=''></img>}
                </div>
                {/* {
                mode == "receiver" &&
                <div className={clsx(isRead ? "bg-blue-300" : "bg-blue-100", 'w-3 h-3 rounded-full flex items-center justify-center ')}>
                    <Icon className='w-3' color='white'>
                        <TiTick />
                    </Icon>
                </div>
            } */}
            </div>
        </>
    )
}
export default function Chat() {
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageBannerRef = React.useRef<HTMLDivElement>(null)
    const { isOpen } = useAppSelector(state => state.advanceMessage)
    // const { isRMenuOpen } = useAppSelector(state => state.rightMenu)
    let currentUser = "";
    let showAvatar = false;
    const dispatch = useAppDispatch()
    console.log("advance message:::::", isOpen);
    React.useEffect(() => {
        const advanceMessageHandler = (e: MouseEvent) => {
            if ((!(advanceMessageBannerRef.current?.contains(e.target as Node)) && !advanceMessageButtonRef.current?.contains(e.target as Node) && isOpen) || (advanceMessageBannerRef.current?.contains(e.target as Node) && isOpen)) {
                dispatch(setOpen(false))
            }
        }
        document.addEventListener("mousedown", advanceMessageHandler)
        return () => {
            document.removeEventListener("mousedown", advanceMessageHandler)
        }
    })
    messages.forEach((message) => {
        showAvatar = currentUser !== message.sender
        currentUser = message.sender
        message.showAvatar = showAvatar
    })
    const messageEl = React.useRef<HTMLDivElement>(null);
    const [messagess, setMessagess] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (messageEl) {
            messageEl.current?.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                (target as HTMLElement).scroll({ top: (target as HTMLElement).scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])
    React.useEffect(() => {
        scrollToBottom()
    })
    const scrollToBottom = () => {
        if (messageEl.current) {
            messageEl.current.scrollTop = messageEl.current.scrollHeight;
        }
    };
    // React.useEffect(() => {
    //     const generateDummyMessage = () => {
    //         setInterval(() => {
    //             setMessagess(prevMsg => [...prevMsg, generateMessage()]);
    //         }, 2000);
    //     }
    //     generateDummyMessage();
    // }, []);
    return (
        <main className=' flex flex-col px-2  h-full w-[900px] '>
            <div className='flex flex-row items-center  justify-between h-16 px-4 border-b-2'>
                <div className='flex items-center justify-center gap-8'>
                    <div className='justify-self-stretch grid'>
                        <div className='justify-self-end rounded-md w-12 h-12 bg-cyan-300'></div>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Nguyen Minh Admin</h2>
                        <span className='text-sm flex items-center gap-2 '><div className='h-3 w-3 bg-green-500 rounded-full '></div>  online</span>
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
                {
                    messages.length > 0 ? messages.map((message, index) => {
                        return <div key={index}>
                            <Message content={message.content.repeat(20)} type="text" mode={message.sender === "1" ? "receiver" : "sender"} showAvatar={message.showAvatar ?? false} time={+message.time} />
                        </div>
                    }) : null
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
                    <Input className='absolute !rounded-xl  !px-2 !text-xl w-full ' />
                    <IconContext.Provider value={{ className: "absolute text-2xl top-[1/6] right-0 translate-y-[50%] -translate-x-2 " }}>
                        <BsSend />
                    </IconContext.Provider>
                </div>
            </div>
        </main>
    )
}
