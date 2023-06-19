import React from 'react'
import { IoDownloadOutline, IoImage, IoDocumentOutline, IoLinkOutline } from "react-icons/io5"
import { RxDotFilled } from "react-icons/rx"
import Icon from './atoms/Icon'
import clsx from 'clsx'
import Anchor from './atoms/Anchor'
import { useAppDispatch, useAppSelector } from '../hooks'
interface SharedFileProps {
    mode?: "images" | "files" | "links" | "other"
    content?: string
}
const SharedFile: React.FC<SharedFileProps> = ({ mode = "images", content }) => {

    return <div className='flex items-center justify-between cursor-pointer hover:bg-blue-50'>
        <div>
            <Icon className={clsx('text-xl ', { "mr-3": mode == "links" })}>
                {mode == "images" && <IoImage />}
                {mode == "files" && <IoDocumentOutline />}
                {mode == "links" && <IoLinkOutline />}
            </Icon>
        </div>
        <div className='flex flex-col text-ellipsis overflow-hidden'>
            {
                mode != "links" ?
                    <span className='text-xs'>abc.png</span>
                    : <span className='text-xs text-ellipsis overflow-hidden underline'>
                        <Anchor target='_blank' className='whitespace-nowrap' href={content}>
                            {content}</Anchor></span>
            }
            {
                mode != "links" &&
                <span className='flex flex-row text-[10px] items-center'>
                    1.1mb
                    <Icon className='text-[10px]'>
                        <RxDotFilled />
                    </Icon>
                    12/12/2022
                </span>
            }
        </div>
        {
            mode != "links" &&
            <span>
                <Icon className='text-lg'>
                    <IoDownloadOutline />
                </Icon>
            </span>
        }
    </div>
}
export default function RightMenu() {
    const [sharedFile, setSharedFile] = React.useState<"images" | "files" | "links" | "other">("images")
    const { isRMenuOpen } = useAppSelector(state => state.rightMenu)
    return (
        <aside className={clsx('flex-col px-2 w-44 transition-all', isRMenuOpen ? "flex" : "hidden")}>
            <div>
                <div className='sticky top-0 w-full bg-white '>
                    <span>Shared</span>
                    <div className='text-[10px] flex gap-2 justify-between w-full mb-2'>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-100": sharedFile == 'images' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile == "images" })} onClick={() => setSharedFile('images')}>Images</span>
                        </div>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-300": sharedFile == 'files' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile == "files" })} onClick={() => setSharedFile('files')}>Files</span>
                        </div>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-300": sharedFile == 'links' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile == "links" })} onClick={() => setSharedFile('links')}>Links</span>
                        </div>
                        <div className={clsx("h-4", { "border-b-blue-300 border-b-2 transition-all ease-in-out duration-300": sharedFile == 'other' })}>
                            <span className={clsx('cursor-pointer', { "text-blue-300": sharedFile == "other" })} onClick={() => setSharedFile('other')}>Other</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='share-files h-full w-40  overflow-y-scroll'>
                <div className={clsx(sharedFile == "images" ? "block" : "hidden")}>
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
                <div className={clsx(sharedFile == "files" ? "block" : "hidden")}>
                    <SharedFile mode='files' />
                    <SharedFile mode='files' />
                    <SharedFile mode='files' />
                    <SharedFile mode='files' />
                </div>
                <div className={clsx(sharedFile == "links" ? "block" : "hidden")}>
                    <SharedFile mode='links' content='https://react-icons.github.io/react-icons/search?q=other' />
                    <SharedFile mode='links' content='https://react-icons.github.io/react-icons/search?q=other' />
                    <SharedFile mode='links' content='https://react-icons.github.io/react-icons/search?q=other' />
                </div>

            </div>

        </aside>
    )
}
