import clsx from 'clsx';
import React from 'react';
import { FaImage, FaMicrophone } from 'react-icons/fa';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { TbFileDescription, TbLocationFilled } from 'react-icons/tb';

import fourDots from '../../../assets/fourdots.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setOnlineMocks } from '../../../store/contacts-slice';
import Icon from '../../atoms/Icon';
import { clearSelectedMessages } from '../../../store/selectedMessage-slice';
import { useDeleteMsgs } from '../../../hooks/useDeleteMsgs';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

interface IMessageInput {
    handleOnFocus: (event: React.FocusEvent<HTMLDivElement, Element>) => void
    handleOnBlur: (event: React.FocusEvent<HTMLDivElement, Element>) => void
    handleOnKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
    handleOnChangeFileUpLoad: (event: React.ChangeEvent<HTMLInputElement>) => void
}
type MessageType = {
    messageId: string;
    message: {
        type: 'text' | 'location' | 'image' | 'file' | 'video' | 'link';
        content: string;
    }[];
    sender?: string;
    recipients: string[];
    isDeleted: boolean;
    createdAt: string;
    group: string;
};

type PageType = {
    conversationId: string;
    messages: MessageType[];
    hasNextPage: boolean
};

export type MessageQueryType = {
    pages: PageType[];
    pageParams: string[]
};
const MessageInput: React.FunctionComponent<IMessageInput> = (props) => {
    const { handleOnBlur, handleOnFocus, handleOnChangeFileUpLoad, handleOnKeyDown } = props
    const advanceMessageBoxRef = React.useRef<HTMLDivElement>(null)
    const advanceMessageButtonRef = React.useRef<HTMLDivElement>(null)
    const textboxRef = React.useRef<HTMLDivElement>(null)
    const [shouldShowAdvanceMessage, setShouldShowAdvanceMessage] = React.useState<boolean>(false)
    const dispatch = useAppDispatch();
    const debounce = React.useRef<NodeJS.Timeout | null>(null)
    const [sendIcon, setSendIcon] = React.useState<boolean>(false)
    const { message } = useAppSelector(state => state.selectedMessage)
    const location = useLocation()
    const path = location.pathname.split("/")
    const currentConversation = path.at(-1) as string;

    // const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //     event.preventDefault();
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         const text = event.currentTarget.innerText.trim()
    //         const messageId = v4();
    //         if (text) {
    //             console.log({
    //                 conversationId: currentConversation,
    //                 message: {
    //                     messageId,
    //                     message: [{
    //                         type: 'text',
    //                         content: text,
    //                     }],
    //                     recipients: [],
    //                     sender: userId,
    //                     isDeleted: false,
    //                     createdAt: Date.now().toString(),
    //                     group: getCurrentUnixTimestamp(),
    //                 }
    //             })
    //             // socket.emit("private message", (
    //             //     {
    //             //         id: messageId,
    //             //         conversation: currentConversation,
    //             //         time: Date.now().toString(),
    //             //         message: [
    //             //             {
    //             //                 type: "text",
    //             //                 content: text
    //             //             }
    //             //         ],
    //             //         sender: userId
    //             //     }))
    //         }
    //         event.currentTarget.innerText = ""
    //     }
    // }

    React.useEffect(() => {
        const handler = (event: MouseEvent) => {
            if ((advanceMessageBoxRef.current?.contains(event.target as HTMLElement) || advanceMessageButtonRef.current?.contains(event.target as HTMLElement))) {
                if (debounce.current) {
                    clearTimeout(debounce.current)
                }
                debounce.current = setTimeout(() => {
                    setShouldShowAdvanceMessage(true)
                }, 30)
            }
            else {
                if (debounce.current) {
                    clearTimeout(debounce.current)
                }
                debounce.current = setTimeout(() => {
                    setShouldShowAdvanceMessage(false)
                }, 30)
            }
        }
        document.addEventListener("mousemove", handler)
        return () => {
            document.removeEventListener("mousemove", handler)
        }
    }, [])
    React.useEffect(() => {
        if (textboxRef.current) {
            textboxRef.current.focus()
        }
    }, [])
    React.useEffect(() => {
        const currentValue = textboxRef.current;
        const handler = (event: Event) => {
            if (event.target === currentValue && currentValue?.innerText.trim()) {
                setSendIcon(true)
            }
            else {
                setSendIcon(false)
            }
        }
        if (currentValue) {
            currentValue.addEventListener("input", handler)
            return () => currentValue.removeEventListener("input", handler)
        }
    }, [])
    React.useEffect(() => {
        const currentValue = textboxRef.current;
        const handler = (event: MouseEvent) => {
            if (!currentValue?.contains(event.target as HTMLElement)) {
                setSendIcon(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])
    // React.useEffect(() => {
    //     const handleFocus = (event: FocusEvent) => {
    //         event.preventDefault();
    //         console.log("input focused")
    //     }
    //     const currentTextbox = textboxRef.current
    //     if (currentTextbox) {
    //         currentTextbox.addEventListener("focus", handleFocus);
    //         return () => {
    //             currentTextbox.removeEventListener("focus", handleFocus)
    //         }
    //     }
    // }, [])
    const handleClickMicroPhone = () => {
        dispatch(setOnlineMocks())
    }
    // const location = useLocation()
    // const path = location.pathname.split("/")
    const queryClient = useQueryClient()
    const { mutate: deleteMsgs } = useDeleteMsgs()
    const handleDeleteMsgs = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        // console.log(message)
        queryClient.setQueryData(["get-messages", currentConversation], (data: MessageQueryType | undefined) => {
            if (data) {
                const newData = data.pages.map(entity => {
                    const updatedMessage = entity.messages.map(msg => {
                        const index = message.indexOf(msg.messageId)
                        if (index !== -1) {
                            return {
                                ...msg,
                                isDeleted: true,
                                message: [
                                    {
                                        type: "text",
                                        content: ""
                                    }
                                ]
                            }
                        } else {
                            return msg
                        }
                    })
                    return {
                        ...entity,
                        messages: updatedMessage
                    }

                })
                return {
                    ...data,
                    pages: newData
                }

            }
        })
        dispatch(clearSelectedMessages())
        deleteMsgs(message)
    }

    return (
        <>
            <div className=' flex w-full items-center z-10 justify-center bg-inherit mt-4 absolute bottom-6'>
                <div className={clsx('h-full flex items-end justify-center gap-2 relative transition-all duration-500', message.length > 0 ? "w-[30%]" : "w-[60%]")}>
                    <div ref={advanceMessageButtonRef} className={clsx('btn-primary w-10 h-10 rounded-lg focus:outline-none flex items-center justify-center relative transition-all', message.length > 0 ? "hidden" : "block")}>
                        <div className='cursor-pointer'  >
                            <img src={fourDots} alt="" className='w-10' />
                        </div>
                        <div ref={advanceMessageBoxRef} className={clsx('absolute bottom-12 left-0 z-10 p-2 inline-block text-sm font-medium bg-gray-600/80 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 origin-bottom-left', !shouldShowAdvanceMessage ? " opacity-0 scale-0" : "opacity-100 scale-100  ")}>
                            <button type="button" className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2" onClick={() => {
                                setShouldShowAdvanceMessage(false);
                                // setShouldShowFileMessage(true)
                            }}>
                                <label htmlFor="file" className=' flex items-center gap-2'>
                                    <Icon className='text-xl'>
                                        <TbFileDescription />
                                    </Icon>
                                    <span>
                                        File
                                    </span>
                                </label>
                            </button>
                            <button type="button" className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none" onClick={() => {
                                setShouldShowAdvanceMessage(false)
                            }}>
                                <label htmlFor="media" className=' flex items-center gap-2'>
                                    <Icon className='text-xl'>
                                        <FaImage />
                                    </Icon>
                                    <span>
                                        Image or Video
                                    </span>
                                </label>
                            </button>
                            <button type="button" className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2 ">
                                <Icon className='text-xl'>
                                    <TbLocationFilled />
                                </Icon>
                                <span>
                                    Location
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col bg-[#343142] min-h-[40px] w-[90%] border-2  border-none rounded-lg items-center' >
                        {/* <form onSubmit={hanldeSubmit}> */}
                        {/* <Input className='absolute !rounded-xl  !px-2 !text-xl w-full pr-4 break-all break-words'
                onChange={(event) => setMessage(event.target.value)} value={message}
                onBlur={handleOnBlur} onFocus={handleOnFocus}
            /> */}
                        {/* {files.length > 0 && <div className='w-full py-2 bg-[#343142] flex gap-2 rounded-t-lg  items-center px-4'>
            {files.map(data => {
                return (
                    <PreviewFile url={data.url} type={data.type} file={data.file} key={data.url} onClick={handleOnclickImage} />
                )
            })}
        </div>} */}

                        <div ref={textboxRef} contentEditable={message.length === 0} suppressContentEditableWarning={true} className={clsx(' align-middle rounded-md text-xl leading-[1.2] break-all break-words min-h-[40px] max-h-[160px]   w-full focus:outline-none ', message.length > 0 ? "flex items-center justify-center " : "px-4 py-2 overflow-y-auto ")} onKeyDown={handleOnKeyDown} onBlur={(event) => {
                            handleOnBlur(event);
                        }} onFocus={(event) => {
                            handleOnFocus(event);
                        }} >
                            {
                                message.length > 0 && <>
                                    <button className={clsx(' btn btn-error w-full text-white hover:bg-red-500')} onClick={handleDeleteMsgs}>unsend {message.length} {message.length > 1 ? "messages" : "message"}</button>
                                </>
                            }
                        </div>
                        <input className='hidden' type='file' accept='application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf' multiple id='file' onChange={handleOnChangeFileUpLoad} />
                        <input className='hidden' type='file' accept='image/*,video/*' multiple id='media' onChange={handleOnChangeFileUpLoad} />
                    </div>
                    <button className={clsx('btn-primary w-10 h-10 rounded-lg focus:outline-none flex items-center justify-center relative transition-all', message.length > 0 ? "hidden " : "block")} onClick={handleClickMicroPhone}>
                        <Icon className={clsx('absolute text-2xl transition-all duration-500 ', !sendIcon ? "visible opacity-100 " : "invisible opacity-0")}>
                            <FaMicrophone />
                        </Icon>
                        <Icon className={clsx('text-2xl transition-all duration-500 ', sendIcon ? "visible opacity-100 " : "invisible opacity-0")}>
                            <RiSendPlane2Fill />
                        </Icon>
                    </button>
                    {/* {isBoucing && <div className='absolute z-20 bottom-20 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-blue-500 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-blue-400'>
                <button onClick={handleClickBoucing}>
                    <Icon className='text-xl text-white'>
                        <AiOutlineArrowDown />
                    </Icon>
                </button>
            </div>} */}
                </div>
            </div>

        </>
    )
}

export default MessageInput