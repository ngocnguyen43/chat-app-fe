import React from 'react'
import Input from './atoms/Input'
import { IoMdSettings } from "react-icons/io"
import { AiOutlineSearch } from "react-icons/ai"
import { IconContext } from 'react-icons'
const UserBanner = () => {
    return <div className='flex flex-row items-center  w-full justify-between '>
        <div className='bg-cyan-300 rounded-full w-10 h-10'>
        </div>
        <div className='flex-1 ml-4'>
            <span className='font-bold'>Nguyen Minh Ngoc</span>
        </div>
        <div>
            <IconContext.Provider value={{ className: "text-2xl" }}>
                <IoMdSettings />
            </IconContext.Provider>
        </div>
    </div>
}
const SearchBar = () => {

    return <div className='relative'>
        <Input className='!rounded-md !px-2 w-full' placeholder='Search' />
        <IconContext.Provider value={{ className: "text-2xl absolute top-[50%] right-0 translate-y-[-50%] -translate-x-2", color: "gray" }}>
            <AiOutlineSearch />
        </IconContext.Provider>
    </div>
}
const UserMessage = () => {
    return <div className='flex w-full flex-row justify-between cursor-pointer hover:bg-slate-400 p-2 rounded-md'>
        <div className='rounded-full w-14 h-14 bg-cyan-300'></div>
        <div className='flex flex-col justify-around flex-1 ml-2 text-ellipsis overflow-hidden'>
            <span className='text-lg font-bold'>Nguyen Minh Admin</span>
            <span className='text-ellipsis overflow-hidden'>Hello00000000000000000000</span>
        </div>
        <div className='flex flex-col justify-evenly items-end'>
            <span className='text-sm'>5h ago</span>
            <div className='rounded-full w-5 h-5 bg-red-500 flex items-center justify-center text-white text-xs'>5</div>
        </div>
    </div>
}
export default function Conversations() {
    return (
        <aside className='flex flex-col w-[350px] overflow-x-hidden h-full '>
            <div className='sticky top-0 bg-white'>
                <UserBanner />
                <SearchBar />
            </div>
            <div>
                <span>Pinned</span>
            </div>
            <div className='flex flex-col'>

                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
            </div>
            <div>
                <span>Direct Messages</span>
            </div>
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <div>
                <span>Group Messages</span>
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
            <UserMessage />
        </aside>
    )
}
