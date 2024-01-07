import clsx from 'clsx';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { useSignup } from '../../hooks/useSignup';

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
    const { mutate } = useSignup()
    const { errors } = formState
    const onSubmit = (data: SignUpValues) => {
        console.log("Submited", data);
        mutate(
            {
                userName: data.fullname,
                email: data.email,
                fullName: data.fullname,
                password: data.password,
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString()
            })
    }
    const onError = (data: FieldErrors<SignUpValues>) => {
        console.log("err", data)
    }
    return (
        <>
            <Card className='flex flex-col items-center gap-8 py-12 px-20 max-w-md'>
                <div>
                    <h2 className='text-2xl  font-semibold'>Create Account </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-10' noValidate>
                    <fieldset>
                        <div className='flex-col flex gap-6'>
                            <div className='flex flex-col gap-2 max-h-24'>
                                <label className='' htmlFor={id + "full-name"}>Full Name</label>
                                <input className=''
                                    required type='text'
                                    id={id + "full-name"}
                                    // error={!!errors.fullname?.message}
                                    autoComplete='name'
                                    {...register("fullname", {
                                        required: "This field is required",
                                    })} />
                                <p className={clsx('text-xs text-red-500')}>{errors.fullname?.message}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor={id + 'email'}>Email address</label>
                                <input className=''
                                    required type='email'
                                    id={id + 'email'}
                                    autoComplete='username'
                                    // error={!!errors.email?.message}
                                    {...register("email", {
                                        required: "this field is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "Invalid email"
                                        },
                                    })} />
                                <p className='text-xs text-red-500'>{errors.email?.message}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor={id + 'password'}>Password</label>
                                <input className='' required type='password' id={id + 'password'} autoComplete='new-password' {...register("password")} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor={id + 'rp-password'}>Repeat Password</label>
                                <input className='' required type='password' id={id + 'rp-password'} autoComplete='new-password' {...register("rp-password")} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Button intent={'primary'} size={'medium'} className='w-full bg-primary-button-light text-text-dark'> Create Account</Button>
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