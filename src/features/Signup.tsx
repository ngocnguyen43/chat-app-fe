import React from 'react'
import AuthForm from './../components/AuthForm';

export default function Signup() {
    return (
        <section className='flex justify-center items-center'>
            <AuthForm mode='signup' />
        </section>
    )
}
