import clsx from 'clsx';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { MdOpenInNew, MdOutlineDarkMode } from 'react-icons/md';
import { PiDotsNineBold, PiGearSixBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { Storage } from '../../service/LocalStorage';
import { clear } from '../../store/contacts-slice';
import Icon from '../atoms/Icon';
import Contacts from './nav/Contacts';
import Conversations from './nav/Conversations';
import SearchBox from './nav/SearchBox';

export default function Navigate() {
    const [shouldSettingOpen, setSettingOpen] = React.useState<boolean>(false);
    const buttonSettingRef = React.useRef<HTMLButtonElement | null>(null)
    const settingMenuRef = React.useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        Storage.Clear();
        dispatch(clear())
        navigate("/signin")
    }
    React.useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (!(settingMenuRef.current?.contains(event.target as HTMLElement) || buttonSettingRef.current?.contains(event.target as HTMLDivElement))) {
                setSettingOpen(false)
            }
        }
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [])
    return (
        <div className='w-[25%] h-full px-2 py-8 gap-6 flex flex-col bg-[#221f34]'>
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
            <div className='flex justify-between items-center px-8'>
                <h2>Message</h2>
                <Icon className='text-xl'>
                    <IoChatbubbleOutline />
                </Icon>
            </div>
            <Conversations />
            <div className='w-full flex gap-2 relative '>
                <div className='w-full '>
                    <button className='btn btn-error btn-sm w-full text-white hover:bg-red-500 hover:outline-none hover:border-none' onClick={handleLogout}>LOG OUT</button>
                </div>
                <button ref={buttonSettingRef} className='flex items-center' onClick={() => { setSettingOpen(prev => !prev) }} >
                    <Icon className='text-3xl'>
                        <PiDotsNineBold />
                    </Icon>
                </button>
                <div ref={settingMenuRef} className={clsx('absolute  bottom-10  z-10 right-0 p-2 inline-block text-sm font-medium bg-gray-600/40 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 h-auto origin-bottom-right', !shouldSettingOpen ? " opacity-0 scale-0" : "opacity-100 scale-100  ")}>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-700 text-white focus:outline-none flex items-center gap-2">
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
