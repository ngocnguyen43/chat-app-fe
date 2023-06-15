import React from 'react'
import AuthForm from '../components/AuthForm'

export default function Signin() {
    return (
        <section className='flex items-center justify-center'>
            <AuthForm mode='signin' />
        </section>
    )
}
