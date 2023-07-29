import React from 'react'
import { socket } from '../service/socket';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function Socket() {
    const { id } = useAppSelector(state => state.socketId)
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
        // const interval = setInterval(() => {
        //     console.log("emitted!")
        //     socket.emit("message", "hello");
        // }, 1000);
        return () => {
            // clearInterval(interval)
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
            socket.off('get_all_conversation')
            socket.disconnect()
        }
    }, [])
    return (
        <form>
            <label htmlFor="">ID</label>
            <input type="text" />
        </form>
    )
}
