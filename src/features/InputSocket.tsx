/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';

import Button from '../components/atoms/Button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Storage } from '../service/LocalStorage';
import { setId } from '../store/socket-id-slide';

import type { WaveSurferOptions } from 'wavesurfer.js';
import { validURL } from '../utils';
import { useFetchMetaData } from '../hooks/useFetchMetaData';
import Icon from '../components/atoms/Icon';
import { MdCancel, MdImage } from "react-icons/md"
import { CiPause1, CiPlay1 } from "react-icons/ci"

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };
// AIzaSyDA5wMepypOeIW06ZeZi-G-BNxwnIVNq8A
const AudioRecorder = () => {
    const [permission, setPermission] = React.useState(false);
    const [, setStream] = React.useState<MediaStream | null>(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert((err as Error).message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };
    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission ? (
                        <button type="button">
                            Record
                        </button>
                    ) : null}
                </div>
            </main>
        </div>
    );
};
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
    const [, setCurrentTime] = React.useState(0)
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
            <div className='w-[250px] h-auto border-solid border-gray-500/20 rounded-2xl overflow-hidden border-2 flex'>
                <div className='w-[50px] flex items-center justify-center'>
                    <button
                        onClick={onPlayClick}
                    >
                        <Icon className='text-xl'>
                            {isPlaying ?
                                <CiPause1 />
                                :
                                <CiPlay1 />
                            }
                        </Icon>
                    </button >
                </div>
                <div ref={containerRef} className='w-[150px]' />
            </div>
        </>)
}

interface IPreviewFile {
    url: string
    onClick: (url: string) => void
}
const PreviewFile: React.FunctionComponent<IPreviewFile> = (props) => {
    const { url, onClick } = props
    React.useEffect(() => {
        if (url) {
            return () => {
                URL.revokeObjectURL(url)
            }
        }
    }, [url])
    return (
        <div className='relative w-[50px] h-[50px]'>
            <img src={url} alt="" srcSet="" className='w-full' />
            <div className='absolute top-0 left-0 w-full h-full bg-slate-100/50 z-10'></div>
            <button onClick={() => onClick(url)} className='absolute z-20 -top-2 -right-2 rounded-full'>
                <Icon className='text-gray-200'>
                    <MdCancel />
                </Icon>
            </button>
        </div>
    )
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
    // console.log(data?.images);
    const [files, setFiles] = React.useState<string[]>([])
    const handleOnChangeFileUpLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            if (event.currentTarget.files[0].size > 2200000) {
                alert("file too big")
                event.currentTarget.value = ""
            } else {
                const tmps = event.currentTarget.files
                tmps.length > 0 && Array.from(tmps).forEach(tmp => {
                    const tmpBlob = URL.createObjectURL(tmp)
                    setFiles(prev => [...prev, tmpBlob])
                })
                event.currentTarget.value = ""
            }
        }
    }
    const handleOnclickImage = useCallback((url: string) => {
        setFiles(prev => prev.filter(item => item !== url))
    }, [])
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
            <div>
                <input type="file" id='file' multiple onChange={handleOnChangeFileUpLoad} className='hidden' />
            </div>
            <div>
                <label htmlFor="file">
                    Add file
                </label>
            </div>
            <div>
                <label htmlFor="file">
                    <Icon className='text-gray-600/70'>
                        <MdImage />
                    </Icon>
                </label>
            </div>
            <div className=' flex flex-row gap-4 mt-4'>
                {files.length > 0 && files.map(file => {
                    return (
                        // <div key={file}>
                        //     <img src={file} alt="" />
                        // </div>
                        <PreviewFile url={file} key={file} onClick={handleOnclickImage} />
                    )
                })}
            </div>
            <AudioRecorder />
        </>
    )
}
