import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiDotsHorizontal } from "react-icons/hi"
import Icon from '../../atoms/Icon'
import { BsCameraVideo, BsTelephone } from 'react-icons/bs'

export default function ConversationUtils() {
    return (
        <div className='flex gap-6 items-center '>
            <Icon className='text-2xl'>
                <BsCameraVideo />
                <BsTelephone />
                <CiSearch />
                <HiDotsHorizontal />
            </Icon>
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
