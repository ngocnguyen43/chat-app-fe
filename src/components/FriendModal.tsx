import React from 'react'
import { useAppSelector } from '../hooks'
import clsx from 'clsx'

interface IFriendModal {
    children: JSX.Element
}
const FriendModal = () => {
    const { isBoxOpen } = useAppSelector(state => state.friendBox)
    return (
        <>
            <div className={clsx('absolute z-10 top-0 left-0 h-full w-full bg-white opacity-80 flex items-center justify-center', isBoxOpen ? "animate-fade-in transition-all visible" : "hidden")}>
            </div>
            <div className={clsx('absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-[85%] bg-gray-200 z-90  border-none z-20 rounded-md', isBoxOpen ? "visible" : "hidden")} >Hello</div>
        </>

    )
}
export default FriendModal
