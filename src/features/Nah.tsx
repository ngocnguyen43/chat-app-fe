import React from 'react'
import Navigate from '../components/new/Navigate'
import Main from '../components/new/Main'
import Aside from '../components/new/Aside'
import { socket } from '../service/socket'
import { Storage } from '../service/LocalStorage'
export default function Nah() {
    const key = Storage.Get("key")

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
            <Main />
            <Aside />
        </section>
    )
}
