import React from 'react'
import SearchBox from './nav/SearchBox';
import Contacts from './nav/Contacts';
import Icon from '../atoms/Icon';
import { IoChatbubbleOutline } from "react-icons/io5"
import { MdOpenInNew } from 'react-icons/md';
import Conversations from './nav/Conversations';

export default function Navigate() {
    return (
        <div className='w-[20%] h-full px-6 py-8 gap-6 flex flex-col '>
            <div className='flex gap-6'>
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
        </div>
    )
}
