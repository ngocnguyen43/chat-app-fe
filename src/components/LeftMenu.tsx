import { FaExclamation, FaPlus, FaSignInAlt, FaUserFriends } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

import Icon from './atoms/Icon';
import { useAppDispatch } from '../hooks';
import { setFriendBoxOpen } from '../store/friend-box-slice';
import { useNavigate } from 'react-router-dom';
import { m } from "framer-motion"
import { setCurrentTab } from '../store/current-menu-slice';

export default function LeftMenu() {
    const dispatch = useAppDispatch()
    const handleOnClickContacts = () => {
        dispatch(setCurrentTab("contact"))
    }
    const handleOnClickConversations = () => {
        dispatch(setCurrentTab("conversation"))
    }
    return (
        <aside className='flex flex-col w-20 items-center justify-between pt-2'>
            <div className='flex flex-col gap-4'>
                <div>
                    <div className='w-14 h-14 rounded-full bg-blue-50 drop-shadow-md flex items-center justify-center relative cursor-pointer' onClick={handleOnClickConversations} >
                        <Icon className='text-xl'>
                            <FaMessage />
                        </Icon>
                    </div>
                </div>
                <div>
                    <m.div whileHover={{ scale: 1.1 }}>
                        <div className='w-14 h-14 rounded-full bg-blue-50 drop-shadow-md flex items-center justify-center relative cursor-pointer' onClick={handleOnClickContacts}>
                            <Icon className='text-xl'>
                                <FaUserFriends />
                            </Icon>
                            <span className="animate-ping absolute top-0 right-0 h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                            <span className="absolute top-0 right-0 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </div>
                    </m.div>
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
                <div>
                    <div className='w-14 h-14 rounded-full bg-blue-50 flex drop-shadow-md items-center justify-center relative cursor-pointer'>
                        <Icon className='text-xl'>
                            <FaSignInAlt />
                        </Icon>
                    </div>
                </div>
            </div>
        </aside>
    )
}
