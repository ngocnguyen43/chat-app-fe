import clsx from 'clsx'
import React, { FC } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className: string
}
const Input: FC<InputProps> = ({ className, ...props }) => {
    return (
        <input className={clsx(
            "w-[300px] border-solid border-primary-button-light border-2 px-6 py-4 text-sm rounded-3xl  focus:outline-[#d0cce4]",
            className
        )}
            {...props} />
    )
}
export default Input