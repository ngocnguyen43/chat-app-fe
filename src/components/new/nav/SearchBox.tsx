import React from 'react';
import { BiSearch } from 'react-icons/bi';

import Icon from '../../atoms/Icon';

export default function SearchBox() {
    return (
        <div className=' relative w-full'>
            <input type="text" className='input input-bordered w-full  max-w-xs focus:outline-none bg-[#343142] text-xl pl-10' spellCheck={false} />
            <Icon className='absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-2xl'>
                <BiSearch />
            </Icon>
        </div>
    )
}
