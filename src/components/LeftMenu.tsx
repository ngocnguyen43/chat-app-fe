import Icon from './atoms/Icon'
import { FaExclamation, FaPlus, FaUserFriends, FaSignInAlt } from "react-icons/fa"
export default function LeftMenu() {
    return (
        <aside className='flex flex-col w-20 items-center justify-between pt-2'>
            <div className='flex flex-col gap-4'>
                <div>
                    <div className='w-14 h-14 rounded-full bg-blue-50 drop-shadow-md flex items-center justify-center relative cursor-pointer'>
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
