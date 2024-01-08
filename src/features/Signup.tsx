import AuthForm from '../components/AuthForm';
import HomeHOC from './private/HomeHOC';

export default function Signup() {
    return (
        <HomeHOC>
            <section className='flex justify-center items-center'>
                <AuthForm mode='signup' />
            </section>
        </HomeHOC>
    )
}
