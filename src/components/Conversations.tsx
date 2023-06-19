import React from 'react'
import Input from './atoms/Input'
import { HiDotsHorizontal } from "react-icons/hi"
import { AiOutlineSearch } from "react-icons/ai"
import { IconContext } from 'react-icons'
import { useAppDispatch, useAppSelector } from '../hooks'
import clsx from 'clsx'
import { setSettingOpen } from '../store/setting-slice'
const UserBanner = () => {
    const { isSettingOpen } = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch()
    return <div className='flex flex-row items-center  w-full justify-between '>
        <div className='bg-cyan-300 rounded-full w-8 h-8'>
        </div>
        <div className='flex-1 ml-4'>
            <span className='font-bold text-sm'>Nguyen Minh Ngoc</span>
        </div>
        <div className='cursor-pointer relative'>
            <span onClick={() => dispatch(setSettingOpen(!isSettingOpen))}>
                <IconContext.Provider value={{ className: "text-xl" }}>
                    <HiDotsHorizontal />
                </IconContext.Provider>
            </span>
            <div className={clsx('absolute w-32 h-40 bg-white drop-shadow-lg z-10 rounded-2xl -translate-x-1/2 left-1/2  duration-300', isSettingOpen ? "transition-all opacity-100 top-5 translate-y-0 ease-in" : "transition-all top-5 -translate-y-2 ease-out opacity-0")}></div>
        </div>
    </div>
}
const SearchBar = () => {

    return <div className='relative'>
        <Input className='!rounded-md !px-2 w-full ' placeholder='Search' />
        <IconContext.Provider value={{ className: "text-2xl absolute top-[50%] right-0 translate-y-[-50%] -translate-x-2", color: "gray" }}>
            <AiOutlineSearch />
        </IconContext.Provider>
    </div>
}
const UserMessage = () => {
    return <div className='flex w-[calc(100%-4px)] flex-row justify-between cursor-pointer hover:bg-blue-50 p-2 rounded-md '>
        <div className='relative rounded-full w-10 h-10 bg-cyan-300 after:absolute after:w-4 after:h-4 after:top-0 after:right-0 after:bg-green-400 after:rounded-full after:border-2 after:border-solid after:border-white'></div>
        <div className='flex flex-col justify-around flex-1 ml-2 text-ellipsis overflow-hidden'>
            <span className='text-xs font-bold'>Nguyen Minh Admin</span>
            <span className='text-ellipsis overflow-hidden text-[12px]'>Hello00000000000000000000</span>
        </div>
        <div className='flex flex-col justify-evenly items-end'>
            <span className='text-[10px]'>5h ago</span>
            <div className='rounded-full w-4 h-4 bg-red-500 flex items-center justify-center text-white text-[8px]'>99+</div>
        </div>
    </div>
}
export default function Conversations() {
    return (
        <aside className='flex flex-col pl-2 '>
            <div className='sticky top-0 bg-white flex !flex-col gap-2 pr-2'>
                <UserBanner />
                <SearchBar />
            </div>
            <div className='w-[270px] overflow-x-hidden h-full conversations'>
                <div>
                    <span className='text-xs'>Pinned</span>
                </div>
                <div className='flex flex-col'>

                    <UserMessage />
                    <UserMessage />
                    <UserMessage />
                    <UserMessage />
                </div>
                <div>
                    <span className='text-xs'>Direct Messages</span>
                </div>
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <UserMessage />
                <div>
                    <span className='text-xs'>Group Messages</span>
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
            </div>
        </aside>
    )
}
