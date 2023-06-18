import React from 'react'
import Icon from './atoms/Icon'
import { FaPlus, FaUserFriends } from "react-icons/fa"
export default function LeftMenu() {
    return (
        <aside className='flex flex-col w-16 gap-4'>
            <div>
                <div className='w-14 h-14 rounded-full bg-pink-300 flex items-center justify-center'>
                    <Icon className='text-2xl'>
                        <FaUserFriends />
                    </Icon>
                </div>
            </div>
            <div>
                <div className='w-14 h-14 rounded-full bg-pink-300 flex items-center justify-center'>
                    <Icon className='text-2xl'>
                        <FaPlus />
                    </Icon>
                </div>
            </div>
            <div>
            </div>
        </aside>
    )
}
