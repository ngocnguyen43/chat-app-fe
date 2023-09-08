import React from 'react'
import { useFetchContacts, ContactType, useAppDispatch, useAppSelector } from '../../../hooks'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { setCurrentConversation } from '../../../store/current-conversation-slice'
import { Storage } from '../../../service/LocalStorage';
import Carousel from 'react-multi-carousel'

const Contact: React.FunctionComponent<ContactType> = (props) => {
    const { _userId, conversationId, avatar, status, fullName } = props
    const dispatch = useAppDispatch()
    const onClick = React.useCallback(() => {
        dispatch(setCurrentConversation({ avatar, id: conversationId, isGroup: false, isOnline: status === "online", name: fullName }))
        Storage.Set("avatar", avatar)
        Storage.Set("id", conversationId)
        Storage.Set("isGroup", JSON.stringify(false))
        Storage.Set("isOnline", JSON.stringify(status === "online"))
        Storage.Set("name", fullName)
    }, [avatar, conversationId, dispatch, fullName, status])
    return (
        <NavLink to={conversationId} className='flex flex-col gap-2 justify-center items-center' onClick={onClick}>
            <div className="avatar relative ">
                <div className={clsx("w-14 rounded-full ring  ring-offset-base-100 ring-offset-4", (status === "online" ? "ring-green-300" : "ring-red-300"))}>
                    <img src={"https://d3lugnp3e3fusw.cloudfront.net/" + avatar} alt='minh ngoc' />
                </div>
            </div>
            <h2 className='text-[14px] font-medium fixed -bottom-8 z-90'>{fullName}</h2>
        </NavLink>
    )
}
export default function Contacts() {
    const { entities } = useAppSelector(state => state.contacts)
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel responsive={responsive} className='w-full py-9 flex gap-1 '>
            {
                entities ? entities.map(item => <Contact key={item.userId} {...item} />) : null
            }
        </Carousel>
        // <div className='w-full gap-6 flex px-10 overflow-x-scroll py-6'>

        // </div>
    )
}
