import React from 'react'
import Card from '../Card'
import Button from '../Button'
import passkeyLogo from "../../assets/passkey.svg"
import lockLogo from "../../assets/lock.svg"
import questionLogo from "../../assets/question.svg"
export default function Options() {
    return (
        <Card className='flex flex-col items-center gap-8 py-12 px-12 max-w-md'>
            <div className='flex items-center text-center flex-col'>
                <h2 className='text-2xl font-semibold flex items-center justify-center'>Welcome</h2>
            </div>
            <div className='flex-col flex gap-6'>
                <h2 className='text-sm font-semibold flex items-center justify-center'>Choose how you want to sign in:</h2>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <Button intent={'text'} size={'small'} type={'submit'} className='w-60 py-2 items-center justify-start px-4 !text-sm bg-primary-button-light text-text-light flex flex-row gap-8'>
                        <img src={passkeyLogo} alt="" className='w-6 basis-[1/7]' />
                        <h2 className='text-sm flex items-center justify-center'>Use your passkey</h2>
                    </Button>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 w-full'>
                    <Button intent={'text'} size={'small'} type={'submit'} className='w-60 py-2 items-center justify-start px-5 !text-sm bg-primary-button-light text-text-light flex flex-row gap-8'>
                        <img src={lockLogo} alt="" className='w-4 basis-[1/8]' />
                        <h2 className='text-sm  flex items-center justify-center'>Enter your password</h2>
                    </Button>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <Button intent={'text'} size={'small'} type={'submit'} className='w-60 py-2 items-center justify-start px-5 !text-sm bg-primary-button-light text-text-light flex flex-row gap-8'>
                        <img src={questionLogo} alt="" className='w-4 basis-[1/8]' />
                        <h2 className='text-sm  flex items-center justify-center'>Get help</h2>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
