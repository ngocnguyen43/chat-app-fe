import React from 'react'
import { useFetchContacts, ContactType, useAppDispatch } from '../../../hooks'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { setCurrentConversation } from '../../../store/current-conversation-slice'
import { Storage } from '../../../service/LocalStorage';

const Contact: React.FunctionComponent<ContactType> = (props) => {
    const { _userId, conversationId, profile: { avatar }, status, fullName } = props
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
            <div className="avatar">
                <div className={clsx("w-14 rounded-full ring  ring-offset-base-100 ring-offset-2", (status === "online" ? "ring-green-300" : "ring-red-300"))}>
                    <img src={"https://d3lugnp3e3fusw.cloudfront.net/" + avatar} alt='minh ngoc' />
                </div>
            </div>
            <h2 className='text-[14px] font-medium '>{fullName}</h2>
        </NavLink>
    )
}
export default function Contacts() {
    const { data } = useFetchContacts()
    return (
        <div className='w-full gap-4 flex'>
            {
                data ? data.map(item => <Contact key={item.profile.avatar} {...item} />) : null
            }

        </div>
    )
}
