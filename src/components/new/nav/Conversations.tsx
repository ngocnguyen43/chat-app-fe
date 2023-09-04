import React from 'react'
import Icon from '../../atoms/Icon'
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import clsx from 'clsx';
import { formatAgo } from '../../../utils';
import { useAppDispatch } from '../../../hooks';
import { setCurrentConversation } from '../../../store/current-conversation-slice';
import { ConversationType, useConversation } from '../../../hooks/useConversations';
import { NavLink } from 'react-router-dom';
import { Storage } from '../../../service/LocalStorage';
import { socket } from '../../../service/socket';
// interface ICovnersation {
//     avatar: string | string[],
//     conversationId: string,
//     conversationName: string,
//     lastMessageAt: string,
//     lastMessage: string,
//     isLastMessageRead: boolean
//     isOnline: boolean,
//     isGroup: boolean,
// }
export const Avatar: React.FunctionComponent<{ isOnline: boolean, avatar: string | string[], isGroup: boolean, }> = React.memo((props) => {
    const { isOnline, avatar, isGroup } = props
    const GroupAvatars = Array.isArray(avatar) ? avatar.map(item => (<div key={item.length} className="avatar">
        <div className='w-10 rounded-full'>
            <img src={item} alt='' />
        </div>
    </div>)) :
        <div className='rounded-full w-16'>
            <img src={"https://d3lugnp3e3fusw.cloudfront.net/" + avatar} loading="lazy" alt='' />
            <span className={clsx("top-1 right-[2px] absolute  w-3.5 h-3.5 border-2 border-black dark:border-gray-800 rounded-full", isOnline ? "bg-green-500" : "bg-red-500")}></span>

        </div>
        ;
    return (
        <div className={clsx(isGroup ? "avatar-group -space-x-7 rotate-[150deg] relative" : "avatar")}>
            {GroupAvatars}
        </div>
    )
})
const LastMessage: React.FunctionComponent<{ lastMessage: string, isLastMessageRead: boolean }> = (props) => {
    const { lastMessage, isLastMessageRead } = props
    return (
        <>
            <h6 className={clsx(' text-sm text-ellipsis whitespace-nowrap overflow-hidden ', isLastMessageRead ? "text-gray-400" : "text-[#8662bf]")}>{lastMessage}</h6>
        </>
    )
}
const mocks = [
    {
        avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
        conversationId: "12345678",
        conversationName: "John Doe",
        lastMessageAt: "1692901434",
        lastMessage: "Hey, how are you?",
        isLastMessageRead: true,
        isOnline: true,
        isGroup: false
    },
    {
        avatar: "https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0",
        conversationId: "98765432",
        conversationName: "Group Chat",
        lastMessageAt: "1692815034",
        lastMessage: "Let's meet up this weekend!",
        isLastMessageRead: false,
        isOnline: false,
        isGroup: false
    },
    {
        avatar: ["https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0", "https://th.bing.com/th/id/OIP.0ZK1QjittPRtG2CmAWuIjwHaEo?pid=ImgDet&rs=1"],
        conversationId: "98765431",
        conversationName: "Khanh Trang",
        lastMessageAt: "1692815034",
        lastMessage: "Let's meet up this weekend!",
        isLastMessageRead: false,
        isOnline: false,
        isGroup: true
    },
]
const Conversation: React.FunctionComponent<ConversationType> = (props) => {
    const { avatar, conversationId, name, lastMessage, lastMessageAt, isLastMessageSeen, status, isGroup, totalUnreadMessages } = props;
    const dispatch = useAppDispatch();
    const onClick = React.useCallback(() => {
        dispatch(setCurrentConversation({ avatar, id: conversationId, isGroup, isOnline: status === "online", name }))
        Storage.Set("avatar", avatar)
        Storage.Set("id", conversationId)
        Storage.Set("isGroup", JSON.stringify(isGroup))
        Storage.Set("isOnline", JSON.stringify(status === "online"))
        Storage.Set("name", name)
    }, [avatar, conversationId, dispatch, isGroup, name, status])
    return (
        <NavLink to={conversationId} className='flex w-full justify-between items-center gap-4 cursor-pointer h-16' onClick={onClick}>
            {
                <Avatar isOnline={status === "online"} avatar={avatar} isGroup={isGroup} />
            }
            <div className='flex flex-col flex-1 justify-around overflow-hidden'>
                <h2 className='font-semibold '>{name}</h2>
                <LastMessage lastMessage={lastMessage} isLastMessageRead={isLastMessageSeen} />
            </div>
            <div className='flex flex-col '>
                <h2 className='font-semibold text-[12px]'>{formatAgo(+lastMessageAt)}</h2>
                <div className=' items-center justify-center flex mt-1 font-semibold'>
                    <Icon className=' text-[14px] text-[#8662bf]'>
                        {isLastMessageSeen ?
                            <IoCheckmarkDoneOutline /> : <div className='w-4 h-4 rounded-full bg text-[12px] bg-[#8662bf] items-center justify-center flex mt-1 font-semibold'>{totalUnreadMessages}</div>
                        }
                    </Icon>
                </div>
            </div>
        </NavLink>
    )
}
const Conversations = () => {
    const { data } = useConversation()
    const [conversations, setConversations] = React.useState(data)
    React.useEffect(() => {
        if (data) {
            setConversations(data)
        }
    }, [data])
    React.useEffect(() => {
        socket.on("update conversations", (arg: NonNullable<typeof data>) => {
            console.log(arg)
            setConversations(arg)
        })
        return () => {
            socket.off("update conversations")
        }
    })
    return (<>
        {
            conversations ?
                <div className='flex flex-col gap-4 h-full overflow-y-auto'>
                    {conversations.map((conversation) => {
                        return <Conversation key={conversation.conversationId} {...conversation} />
                    })}
                </div> : <div className='h-full'></div>
        }
    </>
    )
}
export default Conversations