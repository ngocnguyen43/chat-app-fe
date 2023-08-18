import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import Button from '../components/atoms/Button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Storage } from '../service/LocalStorage';
import { setId } from '../store/socket-id-slide';

import type { WaveSurferOptions } from 'wavesurfer.js';
import { style, validURL } from '../utils';
import { useFetchMetaData } from '../hooks/useFetchMetaData';
const containerStyle = {
    width: '300px',
    height: '400px'
};

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };
// AIzaSyDA5wMepypOeIW06ZeZi-G-BNxwnIVNq8A
interface IMapProps {
    lat: number
    lng: number
}
const MapConponent: React.FunctionComponent<IMapProps> = React.memo((props) => {
    const { lat, lng } = props
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDA5wMepypOeIW06ZeZi-G-BNxwnIVNq8A"
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null)
    const onLoad = React.useCallback((map: google.maps.Map) => {
        console.log(map);
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds({ lat, lng });
        // map.fitBounds(bounds);
        // setMap(map)
    }, [])
    const onUnmount = React.useCallback((map: google.maps.Map) => {
        // setMap(null)
    }, [])
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                zoomControl: false,
                scaleControl: false,
                fullscreenControl: false,
                styles: style
            }}
        >
            <Marker position={{ lat, lng }} />
        </GoogleMap>
    ) : <></>
})
const useWavesurfer = (containerRef: React.RefObject<HTMLDivElement> | undefined, options: PartialBy<WaveSurferOptions, "container">) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    React.useEffect(() => {
        if (!containerRef || !containerRef.current) return

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        })

        setWavesurfer(ws)

        return () => {
            ws.destroy()
        }
    }, [options, containerRef])

    return wavesurfer
}
interface WaveProps extends PartialBy<WaveSurferOptions, "container"> { }
const WaveSurferPlayer: React.FunctionComponent<WaveProps> = (props) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const wavesurfer = useWavesurfer(containerRef, props)

    // On play button click
    const onPlayClick = React.useCallback(() => {
        (wavesurfer?.isPlaying()) ? wavesurfer.pause() : wavesurfer?.play()
    }, [wavesurfer])

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    React.useEffect(() => {
        if (!wavesurfer) return

        setCurrentTime(0)
        setIsPlaying(false)

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    return (
        <>
            <div ref={containerRef} className='w-[200px] h-auto border-solid border-gray-500/20 rounded-2xl overflow-hidden border-2' />
            <button
                onClick={onPlayClick}

                style={{ marginTop: '1em' }}>
                {isPlaying ? 'Pause' : 'Play'}
            </button >

            <p>Seconds played: {currentTime}</p>
        </>)
}

export default function InputSocket() {
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.socketId)
    const navigate = useNavigate()
    const [userId, setUserId] = useState<string>("")
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(setId(userId))
        Storage.Set<string>("key", userId)
        console.log(id)
        navigate("/me")
    }
    // React.useEffect(() => {
    //     if (waverContainer.current) {
    //         WaveSurfer.create({
    //             container: waverContainer.current,
    //             url: "https://www.soundsnap.com/human_voice_mock_you_got_no_game_01"
    //         })
    //     }
    // }, [])
    const videoRef = React.useRef<HTMLVideoElement>(null)
    React.useEffect(() => {
        if (!videoRef || !videoRef.current) {
            return;
        }
        videoRef.current.setAttribute("src", "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-slow.mp4")
    }, [])
    const [currentLocation, setCurrentLocation] = React.useState<{ lat: number, lgn: number }>()
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                setCurrentLocation({ ...currentLocation, lat: data.coords.latitude, lgn: data.coords.longitude })
            })
        }
    }, [])
    const textboxRef = React.useRef<HTMLDivElement>(null)
    const [url, setUrl] = React.useState<string>()
    const { data, refetch } = useFetchMetaData(url ?? "")
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const text = event.currentTarget.innerText
            const validUrl = validURL(text)
            if (validUrl) {
                setUrl(validUrl);
            }
            event.currentTarget.innerText = ""
        }
    }
    React.useEffect(() => {
        if (url) {
            refetch({ queryKey: url }).then(() => { }, () => { })
        }
    }, [refetch, url])
    console.log(data?.images);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="test">id</label>
                <input id="test" type="text" onChange={handleOnChange} />
                <Button>Submit</Button>
            </form>
            <div >
                <WaveSurferPlayer
                    barGap={2}
                    height={60}
                    barWidth={2}
                    cursorWidth={0}
                    waveColor="rgb(128,191,255)"
                    progressColor="rgb(0,77,153)"
                    url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"
                />
            </div>
            <video ref={videoRef} controls width="300px">
                <track default kind="captions" srcLang="en" />
            </video>
            {/* {currentLocation && <MapConponent lat={currentLocation.lat} lng={currentLocation.lgn} />
            } */}

            <div contentEditable ref={textboxRef} className='pl-2 align-middle rounded-md text-xl leading-[1.8] break-all break-words min-h-[40px] w-[300px] border-2 border-solid border-gray-300/20  focus:outline-none' onKeyDown={handleOnKeyDown}></div >

            <div className="max-w-[150px]">
                {(data && data.images.length > 0) ?

                    <a href={data.url} target='_blank' rel="noreferrer">
                        <div className='max-w-[150px] flex flex-col text-ellipsis overflow-hidden rounded-lg border-2 border-solid border-gray-200/30'>
                            <img src={data.images[0]} alt="" srcSet='' className='max-w-full h-auto object-fill' />
                            <span>{data.title}</span>
                            {/* <span className='whitespace-nowrap overflow-hidden text-ellipsis'>{data.description}</span> */}
                        </div>
                    </a>
                    : null}
            </div>
        </>
    )
}
