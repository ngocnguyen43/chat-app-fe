import React from 'react'
import Card from '../Card'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import Anchor from '../Anchor'
import { FieldErrors, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import clsx from 'clsx'
let count = 0;
type SignUpValues = {
    "fullname": string
    email: string
    password: string,
    "rp-password": string
}
const SignUp = () => {
    const id = React.useId()
    const form = useForm<SignUpValues>()
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState
    count++;
    const onSubmit = (data: SignUpValues) => {
        console.log("Submited", data);
    }
    const onError = (data: FieldErrors<SignUpValues>) => {
        console.log("err", data)
    }
    return (
        <>
            <Card className='flex flex-col items-center gap-8 py-12 px-20 max-w-md'>
                <div>
                    <h2 className='text-2xl  font-semibold'>Create Account {count / 2}</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col gap-10' noValidate>
                    <fieldset>
                        <div className='flex-col flex gap-6'>
                            <div className='flex flex-col gap-2 max-h-24'>
                                <Label className='' htmlFor={id + "full-name"}>Full Name</Label>
                                <Input className=''
                                    required type='text'
                                    id={id + "full-name"}
                                    error={!!errors.fullname?.message}
                                    autoComplete='name'
                                    {...register("fullname", {
                                        required: "This field is required",
                                    })} />
                                <p className={clsx('text-xs text-red-500')}>{errors.fullname?.message}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='' htmlFor={id + 'email'}>Email address</Label>
                                <Input className=''
                                    required type='email'
                                    id={id + 'email'}
                                    autoComplete='username'
                                    error={!!errors.email?.message}
                                    {...register("email", {
                                        required: "this field is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9. !#$%&' *+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
                                            message: "Invalid email"
                                        },
                                    })} />
                                <p className='text-xs text-red-500'>{errors.email?.message}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='' htmlFor={id + 'password'}>Password</Label>
                                <Input className='' required type='password' id={id + 'password'} autoComplete='new-password' {...register("password")} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='' htmlFor={id + 'rp-password'}>Repeat Password</Label>
                                <Input className='' required type='password' id={id + 'rp-password'} autoComplete='new-password' {...register("rp-password")} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Button intent={'primary'} size={'medium'} type={'submit'} className='w-full bg-primary-button-light text-text-dark'> Create Account</Button>
                                <h5 className='text-sm'>Already have an account ? <Anchor href='/signin' className='text-primary-button-light'>Sign in</Anchor> </h5>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </Card>
            <DevTool control={control} />
        </>
    )
}
export default SignUp