import Conversations from './../components/Conversations';
import Chat from '../components/Chat';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';
import React from 'react';
import { socket } from '../service/socket';

const Test = React.memo(() => {
    // const options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0,
    // };

    // const success = (pos: GeolocationPosition) => {
    //     const crd = pos.coords;

    //     console.log("Your current position is:");
    //     console.log(`Latitude : ${crd.latitude}`);
    //     console.log(`Longitude: ${crd.longitude}`);
    //     console.log(`More or less ${crd.accuracy} meters.`);
    // }

    // function error(err: GeolocationPositionError) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    // navigator.geolocation.getCurrentPosition(success, error, options);
    const [dragging, setDragging] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [conversations, setConversations] = React.useState<unknown[]>([])
    const elementRef = React.useRef<HTMLDivElement>(null);
    const offsetRef = React.useRef({ x: 0, y: 0 });
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        const rect = elementRef.current?.getBoundingClientRect();
        offsetRef.current = {
            x: event.clientX - (rect ? rect.left : 0),
            y: event.clientY - (rect ? rect.top : 0),
        };
    };
    // React.useEffect(() => {
    //     socket.auth = { id: "25de4f3b-dcff-466c-8f2e-b6a09af80198" }
    //     socket.connect()
    //     socket.on("connect", () => {
    //         console.log(`connect ${socket.id}`);
    //     });
    //     socket.on("disconnect", () => {
    //         console.log(`disconnect`);
    //     });
    //     socket.on("connect_error", (err) => {
    //         console.log(err);
    //     });
    //     // const interval = setInterval(() => {
    //     //     console.log("emitted!")
    //     //     socket.emit("message", "hello");
    //     // }, 1000);
    //     return () => {
    //         // clearInterval(interval)
    //         socket.off("connect")
    //         socket.off("disconnect")
    //         socket.off("connect_error")
    //         socket.disconnect()
    //     }
    // }, [])
    React.useEffect(() => {
        const handleMouseMove = (event: globalThis.MouseEvent) => {
            if (!dragging) return;
            setPosition({
                x: event.clientX - offsetRef.current.x,
                y: event.clientY - offsetRef.current.y,
            });
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging])
    return (
        <section className=' w-full h-screen '>
            <div className='flex flex-col w-full h-full drop-shadow-xl'
            // style={{
            // position: 'absolute',
            // left: position.x || elementRef.current?.getBoundingClientRect().left,
            // top: position.y || elementRef.current?.getBoundingClientRect().top,
            // // cursor: dragging ? 'grabbing' : 'grab',
            // }}
            >
                {/* <div
                    // onMouseDown={handleMouseDown}
                    className='rounded-t-2xl flex items-center px-2 gap-2 bg-gradient-to-b from-[#f0f0f0] to-gray-300/50'>
                    <div className='w-4 h-4  bg-red-300 rounded-full drop-shadow-md'></div>
                    <div className='w-4 h-4  bg-yellow-300 rounded-full drop-shadow-md'></div>
                    <div className='w-4 h-4  bg-green-300 rounded-full drop-shadow-md'></div>
                </div> */}
                <div className='flex relative w-full h-full main-windows [&>*:not(:first-child)]:border-l-2  rounded-b-2xl bg-white py-4'>
                    <LeftMenu />
                    <Conversations />
                    <Chat />
                    <RightMenu />
                </div>
            </div>
        </section>
    )
})
export default Test