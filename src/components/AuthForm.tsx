import React from 'react'
import SignIn from './form/SignIn'
import SignUp from './form/SignUp'
import PassKey from './form/PassKey'
import Options from './form/Options'
import Password from './form/Password'

interface AuthFormProps {
    mode?: "signin" | "signup" | "passkey" | "options"
}
const AuthForm: React.FC<AuthFormProps> = ({ mode = "signin" }) => {
    return (
        mode === "signin" && <PassKey />
    )
}
export default AuthForm