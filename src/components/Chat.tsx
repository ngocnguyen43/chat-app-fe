import React from 'react'
import { IconContext } from 'react-icons'
import { BsCameraVideo, BsTelephone, BsSearch, BsListUl, BsSend } from "react-icons/bs"
import Input from './atoms/Input'
import Icon from './atoms/Icon'
export default function Chat() {
    return (
        <main className='flex flex-col  border-solid border-red-200 border-2 h-full w-[600px]'>
            <div className='flex flex-row items-center flex-grow-[0] justify-between h-14 px-4'>
                <div>
                    <h2>Nguyen Minh Admin</h2>
                </div>
                <div className='grid flex-[1]'>
                    <div className='justify-self-stretch grid'>
                        <div className='justify-self-end rounded-full w-14 h-14 bg-cyan-300'></div>
                    </div>
                </div>
                <div className='flex flex-row gap-6'>
                    <Icon className='text-2xl cursor-pointer' >
                        <BsTelephone />
                    </Icon>
                    <Icon className='text-2xl cursor-pointer' >
                        <BsCameraVideo />
                    </Icon>
                    <Icon className='text-2xl cursor-pointer' >
                        <BsSearch />
                    </Icon>
                    <Icon className='text-2xl cursor-pointer' >
                        <BsListUl />
                    </Icon>
                </div>
            </div>
            <div className='grid justify-self-stretch border-2 border-solid border-red-900'>
            </div>
            <div className='relative flex bottom-0 flex-grow-[1]'>
                <Input className='absolute !rounded-md w-full !h-[45px] !px-2 !text-xl' />
                <IconContext.Provider value={{ className: "absolute text-2xl top-[1/6] right-0 translate-y-[50%] -translate-x-2 " }}>
                    <BsSend />
                </IconContext.Provider>
            </div>
        </main>
    )
}
