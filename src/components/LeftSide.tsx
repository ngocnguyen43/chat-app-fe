import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Conversations from './Conversations';
import LeftMenu from './LeftMenu';
import { Storage } from '../service/LocalStorage';

export default function LeftSide() {
    const key = Storage.Get("key")
    const naviagte = useNavigate()
    React.useEffect(() => {
        console.log(key)
        if (!key) {
            naviagte("../")
        }
    }, [key, naviagte])
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
