import React from 'react'
import SearchBox from './nav/SearchBox';
import Contacts from './nav/Contacts';
import Icon from '../atoms/Icon';
import { IoChatbubbleOutline } from "react-icons/io5"
import { MdOpenInNew, MdOutlineDarkMode } from 'react-icons/md';
import Conversations from './nav/Conversations';
import { PiDotsNineBold, PiGearSixBold } from 'react-icons/pi';
import { BsPerson } from 'react-icons/bs';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

export default function Navigate() {
    return (
        <div className='w-[30%] h-full px-6 py-8 gap-6 flex flex-col bg-[#221f34]'>
            <div className='flex gap-6 w-full pr-4'>
                <SearchBox />
                <div className='w-[10%]'>
                    <button className="btn bg-[#343142] hover:bg-[#343142] m-0">
                        <Icon className='text-2xl'>
                            <MdOpenInNew />
                        </Icon>
                    </button>
                </div>
            </div>
            <Contacts />
            <div className='flex justify-between items-center'>
                <h2>Message</h2>
                <Icon className='text-xl'>
                    <IoChatbubbleOutline />
                </Icon>
            </div>
            <Conversations />
            <div className='w-full flex gap-2 relative'>
                <div className='w-full'>
                    <button className='btn btn-error btn-sm w-full text-white'>LOG OUT</button>
                </div>
                <button className='flex items-center'>
                    <Icon className='text-3xl'>
                        <PiDotsNineBold />
                    </Icon>
                </button>
                <div className='absolute  bottom-10  z-10 right-0 p-2 inline-block text-sm font-medium bg-gray-600/80 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 h-auto origin-bottom-left'>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <IoMdRemoveCircleOutline />
                        </Icon>
                        Delete Account
                    </button>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <MdOutlineDarkMode />
                        </Icon>
                        Change Mode
                    </button>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <PiGearSixBold />
                        </Icon>
                        Settings
                    </button>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <BsPerson />
                        </Icon>
                        Profile
                    </button>
                </div>
            </div>
        </div>
    )
}
