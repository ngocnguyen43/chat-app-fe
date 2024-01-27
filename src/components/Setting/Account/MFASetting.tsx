import React from 'react'
import { useAppDispatch } from '../../../hooks'
import { setMFASetupOpen } from '../../../store/MFA-setup-slice'

export default function MFASetting() {
    const dispatch = useAppDispatch()
    return (
        <div className='flex flex-col gap-2'>
            <h1>Two-factor authenticator</h1>
            <p className='text-sm font-normal pb-2'>
                Protect your account from unauthorized access by requiring one-time authentication codes to login
            </p>
            <div className='flex justify-end'>
                <button className='text-white p-2 items-center flex  rounded-xl px-2 bg-purple-500' onClick={() => {
                    dispatch(setMFASetupOpen(true))
                }}>Enable 2FA</button>
            </div>
        </div>
    )
}
