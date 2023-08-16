import React from 'react'
import Button from './atoms/Button'
import { BsFillCameraVideoFill, BsTelephoneFill } from 'react-icons/bs'
import Icon from './atoms/Icon'
import { useAppDispatch } from '../hooks'
import { setOpenCallModal } from '../store/open-call-modal'

type CallModalProps = {
    mode: "video" | "call"
}
const CallModal: React.FunctionComponent<CallModalProps> = ({ mode }) => {
    const dispacth = useAppDispatch();
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispacth(setOpenCallModal(true))
    }
    return (
        <>
            <section className='fixed bg-gray-500/80 top-0 left-0 w-full h-screen'>
                <div className='absolute z-10 w-[350px] h-[450px] bg bg-gray-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-md drop-shadow-md justify-center gap-4 '>
                    <div className='w-24 h-24 bg-slate-600 rounded-full drop-shadow-md mb-4'></div>
                    <div className='mb-8 font-semibold text-white' >ABC is calling you</div>
                    <div className='flex gap-14'>
                        <Button className='w-20 h-20 rounded-full bg-green-500 drop-shadow-md' onClick={handleOnClick}>
                            <div className='flex items-center justify-center'>
                                <Icon className='text-white text-3xl'>
                                    {
                                        mode === "video" &&
                                        <BsFillCameraVideoFill />
                                    }
                                    {
                                        mode === "call" && <BsTelephoneFill />
                                    }
                                </Icon>
                            </div>
                        </Button>
                        <Button className='w-20 h-20 rounded-full bg-red-500 drop-shadow-md' onClick={handleOnClick}>
                            <div className='flex items-center justify-center'>
                                <Icon className='text-white text-3xl rotate-[135deg]'>
                                    <BsTelephoneFill />
                                </Icon>
                            </div>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CallModal;