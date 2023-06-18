import React from 'react'
import Conversations from './../components/Conversations';
import Chat from '../components/Chat';

export default function Test() {
    return (
        <section className='flex items-center justify-center maxw'>
            <div className='flex w-[1024px] h-[768px] '>
                <Conversations />
                <Chat />
            </div>
        </section>
    )
}
