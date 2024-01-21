import AuthForm from '../components/AuthForm';
import HomeHOC from './private/HomeHOC';

export default function Signin() {
    return (
        <HomeHOC>
            <section className='flex items-center justify-center'>
                <AuthForm mode='signin' />
            </section>
        </HomeHOC>
    )
}
