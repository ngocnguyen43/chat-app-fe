import { IconContext } from 'react-icons';
import { AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import Icon from './atoms/Icon';
import Input from './atoms/Input';
import React from 'react';
import { socket } from '../service/socket';
import { formatAgo } from '../utils';
import { useConversation } from '../hooks/useConversations';
import { setConversationId, setConversationName } from '../store/current-conversation-slice';

const UserBanner = () => {
    const { isSettingOpen } = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch()
    return <div className='flex flex-row items-center  w-full h-16 justify-between '>
        <div className='bg-cyan-300 rounded-md w-10 h-10'>
        </div>
        <div className='flex-1 ml-4'>
            <span className='font-bold text-md'>Nguyen Minh Ngoc</span>
        </div>
        <Icon className='text-4xl text-blue-700'>
            <AiFillPlusCircle />
        </Icon>
        {/* <div className='cursor-pointer relative'>
            <span onClick={() => dispatch(setSettingOpen(!isSettingOpen))}>
                <IconContext.Provider value={{ className: "text-xl" }}>
                    <HiDotsHorizontal />
                </IconContext.Provider>
            </span>
            <div className={clsx('absolute w-32 h-40 bg-white drop-shadow-lg z-10 rounded-2xl -translate-x-1/2 left-1/2  duration-300', isSettingOpen ? "transition-all opacity-100 top-5 translate-y-0 ease-in" : "transition-all top-5 -translate-y-2 ease-out opacity-0")}></div>
        </div> */}
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
    id: string,
    name: string,
    avatar: string,
    lastMessage: string | unknown,
    isLasstMessageSeen: boolean,
    lastMessageAt: number,
    onClick: (props: { id: string, name: string }) => void
}
const UserMessage: React.FC<MessageProps> = (props) => {
    const { id, name, avatar, lastMessage, lastMessageAt, isLasstMessageSeen, onClick } = props
    return <div className='flex w-[calc(100%-4px)] flex-row justify-between cursor-pointer ' onClick={() => onClick({ name, id })}>
        <div className='relative rounded-md w-12 h-12 bg-cyan-300 after:absolute'></div>
        <div className='flex flex-col justify-around flex-1 ml-2 text-ellipsis overflow-hidden'>
            <span className='text-md font-bold'>{name}</span>
            <span className='text-ellipsis overflow-hidden text-xs'>{(lastMessage as string).repeat(20)}</span>
        </div>
        <div className='flex flex-col justify-evenly items-end'>
            <span className='text-xs'>{formatAgo(lastMessageAt)}</span>
            <div className='rounded-full w-3 h-3 bg-red-500 flex items-center justify-center text-white text-[8px]'></div>
        </div>
    </div>
}
export default function Conversations() {
    const { id } = useAppSelector(state => state.socketId)
    const { data, isLoading, error } = useConversation()
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        socket.auth = { id: id }
        socket.connect()
        socket.on("connect", () => {
            console.log(`connect ${socket.id}`);
        });
        socket.on("disconnect", () => {
            console.log(`disconnect`);
        });
        socket.on("connect_error", (err) => {
            console.log(err);
        });
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
            socket.disconnect()
        }
    }, [id])
    // data && setConversations(state => [...state, ...JSON.parse(data) as []])
    const handleOnclick = (props: { name: string, id: string }) => {
        console.log(props)
        dispatch(setConversationName(props.name))
        dispatch(setConversationId(props.id))
        socket.emit("join conversation", props.id)
    }
    return (
        <aside className='flex flex-col pl-2 w-96'>
            <div className='sticky top-0 bg-white flex  gap-2 pr-2'>
                <UserBanner />
            </div>
            <div className='sticky top-0 bg-white flex !flex-col gap-2 pr-2 my-4'>
                <SearchBar />
            </div>
            <div className='w-full overflow-x-hidden h-full conversations'>
                {/* <div>
                    <span className='text-xs'>Pinned</span>
                </div> */}
                <div className='flex flex-col pr-2'>
                    {/* <NavLink className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " rounded-md"} to="/conversation/123456" >
                        <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' />
                    </NavLink>
                    <NavLink className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " rounded-md"} to="./" >
                        <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' />
                    </NavLink>
                    <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' />
                    <UserMessage avatar='' isLasstMessageSeen={false} lastMessage={""} lastMessageAt={1} name='' /> */}
                    {isLoading && <div>Loading...</div>}
                    {(data && data.length > 0) ? data.map((conversation, index) => {
                        return <NavLink key={index} className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " hover:bg-blue-50 p-2 rounded-md"} to={`/conversation/${conversation.conversationId}`}>
                            <UserMessage avatar='' id={conversation.conversationId} isLasstMessageSeen={conversation.isLastMessageSeen} lastMessage={conversation.lastMessage} lastMessageAt={+conversation.lastMessageAt} name={conversation.name} onClick={handleOnclick} />
                        </NavLink>
                    }) : null}
                </div>
                {/* <div>
                    <span className='text-xs'>Direct Messages</span>
                </div>

                <div>
                    <span className='text-xs'>Group Messages</span>
                </div>
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage /> */}
            </div>
        </aside>
    )
}
