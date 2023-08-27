import React from 'react'
import { Storage } from '../service/LocalStorage'
import { useLocation } from 'react-router-dom'
export default function Video() {
    const token = Storage.Get("video-token")
    const [hasToken, sethasToken] = React.useState<boolean>(false)
    const localtion = useLocation()
    const path = localtion.pathname.split("/")
    // React.useEffect(() => {
    //     return () => {
    //         Storage.Del("video-token")
    //     }
    // }, [token])
    React.useEffect(() => {
        if (!token || path[path.length - 1] !== token) {
            sethasToken(false)
        } else {
            sethasToken(true)
        }
    }, [path, token])
    React.useEffect(() => {
        // const peer = new Peer()
        // console.log(peer)
    })
    return (
        <>
            {
                hasToken ?
                    <>
                        <div>{JSON.stringify(token)}</div>
                        <div>Video</div>
                    </> : <div>Error</div>
            }
        </>
    )
}
