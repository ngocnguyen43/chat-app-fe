import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiDotsHorizontal } from "react-icons/hi"
import Icon from '../../atoms/Icon'
import { BsCameraVideo, BsPersonAdd, BsTelephone } from 'react-icons/bs'
import { BiBlock } from 'react-icons/bi'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { FaRegTrashCan } from 'react-icons/fa6'
import { IoLogOutOutline } from 'react-icons/io5'
import { PiGearSixBold } from 'react-icons/pi';
import clsx from 'clsx'
import { generateRandomString } from '../../../utils'
import { Storage } from '../../../service/LocalStorage'
import { socket } from '../../../service/socket'
import { useAppDispatch } from '../../../hooks'
import { setCallBoxOpen, setRoom } from "../../../store/open-call-slice"
const ConversationUtils = () => {
    const settingButtonRef = React.useRef<HTMLDivElement | null>(null)
    const settingMenuRef = React.useRef<HTMLDivElement | null>(null)
    const isGroup = JSON.parse(Storage.Get("isGroup") as string) as boolean
    const debounce = React.useRef<NodeJS.Timeout | null>(null)
    const [shouldShowSettingMenu, setShouldShowSettingMenu] = React.useState<boolean>(false)
    const room = Storage.Get("id") as string
    const user = Storage.Get("key") as string
    const dispacth = useAppDispatch()
    const handleOnClickVideoCamera = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        socket.emit("video chat open", { room, userCreate: user })
        const randomToken = generateRandomString(92);
        // dispatch(setVideoToken(randomToken))
        Storage.Set("video-token", randomToken)
        const popup = window.open(`/video/${randomToken}`, "_blank", "popup=1")
        if (popup) {
            popup.onbeforeunload = function () {
                Storage.Del("video-token")
            }
        }
    }
    React.useEffect(() => {
        socket.on("video chat open", (args: { room: string, userCreated: string }) => {
            console.log(args)
            if (args.room && args.userCreated) {
                dispacth(setCallBoxOpen(true))
                dispacth(setRoom(args.room))
            }
        })
        return () => {
            socket.off("video chat open")
        }
    })
    React.useEffect(() => {
        const handler = (event: MouseEvent) => {
            if ((settingButtonRef.current?.contains(event.target as HTMLElement) || settingMenuRef.current?.contains(event.target as HTMLElement))) {
                if (debounce.current) {
                    clearTimeout(debounce.current)
                }
                debounce.current = setTimeout(() => {
                    setShouldShowSettingMenu(true)
                }, 30)
            }
            else {
                if (debounce.current) {
                    clearTimeout(debounce.current)
                }
                debounce.current = setTimeout(() => {
                    setShouldShowSettingMenu(false)
                }, 30)
            }
        }
        document.addEventListener("mousemove", handler)
        return () => {
            document.removeEventListener("mousemove", handler)
        }
    })
    return (
        <div className='flex gap-6 items-center '>
            <button onClick={handleOnClickVideoCamera}>
                <Icon className='text-2xl'>
                    <BsCameraVideo />
                </Icon>
            </button>
            <Icon className='text-2xl'>
                <BsTelephone />
            </Icon>
            <Icon className='text-2xl'>

                <CiSearch />
            </Icon>
            <div ref={settingButtonRef} className='relative'>
                <Icon className='text-2xl cursor-pointer'>
                    <HiDotsHorizontal />
                </Icon>
                <div ref={settingMenuRef} className={clsx('absolute h-auto z-10 top-10 right-0 p-2 inline-block text-sm font-medium bg-gray-600/80 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 origin-top-right', !shouldShowSettingMenu ? " opacity-0 scale-0" : "opacity-100 scale-100  ")}>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <PiGearSixBold />
                        </Icon>
                        Group Setting</button>
                    <button type='button' className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
                            <BsPersonAdd />
                        </Icon>
                        Add User</button>
                    <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2">
                        <Icon className='text-xl'>
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
            {isGroup && <div className="avatar-group -space-x-6">
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
            </div>}
        </div>
    )
}
export default React.memo(ConversationUtils)