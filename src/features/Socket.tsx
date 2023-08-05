import React, { useState } from 'react'
import { socket } from '../service/socket';
import { useAppDispatch, useAppSelector, useFetchContacts } from '../hooks';

export default function Socket() {
    const { id } = useAppSelector(state => state.socketId)
    const { data, error, isLoading } = useFetchContacts()
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const [conversations, setConversations] = useState<unknown[]>([])
    React.useEffect(() => {
        socket.auth = { id: id }
        socket.connect()
        socket.on("connect", () => {
            console.log(`connect ${socket.id}`);
        });
        socket.on("disconnect", () => {
            console.log(`disconnect`);
        });
        socket.on("connect_error", (err) => {
            console.log(err);
        });
        // socket.on("get_all_conversation", (arg) => {
        //     (arg as []).forEach((item) => {
        //         socket.emit("join_conversation", item['conversationId'])
        //     })
        //     console.log(arg)
        // })
        // const interval = setInterval(() => {
        //     console.log("emitted!")
        //     socket.emit("message", "hello");
        // }, 1000);
        socket.emit("authenticate", "hello")
        socket.on("get contacts status", (args) => {
            console.log(args)
        })
        socket.on("online user", (arg) => {
            console.log(`user ${arg} is online`)
        })
        socket.on("offline user", (arg) => {
            console.log(`user ${arg} is offline`)
        })
        socket.on("get conversations", (arg) => {
            setConversations(arg)
            console.log(`conversations ${arg}`)
        })
        return () => {
            // clearInterval(interval)
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
            socket.off('get_all_conversation')
            socket.off("get contacts status")
            socket.off("online user")
            socket.off("offline user")
            socket.off("get conversations")
            socket.disconnect()
        }
    }, [id])
    return (
        <div className='text-2xl items-center justify-center'>
            {JSON.stringify(data)}
            <br />
            {JSON.stringify(onlineUsers)}
            <br />
            {JSON.stringify(conversations)}
        </div>
    )
}
