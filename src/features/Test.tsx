import React from 'react'
import Conversations from './../components/Conversations';
import Chat from '../components/Chat';
import LeftMenu from '../components/LeftMenu';

export default function Test() {
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

    return (
        <section className='flex items-center justify-center maxw'>
            <div className='flex w-[1200] h-[576px] main-windows [&>*:not(:first-child)]:border-l-2'>
                <LeftMenu />
                <Conversations />
                <Chat />
                <Conversations />
            </div>
        </section>
    )
}
