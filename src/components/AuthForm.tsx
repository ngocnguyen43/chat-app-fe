import React from 'react'
import SignIn from './form/SignInForm'
import SignUp from './form/SignUpForm'
import PassKey from './form/PasskeyForm'
import Options from './form/OptionsForm'
import Password from './form/PasswordForm'

interface AuthFormProps {
    mode?: "signin" | "signup" | "passkey" | "options"
}
const AuthForm: React.FC<AuthFormProps> = ({ mode = "signin" }) => {
    let node: React.ReactNode
    if (mode === "signin") {
        node = <SignIn />
    } else if (mode === "signup") {
        node = <SignUp />
    } else if (mode === "options") {
        node = <Options />
    } else if (mode === "passkey") {
        node = <Password />
    }
    else {
        node = <PassKey />
    }
    return node
}
export default AuthForm