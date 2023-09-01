import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiDotsHorizontal } from "react-icons/hi"
import Icon from '../../atoms/Icon'
import { BsCameraVideo, BsPersonAdd, BsTelephone } from 'react-icons/bs'
import { BiBlock } from 'react-icons/bi'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { FaRegTrashCan } from 'react-icons/fa6'
import { IoLogOutOutline } from 'react-icons/io5'

export default function ConversationUtils() {
    return (
        <div className='flex gap-6 items-center '>
            <Icon className='text-2xl'>
                <BsCameraVideo />
            </Icon>
            <Icon className='text-2xl'>
                <BsTelephone />
            </Icon>
            <Icon className='text-2xl'>

                <CiSearch />
            </Icon>
            <div className='relative'>
                <Icon className='text-2xl cursor-pointer'>
                    <HiDotsHorizontal />
                </Icon>
                <div className='absolute h-auto z-10 top-10 right-0 p-2 inline-block text-sm font-medium bg-gray-600/80 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 origin-bottom-left'>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <BsPersonAdd />
                        </Icon>
                        Add User</button>
                    <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon>
                            <AiOutlineUsergroupDelete />
                        </Icon>
                        Group Users</button>
                    <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <BiBlock />
                        </Icon>
                        Block User</button>
                    <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <FaRegTrashCan />
                        </Icon>
                        Delete Chat</button>
                    <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <IoLogOutOutline />
                        </Icon>
                        Out group</button>
                </div>
            </div>
            <div className="avatar-group -space-x-6">
                <div className="avatar z-[4]">
                    <div className="w-14  rounded-full ">
                        <img src="https://th.bing.com/th/id/OIP.5dSi0zCpBrYxg1gwbe1IhgHaEo?pid=ImgDet&rs=1" alt='participant' />
                    </div>
                </div>
                <div className="avatar z-[3]">
                    <div className="w-14 rounded-full bg-gray-100">
                        <svg className="absolute w-20 h-20 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                </div>
                <div className="avatar z-[2]">
                    <div className="w-14 rounded-full">
                        <img src="https://th.bing.com/th/id/OIP.5dSi0zCpBrYxg1gwbe1IhgHaEo?pid=ImgDet&rs=1" alt='participant' />
                    </div>
                </div>
                <div className="avatar placeholder z-[1]">
                    <div className="w-14 rounded-full bg-neutral-focus text-neutral-content">
                        <span>+99</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
