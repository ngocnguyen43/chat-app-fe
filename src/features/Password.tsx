import AuthForm from '../components/AuthForm';
import HomeHOC from './private/HomeHOC';

export default function Password() {
  return (
    <HomeHOC>
      <section className="flex items-center justify-center">
        <AuthForm mode="password" />
      </section>
    </HomeHOC>
  );
}
