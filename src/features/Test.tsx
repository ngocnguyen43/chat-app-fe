import React from 'react'
import Conversations from './../components/Conversations';
import Chat from '../components/Chat';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';

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
    const elementRef = React.useRef<HTMLDivElement>(null);
    const offsetRef = React.useRef({ x: 0, y: 0 });
    const handleMouseDown = (event: React.MouseEvent) => {
        setDragging(true);
        const rect = elementRef.current?.getBoundingClientRect();
        offsetRef.current = {
            x: event.clientX - (rect ? rect.left : 0),
            y: event.clientY - (rect ? rect.top : 0),
        };
    };
    React.useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
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
        <section className='flex  items-center justify-center maxw'>
            <div ref={elementRef} className='flex flex-col max-w-[1250px]  drop-shadow-xl' style={{
                position: 'absolute',
                left: position.x || elementRef.current?.getBoundingClientRect().left,
                top: position.y || elementRef.current?.getBoundingClientRect().top,
                // cursor: dragging ? 'grabbing' : 'grab',
            }}>
                <div
                    onMouseDown={handleMouseDown}
                    className='h-5 bg-gray-200/50 rounded-t-2xl flex items-center px-2 gap-2'>
                    <div className='w-4 h-4  bg-red-300 rounded-full drop-shadow-md'></div>
                    <div className='w-4 h-4  bg-yellow-300 rounded-full drop-shadow-md'></div>
                    <div className='w-4 h-4  bg-green-300 rounded-full drop-shadow-md'></div>
                </div>
                <div className='flex relative w-full h-[576px] main-windows [&>*:not(:first-child)]:border-l-2  rounded-b-2xl bg-white py-4'>
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