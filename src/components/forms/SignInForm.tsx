import React from 'react';
import { useForm } from 'react-hook-form';

import { useLoginOptions } from '../../hooks';
import { AuthStageContext, AuthStageState, UserContext } from '../../store/context';
import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Label from '../atoms/Label';
import OAuthButton from '../atoms/OAuthButton';

type SignInValue = {
    email: string
}
export default function SignIn() {
    const { register, handleSubmit, getValues } = useForm<SignInValue>()
    const { setStage } = React.useContext<AuthStageState>(AuthStageContext)
    const { mutate } = useLoginOptions();
    const { setUser } = React.useContext(UserContext)
    const onSubmit = (data: SignInValue) => {
        setStage(1)
        setUser(getValues("email"))
        mutate(getValues("email"))
    }
    return (
        <Card className='flex flex-col gap-8 py-12 px-20 max-w-md'>
            <div>
                <h2 className='text-2xl  font-semibold'>Sign In</h2>
                <h4>to continue to chat</h4>
            </div>
            <div className='w-full flex justify-between'>

                <OAuthButton mode='google' />
                {/* <Button onClick={() => onClick()}>Test</Button> */}
                <OAuthButton mode='github' />
                <OAuthButton mode='facebook' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-8' >
                <div>
                    <h2 className='w-full text-center border-b-2 border-solid border-primary-button-light leading-[0.1em] mt-4 mx-0 mb-2'>
                        <span className='px-4 bg-white'>or</span>
                    </h2>
                </div>
                <div className='flex-col flex gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-sm' htmlFor='email'>Email address</Label>
                        <input className='!rounded-lg !px-2' required type='email' id='email' autoComplete='webauthn username' {...register("email",
                        )}
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button intent={'primary'} size={'medium'} type={'submit'} className='!rounded-lg bg-primary-button-light text-text-dark'>Continue</Button>
                        <h5 className='text-sm'>Don&apos;t have account ? <Anchor href='/signup' className='text-primary-button-light'>Register now</Anchor> </h5>
                    </div>
                </div>
            </form>
        </Card>
    )
}
