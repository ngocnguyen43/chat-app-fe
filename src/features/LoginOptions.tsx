import AuthForm from '../components/AuthForm';
import HomeHOC from './private/HomeHOC';

export default function LoginOptions() {
    return (
        <HomeHOC>
            <section className='flex items-center justify-center'>
                <AuthForm mode='options' />
            </section>
        </HomeHOC>
    )
}
