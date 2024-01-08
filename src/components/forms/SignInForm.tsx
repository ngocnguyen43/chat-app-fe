/* eslint-disable @typescript-eslint/no-misused-promises */
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
    const { register, handleSubmit, getValues, formState } = useForm<SignInValue>()
    const { isDirty, isSubmitting, isValid } = formState
    const { setStage } = React.useContext<AuthStageState>(AuthStageContext)
    const { mutate } = useLoginOptions();
    const { setUser } = React.useContext(UserContext)
    const onSubmit = (data: SignInValue) => {
        setStage(1)
        setUser(getValues("email"))
        mutate(getValues("email"))
        console.log(data)
    }
    return (
        <Card className='flex flex-col gap-8 py-12 px-20 w-[26rem]'>
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
                    <div className='flex flex-col gap-2 relative mb-12'>
                        <Label className='text-sm font-normal' htmlFor='email'>Email address</Label>
                        <input className=' w-full rounded-lg px-2 py-2 absolute bg-transparent border-gray-300 border-[1px] -bottom-12 font-medium' required type='email' id='email' autoComplete='username' {...register("email",
                            {
                                required: true,
                            })}
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button intent={'primary'} size={'medium'} type={'submit'} className='!rounded-lg bg-primary-button-light text-text-dark' disabled={!isDirty || !isValid || isSubmitting}>Continue</Button>
                        <h5 className='text-sm font-normal'>Don&apos;t have account ? <Anchor href='/signup' className='text-primary-button-light font-medium'>Register now</Anchor> </h5>
                    </div>
                </div>
            </form>
        </Card>
    )
}
