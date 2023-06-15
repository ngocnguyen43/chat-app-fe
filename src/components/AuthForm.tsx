import React from 'react'
import SignIn from './form/SignIn'
import SignUp from './form/SignUp'
import PassKey from './form/Passkey'
import Options from './form/Options'
import Password from './form/Password'

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