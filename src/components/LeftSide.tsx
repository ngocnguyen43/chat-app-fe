import React from 'react';
import { Outlet } from 'react-router-dom';

import Conversations from './Conversations';
import LeftMenu from './LeftMenu';

export default function LeftSide() {
    return (
        <section className='flex h-screen w-full items-center justify-center maxw'>
            <div className='flex flex-col  w-full h-full drop-shadow-xl'>
                <div className='flex relative w-full h-full main-windows [&>*:not(:first-child)]:border-l-2  rounded-b-2xl bg-white py-4'>
                    <LeftMenu />
                    <Conversations />
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
