import { useEffect, useState } from "react"
// eslint-disable-next-line import/named
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js"

export const useWavesurfer = (containerRef: React.RefObject<HTMLDivElement> | undefined, options: PartialBy<WaveSurferOptions, "container">) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
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