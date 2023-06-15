import React from 'react'
import Card from '../Card'
import Button from '../Button'
import Input from '../Input';
import Label from '../Label';
export default function Password() {
    const id = React.useId()
    return (
        <Card className='flex flex-col items-center gap-8 py-12 px-12 max-w-md'>
            <div className='flex items-center text-center flex-wrap'>
                <h2 className='text-2xl font-semibold flex items-center justify-center'>Welcome</h2>
            </div>
            <form action="" className='w-full flex flex-col gap-8'>
                <div className='flex-col flex gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-start translate-x-6 text-sm' htmlFor={id + 'password'}>Password</Label>
                        <Input required className='' type='password' placeholder='' id={id + 'password'} />
                    </div>
                    <div className='flex flex-row-reverse justify-between gap-4'>
                        <Button intent={'primary'} size={'small'} type={'submit'} className=' !text-sm bg-primary-button-light text-text-dark'> Continue</Button>
                        <Button intent={'text'} size={'small'} type={'submit'} className='!text-sm bg-primary-button-light text-text-light'> Try other way</Button>
                    </div>
                </div>
            </form>
        </Card>
    )
}
