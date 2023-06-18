import React from 'react'
import Card from '../atoms/Card'
import Button from '../atoms/Button'
import passkeyLogo from "../../assets/passkey.svg"
import { useNavigate } from 'react-router-dom'
import { AuthStageContext } from '../../store/context'

export default function PasskeyForm() {
    const navigate = useNavigate()
    const { setStage } = React.useContext(AuthStageContext)
    const onOptions = () => {
        setStage(2)
        navigate("/login-options")
    }
    return (
        <Card className='flex flex-col items-center gap-8 py-12 px-12 max-w-md'>
            <div className='flex items-center text-center flex-wrap'>
                <h2 className='text-2xl font-semibold flex items-center justify-center'>Use your passkey to confirm it&#x27;s really you</h2>
            </div>
            <form action="" className='w-full flex flex-col gap-8'>
                <div className='flex-col flex gap-6'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <img src={passkeyLogo} alt="" className='w-40 text-text-light' />
                        <h5 className='text-xs'>Your device will ask for your fingerprint, face, or screen lock</h5>
                    </div>
                    <div className='flex flex-row-reverse justify-between gap-4'>
                        <Button intent={'primary'} size={'small'} type={'submit'} className=' !text-sm bg-primary-button-light text-text-dark'> Continue</Button>
                        <Button onClick={onOptions}
                            intent={'text'} size={'small'} className='!text-sm bg-primary-button-light text-text-light'> Try other way</Button>
                    </div>
                </div>
            </form>
        </Card>
    )
}
