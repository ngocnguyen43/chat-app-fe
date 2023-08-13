import { IconContext } from 'react-icons';
import { AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from '../hooks';
import Icon from './atoms/Icon';
import Input from './atoms/Input';
import Conversations from './Conversations';
import Contacts from './Contacts';

const UserBanner = () => {
    const { isSettingOpen } = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch()
    return <div className='flex flex-row items-center  w-full h-16 justify-between '>
        <div className='bg-cyan-300 rounded-md w-10 h-10'>
        </div>
        <div className='flex-1 ml-4'>
            <span className='font-bold text-md'>Nguyen Minh Ngoc</span>
        </div>
        <Icon className='text-4xl text-blue-700'>
            <AiFillPlusCircle />
        </Icon>
        {/* <div className='cursor-pointer relative'>
            <span onClick={() => dispatch(setSettingOpen(!isSettingOpen))}>
                <IconContext.Provider value={{ className: "text-xl" }}>
                    <HiDotsHorizontal />
                </IconContext.Provider>
            </span>
            <div className={clsx('absolute w-32 h-40 bg-white drop-shadow-lg z-10 rounded-2xl -translate-x-1/2 left-1/2  duration-300', isSettingOpen ? "transition-all opacity-100 top-5 translate-y-0 ease-in" : "transition-all top-5 -translate-y-2 ease-out opacity-0")}></div>
        </div> */}
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

export default function Connections() {
    const { name } = useAppSelector(state => state.currentTab)
    // data && setConversations(state => [...state, ...JSON.parse(data) as []])
    return (
        <aside className='flex flex-col w-96'>
            <div className='sticky top-0 bg-white flex  gap-2 pr-2'>
                <UserBanner />
            </div>
            <div className='sticky top-0 bg-white flex !flex-col gap-2 pr-2 my-4'>
                <SearchBar />
            </div>
            <div className='overflow-y-scroll'>

                {name === "conversation" && <Conversations />}
                {name === "contact" && <Contacts />}
            </div>
        </aside>
    )
}
