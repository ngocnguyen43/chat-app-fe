import React from 'react'
import { IconContext } from 'react-icons'
import { BsCameraVideo, BsTelephone, BsSearch, BsListUl, BsSend, BsMicFill, BsMic } from "react-icons/bs"
import Input from './atoms/Input'
import Icon from './atoms/Icon'
import fourDots from "../assets/fourdots.svg"
export default function Chat() {
    return (
        <main className='flex flex-col px-2  h-full w-[600px]'>
            <div className='flex flex-row items-center  justify-between h-14 px-4'>
                <div>
                    <h2 className='font-bold text-lg'>Nguyen Minh Admin</h2>
                </div>
                <div className='grid flex-[1]'>
                    <div className='justify-self-stretch grid'>
                        <div className='justify-self-end rounded-full w-14 h-14 bg-cyan-300'></div>
                    </div>
                </div>
                <div className='flex flex-row gap-6 ml-4'>
                    <Icon className='text-xl cursor-pointer' >
                        <BsTelephone />
                    </Icon>
                    <Icon className='text-xl cursor-pointer' >
                        <BsCameraVideo />
                    </Icon>
                    <Icon className='text-xl cursor-pointer' >
                        <BsSearch />
                    </Icon>
                    <Icon className='text-xl cursor-pointer' >
                        <BsListUl />
                    </Icon>
                </div>
            </div>
            <div className=' h-[calc(100%-100px)] '>
            </div>
            <div className='flex justify-between flex-row w-full h-[45px]'>
                <div className='flex items-center gap-2 flex-row h-full mx-1'>
                    <img src={fourDots} alt="" className='w-14 cursor-pointer ' />
                </div>
                <div className='relative flex w-full bottom-0'>
                    <Input className='absolute !rounded-xl  !px-2 !text-xl w-full' />
                    <IconContext.Provider value={{ className: "absolute text-2xl top-[1/6] right-0 translate-y-[50%] -translate-x-2 " }}>
                        <BsSend />
                    </IconContext.Provider>
                </div>
            </div>
        </main>
    )
}
