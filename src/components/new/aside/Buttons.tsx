import { GoBell, GoInfo } from 'react-icons/go';
import { MdOutlineLogout } from 'react-icons/md';
import { TiUserAddOutline } from 'react-icons/ti';

import Icon from '../../atoms/Icon';

export default function Buttons() {
    return (
        <div className='w-full flex justify-between'>
            <button className='btn bg-[#343142] hover:bg-[#343142] m-0'>
                <Icon className='text-xl'>
                    <GoBell />
                </Icon>
            </button>
            <button className='btn bg-[#343142] hover:bg-[#343142] m-0'>
                <Icon className='text-xl'>
                    <GoInfo />
                </Icon>
            </button>
            <button className='btn bg-[#343142] hover:bg-[#343142] m-0'>
                <Icon className='text-xl'>
                    <TiUserAddOutline />
                </Icon>
            </button>
            <button className='btn bg-[#343142] hover:bg-[#343142] m-0'>
                <Icon className='text-xl text-red-500'>
                    <MdOutlineLogout />
                </Icon>
            </button>
        </div>
    )
}
