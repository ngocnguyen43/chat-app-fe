import { IconContext } from 'react-icons'
import { BsThreeDotsVertical, BsSend } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import Input from './atoms/Input'
import Icon from './atoms/Icon'
import fourDots from "../assets/fourdots.svg"
import { IoMicOutline, IoLocationOutline, IoAttach, IoImages, IoVideocamOutline, IoCallOutline, IoSearchOutline } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from '../hooks'
import { setOpen } from '../store/advance-messages-slice'
import clsx from 'clsx'
import { setRMenuOpen } from '../store/right-menu-slice'
import React from 'react'
interface MessageProps {
    mode?: "sender" | "receiver"
    content: string
    type: "text" | "image" | "location" | "hybrid"
    isRead: boolean
}
// type SenderProps = RequireOnly<MessageProps, "content" | "isRead" | "type">
const Message: React.FC<MessageProps> = ({ content, isRead, type, mode = "receiver" }) => {
    return (
        <div className={clsx('flex gap-2 px-2 items-center', { "justify-end": mode == "receiver", "justify-start": mode == "sender" })}>
            <div></div>
            <div className='bg-blue-100 rounded-md p-2 text-sm max-w-[300px] break-words'>
                {type == "text" && content}
                {type == "image" && <img src={content} ></img>}
            </div>
            {
                mode == "receiver" &&
                <div className={clsx(isRead ? "bg-blue-300" : "bg-blue-100", 'w-3 h-3 rounded-full flex items-center justify-center ')}>
                    <Icon className='w-3' color='white'>
                        <TiTick />
                    </Icon>
                </div>
            }
        </div>
    )
}
export default function Chat() {
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageBannerRef = React.useRef<HTMLDivElement>(null)
    const { isOpen } = useAppSelector(state => state.advanceMessage)
    const { isRMenuOpen } = useAppSelector(state => state.rightMenu)
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
    return (
        <main className=' flex flex-col px-2  h-full w-[700px] '>
            <div className='flex flex-row items-center  justify-between h-14 px-4 border-b-2'>
                <div>
                    <h2 className='font-bold text-lg'>Nguyen Minh Admin</h2>
                </div>
                <div className='grid flex-[1]'>
                    <div className='justify-self-stretch grid'>
                        <div className='justify-self-end rounded-full w-12 h-12 bg-cyan-300'></div>
                    </div>
                </div>
                <div className='flex flex-row gap-6 ml-4'>
                    <Icon className='text-xl cursor-pointer' >
                        <IoCallOutline />
                    </Icon>
                    <Icon className='text-xl cursor-pointer' >
                        <IoVideocamOutline />
                    </Icon>
                    <Icon className='text-xl cursor-pointer' >
                        <IoSearchOutline />
                    </Icon>
                    <span onClick={() => dispatch(setRMenuOpen(!isRMenuOpen))}>
                        <Icon className='text-xl cursor-pointer' >
                            <BsThreeDotsVertical />
                        </Icon>
                    </span>
                </div>
            </div>
            <div className=' h-[calc(100%-100px)] flex flex-col-reverse gap-2 overflow-y-auto pb-4'>
                <Message isRead={false} type='text' content='abcbcbcbcbc' />
                <Message isRead={true} type='text' content='Nguyn minh ngoc ngoc ngoc ngoc ngoc ngoc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
                <Message isRead={true} type='text' content='cbcbcbcbcbcbc' mode='sender' />
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
