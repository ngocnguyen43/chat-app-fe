import clsx from 'clsx'
import React, { FC } from 'react'
import { useGoogleLogin } from "@react-oauth/google"
import googleLogo from "../assets/google.svg"
import facebookLogo from "../assets/facebook.svg"
import githubLogo from "../assets/github.svg"
interface OAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mode: "google" | "github" | "facebook"
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string
}
const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button className={clsx("p-4 w-20 h-12 flex items-center justify-center bg-transparent border-primary-button-light border-2 border-solid rounded-2xl hover:scale-110 transition ease-in-out duration-200", className)} {...props}>
            {children}
        </button >
    )
}
const OAuthButton: FC<OAuthButtonProps> = ({ mode, ...props }) => {
    const google = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
    });
    const handle = (e: React.MouseEvent) => {
        e.preventDefault()
        mode === "google" && google()
        mode === "facebook" && google()
        mode === "github" && google()
    }
    let childs: React.ReactNode
    if (mode === "google") {
        childs = <img src={googleLogo} alt="" className='w-6' />
    } else if (mode === "facebook") {
        childs = <img src={facebookLogo} alt="" className='w-6' />
    }
    else {
        childs = <img src={githubLogo} alt="" className='w-6' />
    }
    return (
        <Button className='' onClick={handle} {...props} >
            {childs}
        </Button>)
}
export default OAuthButton