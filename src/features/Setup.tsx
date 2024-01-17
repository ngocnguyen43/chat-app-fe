import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/atoms/Icon';
import { MdModeEditOutline } from "react-icons/md";
import { useFetchSetupInformation } from '../hooks/useFetchSetupInfomation';
import { useQueryClient } from '@tanstack/react-query';
import { setId } from '../store/socket-id-slide';
import { useAppDispatch } from '../hooks';
import { Storage } from '../service/LocalStorage';
import { useUpdateProviderStatus } from '../hooks/useUpdateProviderStatus';
import { setProvider } from '../store/provider-slice';
import { FaCamera } from "react-icons/fa6";
import clsx from 'clsx';
import { useCreateAvatar } from '../hooks/useCreateAvatar';
export default function Setup() {
    const { data } = useFetchSetupInformation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { mutate } = useUpdateProviderStatus()
    const { mutate: createAvatar } = useCreateAvatar()
    const queryClient = useQueryClient()
    const divRef = React.useRef<React.ElementRef<"div">>(null)
    const imgRef = React.useRef<React.ElementRef<"img">>(null)
    const [file, setFile] = React.useState<{ file: File, url: string, type?: string } | undefined>(undefined)
    const handleOnClickEdit = React.useCallback((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if (divRef.current) {
            divRef.current.focus()
        }
    }, [])
    React.useEffect(() => {
        if (data && data.isLoginBefore) {
            navigate("/me")
        }
    }, [data, navigate])
    React.useEffect(() => {
        if (data && divRef.current) {
            divRef.current.innerText = data.full_name
        }
    }, [data]);
    React.useEffect(() => {
        if (data) {
            dispatch(setId(data.id))
            dispatch(setProvider(data.provider))
            Storage.Set<string>("_k", data.id)
            Storage.Set<string>("_a", data.access_token)
            Storage.Set<string>("_ifl", "1")
        }
    }, [data, dispatch])
    React.useEffect(() => {
        document.title = "First Set Up"
    }, [])

    React.useEffect(() => {
        if (file) {
            return () => {
                URL.revokeObjectURL(file.url)
            }
        }
    }, [file,])
    const handleOnChangeFileUpLoad = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.currentTarget.files && event.currentTarget.files.length === 1) {
            setFile({
                file: event.currentTarget.files[0],
                url: URL.createObjectURL(event.currentTarget.files[0]),
            })
            // const url = URL.createObjectURL(event.currentTarget.files[0])
            // console.log(url)
            // if (imgRef.current) {
            //     imgRef.current.src = url
            // }
        }
    }, [])
    React.useEffect(() => {
        if (file && imgRef.current) {
            imgRef.current.src = file.url
        }
    }, [file])
    const handleOnClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, UIEvent>) => {
        event.preventDefault();
        queryClient.setQueryData(["get-login-success"], (user: typeof data | undefined) => {
            return { ...user, full_name: divRef.current?.innerText, user_name: divRef.current?.innerText }
        })
        // mutate()
        const id = Storage.Get("_k") as string
        if (divRef.current) {

            if (divRef.current?.innerText !== data?.full_name && !file) {
                console.log(1);
            } else if (file && divRef.current?.innerText === data?.full_name) {
                console.log(2);
                createAvatar({
                    id,
                    file: file.file,
                })
                mutate()

            } else if (file && divRef.current?.innerText !== data?.full_name) {
                console.log(3)
            } else {
                console.log(4);
            }
        }
        // console.log(divRef.current?.innerText === data?.full_name)
    }, [data, file, queryClient, createAvatar, mutate])

    return (
        <section className='flex items-center justify-center'>
            {data && !data.isLoginBefore &&

                <form className='w-[400px] h-[500px] bg-white flex flex-col items-center justify-between gap-2 p-8 leading-7 rounded-xl'>
                    <div className='w-full flex-[2] flex items-center justify-center relative overflow-hidden'>
                        <img src={data.picture} ref={imgRef} className='w-36 h-36 rounded-full border-2 border-gray-100 shadow-xl object-fill' alt="" />
                        <div className='w-36 h-36 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute overflow-hidden flex items-center justify-center'>
                            <label htmlFor="file" className='cursor-pointer'>
                                <div className='absolute z-20 flex  bottom-0 right-0 cursor-pointer shadow-lg'>
                                    <Icon size='40' color='rgb(234 236 237)'><FaCamera /></Icon>
                                </div>
                                <input type="file" name="" accept='image/png, image/jpeg' id="file" className='' hidden onChange={handleOnChangeFileUpLoad} />
                            </label>
                            <div className='w-36 h-36 absolute z-10 bg-gray-200/50 rounded-full flex '>
                            </div>
                        </div>
                    </div>
                    <div className='w-full text-gray-500 flex flex-col gap-1 '>
                        <p className='text-2xl font-medium '>Wellcome to LiveChats</p>
                        <div className='flex'>
                            <div contentEditable={true} spellCheck={false} suppressContentEditableWarning ref={divRef}
                                className='text-3xl font-semibold mr-1 focus:outline-none' />
                            <span className='text-3xl font-semibold'>!</span>
                            <span className='flex items-center justify-center cursor-pointer ml-2' onClick={handleOnClickEdit}
                            >
                                <Icon size="25" className=''>
                                    <MdModeEditOutline />
                                </Icon>
                            </span>
                        </div>
                    </div>
                    <div className='mb-10'>
                        <p className='text-base text-gray-400 font-normal'>Chat with your friends, share photo and video files and more ...  </p>
                    </div>
                    <div className='w-full'>
                        <button type={'submit'} className={clsx('py-2 px-6 text-lg rounded-xl  font-bold  text-text-dark w-full hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-button-light cursor-pointer')} onClick={handleOnClick}>
                            <p>Start Chat</p>
                        </button>
                    </div>
                </form>}
        </section>
    )
}
