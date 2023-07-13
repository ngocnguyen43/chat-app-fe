import clsx from 'clsx'
import React from 'react'
import googleLogo from "../../assets/google.svg"
import facebookLogo from "../../assets/facebook.svg"
import githubLogo from "../../assets/github.svg"
import { LoginSocialGoogle, IResolveParams, LoginSocialFacebook, LoginSocialGithub, objectType } from "reactjs-social-login"

interface OAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mode: "google" | "github" | "facebook"
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ mode }) => {
    const onResolve = ({ provider, data }: IResolveParams) => {
        console.log(provider)
        console.log(data)
    }
    const onReject = (err: string | objectType) => {
        console.log(err)
    }
    if (mode == "google") {
        return <LoginSocialGoogle onResolve={onResolve} onReject={onReject} access_type='online' client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID} redirect_uri='' scope='openid profile email' typeResponse={"idToken"} isOnlyGetToken={true}>
            <Button className=''>
                <img src={googleLogo} alt="" className='w-6' />
            </Button>
        </LoginSocialGoogle>
    } else if (mode == "facebook") {
        return <LoginSocialFacebook onResolve={onResolve} onReject={onReject} appId='647190444109037' redirect_uri='https://localhost:5173/' fieldsProfile={
            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }>
            <Button className=''>
                <img src={facebookLogo} alt="" className='w-6' />
            </Button>
        </LoginSocialFacebook>
    } else {
        return <LoginSocialGithub onResolve={onResolve} onReject={onReject} client_id='233f209318986dd7ee4c' redirect_uri='' client_secret='f2702b40a1f4f7ca0077cee6ad5f1f0ca5c73293'>
            <Button className=''>
                <img src={githubLogo} alt="" className='w-6' />
            </Button>
        </LoginSocialGithub>
    }

}
const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button className={clsx("p-4 w-20 h-12 flex items-center justify-center bg-transparent border-primary-button-light border-2 border-solid rounded-2xl hover:scale-110 transition ease-in-out duration-200", className)} {...props}>
            {children}
        </button >
    )
}
export default OAuthButton