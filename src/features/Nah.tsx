import React from 'react'
import Navigate from '../components/new/Navigate'
import { socket } from '../service/socket'
import { Storage } from '../service/LocalStorage'
import { Outlet } from 'react-router-dom'
export default function Nah() {
    const key = Storage.Get("key")
    const id = Storage.Get("id")
    React.useEffect(() => {
        socket.auth = { id: key }
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
        socket.emit("join conversation", id)
        return () => {
            socket.disconnect()
            socket.off("disconnect")
            socket.off("connect")
            socket.off("connect_error")
        }
    })
    return (
        <section className='flex'>
            <Navigate />
            <Outlet />
        </section>
    )
}
