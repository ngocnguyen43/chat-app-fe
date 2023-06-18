import Card from '../atoms/Card'
import OAuthButton from '../atoms/OAuthButton'
import Label from '../atoms/Label'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import { useForm } from 'react-hook-form';
import { AuthStageContext, UserContext } from '../../store/context'
import React from 'react'
import { useNavigate } from 'react-router-dom'
type SignInValue = {
    email: string
}
export default function SignIn() {
    const { register, handleSubmit, getValues } = useForm<SignInValue>()
    const { setStage } = React.useContext(AuthStageContext)
    const { user, setUser } = React.useContext(UserContext)
    const navigate = useNavigate()
    const onSubmit = (data: SignInValue) => {
        console.log("check", data)
        setStage(1)
        setUser(getValues("email"))
        navigate("/password")
    }
    return (
        <Card className='flex flex-col gap-8 py-12 px-20 max-w-md'>
            <div>
                <h2 className='text-2xl  font-semibold'>Sign In</h2>
                <h4>to continue to chat</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-8'>
                <div className='w-full flex justify-between'>
                    <OAuthButton mode='google' />
                    <OAuthButton mode='github' />
                    <OAuthButton mode='facebook' />
                </div>
                <div>
                    <h2 className='w-full text-center border-b-2 border-solid border-primary-button-light leading-[0.1em] mt-4 mx-0 mb-3'>
                        <span className='px-4 bg-white'>or</span>
                    </h2>
                </div>
                <div className='flex-col flex gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label className='' htmlFor='email'>Email address</Label>
                        <Input className='' required type='email' id='email' autoComplete='webauthn username' {...register("email",
                            {
                                value: user ?? ""
                            })}
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button intent={'primary'} size={'medium'} type={'submit'} className='w-full bg-primary-button-light text-text-dark'> Continue </Button>
                        <h5 className='text-sm'>Don't have account ? <Anchor href='/signup' className='text-primary-button-light'>Register now</Anchor> </h5>
                    </div>
                </div>
            </form>
        </Card>
    )
}
