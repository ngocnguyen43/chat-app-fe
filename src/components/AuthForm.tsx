import React from 'react'
import SignIn from './forms/SignInForm'
import SignUp from './forms/SignUpForm'
import PassKey from './forms/PasskeyForm'
import Options from './forms/OptionsForm'
import Password from './forms/PasswordForm'

interface AuthFormProps {
    mode?: "signin" | "signup" | "password" | "options"
}
const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
    let node: React.ReactNode
    if (mode === "signin") {
        node = <SignIn />
    } else if (mode === "signup") {
        node = <SignUp />
    } else if (mode === "options") {
        node = <Options />
    } else if (mode === "password") {
        node = <Password />
    }
    else {
        node = <PassKey />
    }
    return node
}
export default AuthForm