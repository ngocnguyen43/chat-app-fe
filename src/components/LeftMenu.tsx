import { m } from 'framer-motion';
import { FaPlus, FaSignInAlt, FaUserFriends } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
// import { setFriendBoxOpen } from '../store/friend-box-slice';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../hooks';
import { Storage } from '../service/LocalStorage';
import { setCurrentTab } from '../store/current-menu-slice';
import Icon from './atoms/Icon';

export default function LeftMenu() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleOnClickContacts = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        dispatch(setCurrentTab("contact"))
    }
    const handleOnClickConversations = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        dispatch(setCurrentTab("conversation"))
    }
    const handleLogOut = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        Storage.Clear();
        navigate("/")
    }
    return (
        <aside className='flex flex-col w-20 items-center justify-between pt-2'>
            <div className='flex flex-col gap-4'>
                <button onClick={handleOnClickConversations} >
                    <m.div whileHover={{ scale: 1.1 }}>
                        <div className='w-14 h-14 rounded-full bg-blue-50 drop-shadow-md flex items-center justify-center relative cursor-pointer' >
                            <Icon className='text-xl'>
                                <FaMessage />
                            </Icon>
                        </div>
                    </m.div>
                </button>
                <div>
                    <button
                        onClick={handleOnClickContacts}
                    >
                        <m.div whileHover={{ scale: 1.1 }}>
                            <div className='w-14 h-14 rounded-full bg-blue-50 drop-shadow-md flex items-center justify-center relative cursor-pointer'>
                                <Icon className='text-xl'>
                                    <FaUserFriends />
                                </Icon>
                                <span className="animate-ping absolute top-0 right-0 h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                                <span className="absolute top-0 right-0 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </div>
                        </m.div>
                    </button>
                </div>
                <div>
                    <m.div whileHover={{ scale: 1.1 }}>
                        <div className='w-14 h-14 rounded-full bg-blue-50 flex drop-shadow-md items-center justify-center cursor-pointer'>
                            <Icon className='text-xl'>
                                <FaPlus />
                            </Icon>
                        </div>
                    </m.div>
                </div>
                <div>
                </div>
            </div>
            <div>
                <button onClick={handleLogOut}>
                    <m.div whileHover={{ scale: 1.1 }}>
                        <div className='w-14 h-14 rounded-full bg-blue-50 flex drop-shadow-md items-center justify-center relative cursor-pointer' >
                            <Icon className='text-xl'>
                                <FaSignInAlt />
                            </Icon>
                        </div>
                    </m.div>
                </button>
            </div>
        </aside>
    )
}
