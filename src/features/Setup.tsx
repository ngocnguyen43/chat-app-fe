import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/atoms/Icon';
import { MdModeEditOutline } from "react-icons/md";
import Button from '../components/atoms/Button';
import { useFetchSetupInformation } from '../hooks/useFetchSetupInfomation';
import { useQueryClient } from '@tanstack/react-query';
import { setId } from '../store/socket-id-slide';
import { useAppDispatch } from '../hooks';
import { Storage } from '../service/LocalStorage';
import { useUpdateProviderStatus } from '../hooks/useUpdateProviderStatus';
import { setProvider } from '../store/provider-slice';
export default function Setup() {
    const { data } = useFetchSetupInformation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { mutate } = useUpdateProviderStatus()
    const queryClient = useQueryClient()
    const divRef = React.useRef<React.ElementRef<"div">>(null)
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
            Storage.Set<string>("key", data.id)
            Storage.Set<string>("_a", data.access_token)

        }
    }, [data, dispatch])
    const handleOnClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, UIEvent>) => {
        event.preventDefault();
        queryClient.setQueryData(["get-login-success"], (user: typeof data | undefined) => {
            return { ...user, full_name: divRef.current?.innerText, user_name: divRef.current?.innerText }
        })
        mutate()
        // navigate("/me")
    }, [mutate, queryClient])
    return (
        <section className='flex items-center justify-center'>
            {data && !data.isLoginBefore && <form className='w-[400px] h-[500px] bg-white flex flex-col items-center justify-between gap-2 p-8 leading-7 rounded-xl'>
                <div className='w-full flex-[2] flex items-center justify-center'><img src={data.picture} className='w-36 rounded-full border-2 border-gray-100 shadow-xl' alt="" /></div>
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
                    <Button intent={'primary'} size={'medium'} type={'submit'} className='!rounded-3xl w-full text-xl bg-primary-button-light text-text-dark' onClick={handleOnClick}>Start Chat</Button>
                </div>
            </form>}
        </section>
    )
}
