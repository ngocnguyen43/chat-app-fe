import React from 'react'
import Icon from './atoms/Icon'
import { FaPlus, FaUserFriends } from "react-icons/fa"
export default function LeftMenu() {
    return (
        <aside className='flex flex-col w-20 gap-4 items-center pt-2'>
            <div>
                <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center'>
                    <Icon className='text-xl'>
                        <FaUserFriends />
                    </Icon>
                </div>
            </div>
            <div>
                <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center'>
                    <Icon className='text-xl'>
                        <FaPlus />
                    </Icon>
                </div>
            </div>
            <div>
            </div>
        </aside>
    )
}
