import React from 'react'
import { useAppDispatch } from '../../../hooks'
import { setMFASetupOpen } from '../../../store/MFA-setup-slice'
import { useGet2FAQRCode } from '../../../hooks/useGet2FAQRCode'
import Spinner from '../../atoms/Spinner'

export default function MFASetup() {
    const dispatch = useAppDispatch()
    const { data, isFetching } = useGet2FAQRCode()
    return (
        <div className='fixed w-full h-full top-0 left-0 backdrop-blur-sm z-10 flex items-center justify-center'>
            <div className='h-[800px] w-[500px] bg-white rounded-xl'>
                <div className='flex items-center justify-center py-6 border-b-[1px] border-gray-400 text-xl font-bold'>
                    Enable two-factor authentication
                </div>
                <div className='py-8 px-4 border-b-[1px] border-gray-400 flex flex-col gap-4'>
                    <h1 className='font-semibold text-xl'>
                        1. Download an authenticator app
                    </h1>
                    <h4 className='text-base font-medium'>
                        Download and install <p className='!text-blue-500'>Google Authenticator</p>  or <p className='!text-blue-500'>Microsoft Authenticator</p>
                    </h4>
                </div>
                <div className='border-b-[1px] border-gray-400 py-8 px-4 '>
                    <h1 className='font-semibold text-xl'>
                        2. Scan the QR code
                    </h1>
                    <h4 className='text-base font-medium'>
                        Open the authentication app and scan the QR code using your phone camera
                    </h4>
                    <div className='relative'>
                        {
                            data ?
                                <div dangerouslySetInnerHTML={{ __html: data }}>
                                    {/* <img src="https://qrcode-gen.com/images/qrcode-default.png" className='w-52' alt="" srcSet="" /> */}
                                </div> : null
                        }
                        {
                            (isFetching) ? <div className='w-60 top-0 left-0 h-full absolute flex items-center justify-center backdrop-blur-md'>
                                <Spinner size="loading-md" />
                            </div> : null
                        }
                    </div>
                </div>
                <div className='border-b-[1px] border-gray-400 flex flex-col py-6 px-4'>
                    <h1 className='font-semibold text-xl'>
                        3. Complete setup
                    </h1>
                    <h4 className='text-base font-medium'>
                        Enter the 6-digit code
                    </h4>
                    <input type="text" className='w-40' />
                </div>
                <div className='flex items-center justify-end px-4 py-4 gap-4'>
                    <button onClick={() => {
                        dispatch(setMFASetupOpen(false))
                    }}>Cancel</button>
                    <button>Active</button>
                </div>
            </div>
        </div>
    )
}
