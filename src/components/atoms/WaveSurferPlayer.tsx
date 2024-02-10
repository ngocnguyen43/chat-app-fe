import { FunctionComponent, memo, useRef, useState, useCallback, useEffect } from "react"
import { CiPause1, CiPlay1 } from "react-icons/ci"
// eslint-disable-next-line import/named
import { WaveSurferOptions } from "wavesurfer.js"
import Icon from "./Icon"
import { useWavesurfer } from "../../hooks/useWavesurfer"

interface WaveProps extends PartialBy<WaveSurferOptions, "container"> { }
const WaveSurferPlayer: FunctionComponent<WaveProps> = memo((props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [, setCurrentTime] = useState(0)
    const wavesurfer = useWavesurfer(containerRef, props)

    // On play button click
    const onPlayClick = useCallback(() => {
        (wavesurfer?.isPlaying()) ? wavesurfer.pause() : wavesurfer?.play()
    }, [wavesurfer])

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
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
            <div className='w-[250px] h-auto py-2 border-solid border-surface-mix-300 rounded-2xl overflow-hidden border-2 flex'>
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
})
export default WaveSurferPlayer