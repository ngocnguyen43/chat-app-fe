import clsx from 'clsx';
import React from 'react';
import { useQuery } from 'react-query';

import { URLMetadata } from '../../../../hooks/useFetchMetaData';
import { GetImageUrl } from '../../../../hooks/useGetImage';
import { MapConponent } from '../../../MapComponent';

interface IMessageBox extends React.HTMLAttributes<HTMLDivElement> {
    mode: "sender" | "receiver" | "typing"
    content: string
    type: "text" | "image" | "location" | "link" | "video" | "file"
    isRead: boolean
    showAvatar: boolean
    // time: number,
    id: string,
    meta: URLMetadata,
    location: {
        lat: number,
        lgn: number
    }
    url: string
}

export const MessageBox: React.FC<Partial<IMessageBox>> = React.memo(({ content, type, mode = "receiver", showAvatar, id, className, meta, location, url }) => {
    // const timestamp = unixTimestampToDateWithHour(time)
    // console.log({ mode, meta, content, location })
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [s3Url, setS3Url] = React.useState<string>("")
    const { refetch } = useQuery({ queryKey: `query-key-${s3Url}`, queryFn: async () => await GetImageUrl(url ?? ""), enabled: false })
    React.useEffect(() => {
        if (!videoRef || !videoRef.current) {
            return;
        }
        if (type === "video" && url) {
            videoRef.current.setAttribute("src", url)
        }
    }, [type, url])
    console.log("checkkk", url?.startsWith("blob:"))
    React.useEffect(() => {
        if (content !== undefined && url?.startsWith("blob:")) {
            return;
        }
        if (!content && (type === "video" || type === "image" || type === "file")) {
            if (url?.startsWith("blob")) { /* empty */ } else {
                refetch().then((data) => {
                    setS3Url(() => data.data as string)
                }, () => { })
            }
        }
    }, [content, refetch, url])
    return (
        <>
            {type === "link" && content && content.split(" ").length > 1 ? <div className={clsx('flex gap-2 px-2 items-center my-3 relative', { "justify-end ": mode === "receiver", "justify-start": mode === "sender" })}>
                <div className={clsx('bg-blue-100 rounded-md p-2 text-sm max-w-[300px] break-words', { "ml-12": mode === "sender", "mr-12": mode === "receiver" })}>
                    {content}
                </div>
            </div> : null}
            {mode !== "typing" ?
                <div className={clsx('flex gap-2 px-2 items-center my-3 relative', { "justify-end ": mode === "receiver", "justify-start": mode === "sender" })}>
                    {(showAvatar) && <span className='bg-cyan-300 rounded-md w-10 h-10 absolute top-0'>
                    </span>}
                    <div id={id} className={clsx('flex gap-1 bg-blue-100 rounded-md p-2 text-sm max-w-[300px] break-words', { "ml-12": mode === "sender", "mr-12": mode === "receiver" })}>
                        {(type === "text") && content}
                        {type === "image" && <img src={url && url.startsWith("blob:") ? url : s3Url} alt='' className='w-[300px]' />}
                        {type === "link" && meta ? <>
                            <a href={meta.url} target='_blank' rel='noreferrer' className={clsx('flex flex-col gap-2 px-2 items-center my-1 relative', { "justify-end ": mode === "receiver", "justify-start": mode === "sender" })}>
                                <h3 className='underline'>{meta.url}</h3>
                                <div className={clsx('bg-blue-100 rounded-md p-2 text-sm max-w-[200px] break-words flex flex-col items-center justify-center', { "ml-12": mode === "sender", "mr-12": mode === "receiver" })}>{
                                    <>
                                        {
                                            meta && meta.images.length > 0 ? <>
                                                <img src={meta.images[0]} alt="" />
                                                <h3 className='mt-2'>{meta.title}</h3>
                                            </> : null
                                        }
                                    </>
                                }</div>
                            </a>
                        </> : null}
                        {type === "location" && location ? <MapConponent lat={location.lat} lng={location.lgn} /> : null}
                        {type === "video" && <video src={url} controls className="z-10 cursor-pointer"><track default kind="captions" srcLang="en" /></video>}
                    </div>
                </div> :
                <div className='flex gap-2 items-center relative px-2'>
                    <span className='bg-cyan-300 rounded-md w-10 h-10 absolute top-0'></span>
                    <div className={clsx('bg-blue-50 rounded-md p-2 ml-12 h-10 flex items-center gap-1 ', className || "")}>
                        <div className='animate-dot-flashing-linear w-2 h-2 rounded-full bg-gray-500 relative text-gray-500 delay-0'></div>
                        <div className='animate-dot-flashing w-2 h-2 rounded-full bg-gray-200 relative text-gray-500 delay-500'></div>
                        <div className='animate-dot-flashing w-2 h-2 rounded-full bg-gray-400 relative text-gray-500 delay-1000'></div>
                    </div>
                </div >
            }

        </>
    )
})