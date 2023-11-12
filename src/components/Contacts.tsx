import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector, useFetchContacts } from '../hooks';
import { ContactType } from '../hooks/useFetchContacts';
import { useFormatConversationStatus } from '../hooks/useFormatConversationStatus';
import { Storage } from '../service/LocalStorage';
import { socket } from '../service/socket';

type ContactElementType = {
    status: "online" | "offline" | string
    id: string,
    name: string,
    lastLogin?: 0 | string,
    info?: any
    onClick: (props: { id: string, name: string }) => void
}
const Contact: React.FunctionComponent<ContactElementType> = ({ id, status, name, lastLogin, onClick }) => {
    const now = useFormatConversationStatus(lastLogin ? +lastLogin : 0)
    return (
        <div className={clsx('w-full flex h-14 items-center gap-2 cursor-pointer px-2 rounded-md hover:bg-slate-100')} onClick={() => onClick({ id, name })} >
            <div className='w-10 h-10 rounded-md bg-slate-300'>
            </div>
            <div className='flex flex-col'>
                <span className='text-lg font-medium'>{name}</span>
                <div className='flex items-center flex-row gap-2'>
                    <span className={clsx("inline-flex rounded-full h-3 w-3", status === "offline" ? "bg-red-500" : "bg-green-500")}></span>
                    {status === "online" && <span>{status}</span>}
                    {status === "offline" && (typeof lastLogin === "string" ? <span>{now}</span> : <span className='text-sm'>a long time ago</span>)}
                </div>
            </div>
        </div>
    )
}
export default function Contacts() {
    const { data } = useFetchContacts()
    const [offlines, setOfflines] = React.useState<ContactType[]>([])
    const [onlines, setOnlines] = React.useState<ContactType[]>([])
    console.log(data)
    // const dispatch = useAppDispatch()
    const { id: room } = useAppSelector(state => state.currentConversation)
    const id = Storage.Get("key")
    const { offline, online } = data ?? {}
    React.useEffect(() => {
        if (offline) {
            setOfflines([...offline])
        }
        if (online) {
            setOnlines([...online])
        }
    }, [offline, online])
    React.useEffect(() => {
        socket.on("user online contact", (arg: { id: string }) => {
            const user = offlines.find((item) => item.info.userId === arg.id)
            if (user && user.status) {
                user.status = "online"
            }
            setOfflines(prev => prev.filter(item => item.info.userId !== arg.id))
            user && setOnlines(prev => Array.from(new Set(prev).add(user)))
        })
        socket.on("user offline contact", (arg: { id: string, lastLogin: string }) => {
            const user = onlines.find(item => item.info.userId === arg.id)
            if (user && user.status) {
                user.status = "offline"
                user.lastLogin = arg.lastLogin
            }
            setOnlines(prev => prev.filter(item => item.info.userId !== arg.id))
            user && setOfflines(prev => [...prev, user])
        })
        return () => {
            socket.off("user online contact")
            socket.off("user offline contact")
        }
    }, [offlines, onlines])
    const handleOnclick = (props: { name: string, id: string }) => {
        console.log(props)
        socket.auth = { id }
        socket.emit("leave room", room)
        Storage.Set<string>("current_conversation_id", props.id)
        Storage.Set<string>("current_conversation", props.name)
        socket.emit("join conversation", props.id)
    }
    return (
        <>

            <div>online</div>
            {(onlines && onlines.length > 0) ? onlines.map((item) => {
                return (
                    <NavLink key={item.conversationId} className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " hover:bg-blue-100 w-full rounded-md"} to={`/me/${item.conversationId}`}>
                        <Contact status={item.status} name={item.info.fullName} id={item.conversationId} onClick={handleOnclick} />
                    </NavLink>
                )

            }) : null}
            <div>offline</div>
            {offlines && offlines.length > 0 ? offlines.map((item) => {
                return (
                    <NavLink key={item.conversationId} className={(nav) => (nav.isActive ? "bg-blue-50" : "") + " hover:bg-blue-600 w-full rounded-md"} to={`/me/${item.conversationId}`}>
                        <Contact status={item.status} name={item.info.fullName} id={item.conversationId} lastLogin={item.lastLogin} onClick={handleOnclick} />
                    </NavLink>
                )

            }) : null}
        </>
    )
}
