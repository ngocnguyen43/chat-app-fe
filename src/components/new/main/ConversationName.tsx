import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { Storage } from '../../../service/LocalStorage';
import { Avatar } from '../nav/Conversations';

const ConversationName = () => {
    const { avatar, isGroup, name } = useAppSelector(state => state.currentConversation)
    const { entities } = useAppSelector(state => state.contacts)
    const path = useLocation().pathname.split("/").at(-1)
    const savedName = Storage.Get("name")
    const savedAvatar = Storage.Get("avatar") as string
    const savedIsGroup = JSON.parse(Storage.Get("isGroup") as string) as boolean
    const status = entities.find(entity => entity.conversationId === path)?.status || "offline"
    return (
        <div className='flex gap-4 h-16 items-center'>
            {/* <div className="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring ring-red-400 ring-offset-2 ring-offset-base-100 scale-105">
                <svg className="absolute w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div> */}
            <div>
                <Avatar avatar={avatar || savedAvatar} isGroup={isGroup || savedIsGroup} isOnline={status === "online"} />
            </div>
            <div className='flex flex-col items-start gap-2'>
                <h2 className='text-xl font-semibold text-white'>{name || savedName}</h2>
                {isGroup && <h4 className='text-sm'>10 members</h4>}
                {!(isGroup ?? savedIsGroup) ? ((status === "online") ? <h4 className='text-sm'>online</h4> : <h4 className='text-sm text-white font-medium'>offline</h4>) : <></>}
            </div>
        </div>
    )
}
export default React.memo(ConversationName)