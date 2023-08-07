import React from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { socket } from '../service/socket';

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
        socket.on("get_all_conversation", (arg) => {
            (arg as []).forEach((item) => {
                socket.emit("join_conversation", item['conversationId'])
            })
            console.log(arg)
        })
        socket.on("private_message", ({ message, from }) => {
            console.log({ message, from });
        });
        const interval = setInterval(() => {
            console.log("emitted!")
            socket.emit("private_message", {
                message: "Hello",
                to: "bb6c439c-b83b-471c-b93e-b6663b4f7e5e",
                time: new Date().getTime()
            });
        }, 2000);
        return () => {
            clearInterval(interval)
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
