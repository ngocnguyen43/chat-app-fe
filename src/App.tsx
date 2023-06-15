import { GoogleOAuthProvider, } from "@react-oauth/google"
import AuthForm from './components/AuthForm'

function App() {
  return (
    <GoogleOAuthProvider clientId='81181014053-39d1v2rlne1sfpa24j1cf168mn5nqo5k.apps.googleusercontent.com'>
      <section className='h-screen w-screen flex items-center justify-center'>
        <AuthForm />
      </section>
    </GoogleOAuthProvider>
  )
}

export default App
