import React, { FC } from 'react'
import { useGoogleLogin } from "@react-oauth/google"
import googleLogo from "../assets/google.svg"
import clsx from 'clsx'
interface OAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mode: "google" | "github" | "facebook"
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string
}
const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button className={clsx("p-4 w-16 h-12 flex items-center justify-center bg-transparent border-primary-button-light border-2 border-solid rounded-2xl hover:scale-110 transition ease-in-out duration-200", className)} {...props}>
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
    }

    if (mode === "google") {
        return (
            <Button className='' onClick={handle} {...props} >
                <img src={googleLogo} alt="" className='w-6' />
            </Button>)
    } else if (mode === "facebook") {
        return (
            <Button className='' onClick={handle} {...props} >
                <img src={googleLogo} alt="" className='w-14' />
            </Button>)
    }
    else {
        return <></>
    }
}
export default OAuthButton