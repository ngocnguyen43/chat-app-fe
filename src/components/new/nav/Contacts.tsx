import React from 'react'

const Contact: React.FunctionComponent = () => {
    return (
        <div className='flex flex-col gap-2 justify-center items-center'>
            <div className="avatar">
                <div className="w-14 rounded-full ring ring-green-300 ring-offset-base-100 ring-offset-2">
                    <img src="https://th.bing.com/th/id/OIP.5dSi0zCpBrYxg1gwbe1IhgHaEo?pid=ImgDet&rs=1" alt='minh ngoc' />
                </div>
            </div>
            <h2 className='text-[14px] font-medium '>Trang</h2>
        </div>
    )
}
export default function Contacts() {
    return (
        <div className='w-full gap-4 flex'>
            <Contact />
            <Contact />
            <Contact />
        </div>
    )
}
