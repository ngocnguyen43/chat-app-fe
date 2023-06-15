import React from 'react'
import Card from '../Card'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import Anchor from '../Anchor'

const SignUp = () => {
    const id = React.useId()
    return (
        <Card className='flex flex-col items-center gap-8 py-12 px-20 max-w-md'>
            <div>
                <h2 className='text-2xl  font-semibold'>Create Account</h2>
            </div>
            <form action="" className='w-full flex flex-col gap-8'>
                <div className='flex-col flex gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label className='' htmlFor={id + "full-name"}>Full Name</Label>
                        <Input className='' required type='text' id={id + "full-name"} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='' htmlFor={id + 'email'}>Email address</Label>
                        <Input className='' required type='email' id={id + 'email'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='' htmlFor={id + 'password'}>Password</Label>
                        <Input className='' required type='password' id={id + 'password'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='' htmlFor={id + 'rp-password'}>Repeat Password</Label>
                        <Input className='' required type='password' id={id + 'rp-password'} />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button intent={'primary'} size={'medium'} type={'submit'} className='w-full bg-primary-button-light text-text-dark'> Create Account</Button>
                        <h5 className='text-sm'>Already have an account ? <Anchor href='/signin' className='text-primary-button-light'>Sign in</Anchor> </h5>
                    </div>
                </div>
            </form>
        </Card>
    )
}
export default SignUp