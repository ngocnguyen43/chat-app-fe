import Input from './atoms/Input'
import { HiDotsHorizontal } from "react-icons/hi"
import { AiOutlineSearch } from "react-icons/ai"
import { IconContext } from 'react-icons'
import { useAppDispatch, useAppSelector } from '../hooks'
import clsx from 'clsx'
import { setSettingOpen } from '../store/setting-slice'
import React from 'react'
import { socket } from '../service/socket'
import { unixTimestampToRelativeTime } from '../utils'
const UserBanner = () => {
    const { isSettingOpen } = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch()
    return <div className='flex flex-row items-center  w-full justify-between '>
        <div className='bg-cyan-300 rounded-full w-8 h-8'>
        </div>
        <div className='flex-1 ml-4'>
            <span className='font-bold text-sm'>Nguyen Minh Ngoc</span>
        </div>
        <div className='cursor-pointer relative'>
            <span onClick={() => dispatch(setSettingOpen(!isSettingOpen))}>
                <IconContext.Provider value={{ className: "text-xl" }}>
                    <HiDotsHorizontal />
                </IconContext.Provider>
            </span>
            <div className={clsx('absolute w-32 h-40 bg-white drop-shadow-lg z-10 rounded-2xl -translate-x-1/2 left-1/2  duration-300', isSettingOpen ? "transition-all opacity-100 top-5 translate-y-0 ease-in" : "transition-all top-5 -translate-y-2 ease-out opacity-0")}></div>
        </div>
    </div>
}
const SearchBar = () => {

    return <div className='relative'>
        <Input className='!rounded-md !px-2 w-full ' placeholder='Search' />
        <IconContext.Provider value={{ className: "text-2xl absolute top-[50%] right-0 translate-y-[-50%] -translate-x-2", color: "gray" }}>
            <AiOutlineSearch />
        </IconContext.Provider>
    </div>
}
type MessageProps = {
    name: string,
    avatar: string,
    lastMessage: string | any,
    isLasstMessageSeen: boolean,
    lastMessageAt: number
}
const UserMessage: React.FC<MessageProps> = (props) => {
    return <div className='flex w-[calc(100%-4px)] flex-row justify-between cursor-pointer hover:bg-blue-50 p-2 rounded-md '>
        <div className='relative rounded-full w-10 h-10 bg-cyan-300 after:absolute after:w-4 after:h-4 after:top-0 after:right-0 after:bg-green-400 after:rounded-full after:border-2 after:border-solid after:border-white'></div>
        <div className='flex flex-col justify-around flex-1 ml-2 text-ellipsis overflow-hidden'>
            <span className='text-xs font-bold'>{props.name}</span>
            <span className='text-ellipsis overflow-hidden text-[12px]'>{props.lastMessage.repeat(10)}</span>
        </div>
        <div className='flex flex-col justify-evenly items-end'>
            <span className='text-[10px]'>{unixTimestampToRelativeTime(props.lastMessageAt)}</span>
            <div className='rounded-full w-2 h-2 bg-red-500 flex items-center justify-center text-white text-[8px]'>new</div>
        </div>
    </div>
}
export default function Conversations() {
    // const { id } = useAppSelector(state => state.socketId)
    // const [conversations, setConversations] = React.useState<any[]>([])
    // React.useEffect(() => {
    //     socket.auth = { id: id }
    //     socket.connect()
    //     socket.on("connect", () => {
    //         console.log(`connect ${socket.id}`);
    //     });
    //     socket.on("disconnect", () => {
    //         console.log(`disconnect`);
    //     });
    //     socket.on("connect_error", (err) => {
    //         console.log(err);
    //     });
    //     socket.on("get conversations", (arg) => {
    //         setConversations(arg)
    //         console.log(`conversations ${arg}`)
    //     })
    //     return () => {
    //         socket.off("connect")
    //         socket.off("disconnect")
    //         socket.off("connect_error")
    //         socket.off('get_all_conversation')
    //         socket.off("get conversations")
    //         socket.disconnect()
    //     }
    // }, [id])
    return (
        <aside className='flex flex-col pl-2 '>
            <div className='sticky top-0 bg-white flex !flex-col gap-2 pr-2'>
                <UserBanner />
                <SearchBar />
            </div>
            <div className='w-[270px] overflow-x-hidden h-full conversations'>
                <div>
                    <span className='text-xs'>Pinned</span>
                    {/* {conversations.length > 0 ?
                        conversations.map((conversation) => {
                            return <UserMessage name={conversation.name as string} lastMessage={conversation.lastMessage as string} lastMessageAt={conversation.lastMessageAt as number} isLasstMessageSeen={conversation.isLastMessageSeen} avatar='' />
                        }) : null
                    } */}
                </div>
                <div className='flex flex-col'>
                </div>
                <div>
                    <span className='text-xs'>Direct Messages</span>
                </div>

                <div>
                    <span className='text-xs'>Group Messages</span>
                </div>
            </div>
        </aside>
    )
}
