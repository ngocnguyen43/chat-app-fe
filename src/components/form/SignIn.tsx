import Card from '../Card'
import OAuthButton from '../OAuthButton'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import Anchor from '../Anchor'

export default function SignIn() {
    return (
        <Card className='flex flex-col gap-8 py-12 px-20'>
            <div>
                <h2 className='text-2xl  font-semibold'>Sign In</h2>
                <h4>to continue to chat</h4>
            </div>
            <form action="" className='w-full flex flex-col gap-8'>
                <div className='w-full flex justify-between'>
                    <OAuthButton mode='google' />
                    <OAuthButton mode='google' />
                    <OAuthButton mode='google' />
                </div>
                <div>
                    <h2 className='w-full text-center border-b-2 border-solid border-primary-button-light leading-[0.1em] mt-4 mx-0 mb-3'>
                        <span className='px-4 bg-white'>or</span>
                    </h2>
                </div>
                <div className='flex-col flex gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label className='' htmlFor='email'>Email address</Label>
                        <Input className='' required type='email' id='email' />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button intent={'primary'} size={'medium'} type={'submit'} className='w-full bg-primary-button-light text-text-light'> Continue </Button>
                        <h5 className='text-sm'>Don't have account ? <Anchor className='text-primary-button-light'>Register now</Anchor> </h5>
                    </div>
                </div>
            </form>
        </Card>
    )
}
