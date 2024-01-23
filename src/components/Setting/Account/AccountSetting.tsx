import React from 'react'
import { useWebAuthnRegistrationOptions } from '../../../hooks'

export default function AccountSetting() {
    const { mutate } = useWebAuthnRegistrationOptions()
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        mutate()
    }
    return (
        <div className='w-full '>
            <div className='w-full'>
                <div></div>
                <div className='font-semibold'>
                    Authentication
                    <div>Passkeys
                        <button onClick={handleOnClick}>Test</button>
                    </div>
                    <div>
                        Password
                        <form >

                        </form>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}
