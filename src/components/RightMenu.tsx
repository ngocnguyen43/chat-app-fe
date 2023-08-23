import clsx from 'clsx';
import React from 'react';
import { IoDocumentOutline, IoDownloadOutline, IoImage, IoLinkOutline } from 'react-icons/io5';
import { RxDotFilled } from 'react-icons/rx';

// import { useAppSelector } from '../hooks';
import Anchor from './atoms/Anchor';
import Icon from './atoms/Icon';

interface SharedFileProps {
    mode?: "images" | "files" | "links" | "other"
    content?: string
}
const SharedFile: React.FC<SharedFileProps> = ({ mode = "images", content }) => {

    return <div className='flex items-center justify-between w-full gap-4  cursor-pointer hover:bg-blue-50'>
        <div className="flex gap-4 items-center">

            <div className="text-left">
                <Icon className={clsx('text-4xl ', { "mr-3": mode === "links" })}>
                    {mode === "images" && <IoImage />}
                    {mode === "files" && <IoDocumentOutline />}
                    {mode === "links" && <IoLinkOutline />}
                </Icon>
            </div>
            <div className='flex flex-col text-ellipsis overflow-hidden'>
                {
                    mode !== "links" ?
                        <span className='text-xs'>abc.png</span>
                        : <span className='text-xs text-ellipsis overflow-hidden underline'>
                            <Anchor target='_blank' className='whitespace-nowrap' href={content}>
                                {content}</Anchor></span>
                }
                {
                    mode !== "links" &&
                    <span className='flex flex-row text-[10px] items-center'>
                        1.1mb
                        <Icon className='text-[10px]'>
                            <RxDotFilled />
                        </Icon>
                        12/12/2022
                    </span>
                }
            </div>
        </div>
        {
            mode !== "links" ?
                <span className="flex">
                    <Icon className='text-lg text-right'>
                        <IoDownloadOutline />
                    </Icon>
                </span> : null
        }
    </div>
}
export default function RightMenu() {
    const [sharedFile, setSharedFile] = React.useState<"images" | "files" | "links" | "other">("images")
    return (
        <aside className={clsx('flex-col px-2 w-80 transition-all flex')}>
            <div>
                <div className='sticky top-0 bg-white h-16'>
                    <span>Shared</span>
                    <div className='text-[10px] flex gap-8 mb-2'>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-100": sharedFile === 'images' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile === "images" })} onClick={() => setSharedFile('images')}>Images</span>
                        </div>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-300": sharedFile === 'files' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile === "files" })} onClick={() => setSharedFile('files')}>Files</span>
                        </div>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-300": sharedFile === 'links' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile === "links" })} onClick={() => setSharedFile('links')}>Links</span>
                        </div>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-300": sharedFile === 'other' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile === "other" })} onClick={() => setSharedFile('other')}>Other</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='share-files h-full  overflow-y-scroll'>
                <div className={clsx(sharedFile === "images" ? "block" : "hidden")}>
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                    <SharedFile />
                </div>
                <div className={clsx(sharedFile === "files" ? "block" : "hidden")}>
                    <SharedFile mode='files' />
                    <SharedFile mode='files' />
                    <SharedFile mode='files' />
                    <SharedFile mode='files' />
                </div>
                <div className={clsx(sharedFile === "links" ? "block" : "hidden")}>
                    <SharedFile mode='links' content='https://react-icons.github.io/react-icons/search?q=other' />
                    <SharedFile mode='links' content='https://react-icons.github.io/react-icons/search?q=other' />
                    <SharedFile mode='links' content='https://react-icons.github.io/react-icons/search?q=other' />
                </div>

            </div>

        </aside >
    )
}
