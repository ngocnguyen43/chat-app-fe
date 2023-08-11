import { FaExclamation, FaPlus, FaSignInAlt, FaUserFriends } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

import Icon from './atoms/Icon';
import { useAppDispatch } from '../hooks';
import { setFriendBoxOpen } from '../store/friend-box-slice';
import { useNavigate } from 'react-router-dom';

export default function LeftMenu() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const handleOnClickContacts = () => {
        navigate("../contact")
    }
    const handleOnClickConversations = () => {
        navigate("../conversation")
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
                    <div className='w-14 h-14 rounded-full bg-blue-50 drop-shadow-md flex items-center justify-center relative cursor-pointer' onClick={handleOnClickContacts}>
                        <Icon className='text-xl'>
                            <FaUserFriends />
                        </Icon>
                        <span className='absolute top-0 right-0'>
                            <Icon color='red' className='text-xl'>
                                <FaExclamation />
                            </Icon>
                        </span>
                    </div>
                </div>
                <div>
                    <div className='w-14 h-14 rounded-full bg-blue-50 flex drop-shadow-md items-center justify-center cursor-pointer'>
                        <Icon className='text-xl'>
                            <FaPlus />
                        </Icon>
                    </div>
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
