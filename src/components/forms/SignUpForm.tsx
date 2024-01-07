/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { useSignup } from '../../hooks/useSignup';
import { env } from '../../config';

type SignUpValues = {
    "fullname": string
    email: string
    password: string,
    "rp-password": string
}
const SignUp = () => {
    const id = React.useId()
    const spanRef = React.useRef<HTMLSpanElement>(null)
    const form = useForm<SignUpValues>({
        mode: "onBlur"
    })
    const { register, control, handleSubmit, formState, watch } = form
    const { mutate } = useSignup()
    const { errors, isValid, isDirty, isSubmitting } = formState
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
                                    type='text'
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
                                <div className='relative'>
                                    <input className=''
                                        type='email'
                                        id={id + 'email'}
                                        autoComplete='username'
                                        {...register("email", {
                                            required: "this field is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Invalid email"
                                            },
                                            validate: {
                                                validateState: (data) => {
                                                    const regrex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                                                    return regrex.test(data) || "invalid email"
                                                },
                                                validateExist: async (data) => {
                                                    if (spanRef.current) {
                                                        spanRef.current.classList.add("!block")
                                                        const res = await (await fetch(env.BACK_END_URL + `/user/check-exist?user=${data}`)).json() as { message: string } || null
                                                        spanRef.current.classList.remove("!block")
                                                        if (!res) {
                                                            return true
                                                        } else {
                                                            return res.message
                                                        }
                                                    }
                                                }
                                            },
                                        })} />
                                    <span className="loading loading-spinner loading-xs absolute hidden right-2 bottom-3" ref={spanRef}></span>
                                </div>
                                <p className='text-xs text-red-500'>{errors.email?.message}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor={id + 'password'}>Password</label>
                                <input className='' required type='password' id={id + 'password'} autoComplete='new-password' {...register("password")} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor={id + 'rp-password'}>Confirm Password</label>
                                <input className='' required type='password' id={id + 'rp-password'} autoComplete='new-password' {...register("rp-password", {
                                    validate: {
                                        validateMatch: (data) => {
                                            const password = watch("password")
                                            return password === data || "Password and Confirm Password do not match"
                                        }
                                    }
                                })} />
                                <p className='text-xs text-red-500'>{errors['rp-password']?.message}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Button intent={'primary'} size={'medium'} className='w-full bg-primary-button-light text-text-dark' disabled={!isDirty || !isValid || isSubmitting}> Create Account</Button>
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