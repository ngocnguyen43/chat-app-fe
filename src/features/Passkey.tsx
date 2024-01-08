import AuthForm from '../components/AuthForm';
import HomeHOC from './private/HomeHOC';

export default function Passkey() {
    return (
        <HomeHOC>
            <section className='flex items-center justify-center'>
                <AuthForm />
            </section>
        </HomeHOC>
    )
}
