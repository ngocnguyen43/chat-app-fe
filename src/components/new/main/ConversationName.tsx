import React from 'react'
import { useAppSelector } from '../../../hooks'
import { Avatar } from '../nav/Conversations';

export default function ConversationName() {
    const { avatar, id, isGroup, isOnline, name } = useAppSelector(state => state.currentConversation)
    return (
        <div className='flex gap-4 h-16 items-center'>
            {/* <div className="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring ring-red-400 ring-offset-2 ring-offset-base-100 scale-105">
                <svg className="absolute w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div> */}
            <div>
                <Avatar avatar={avatar} isGroup={isGroup} isOnline={isOnline} />
            </div>
            <div className='flex flex-col items-start'>
                <h2 className='text-xl font-semibold'>{name ?? "Hello"}</h2>
                {isGroup && <h4 className='text-sm'>10 members</h4>}
                {!isGroup ? ((isOnline) ? <h4 className='text-sm'>online</h4> : <h4 className='text-sm'>offline</h4>) : <></>}
            </div>
        </div>
    )
}
