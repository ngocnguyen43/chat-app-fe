import clsx from 'clsx'
import React, { FC } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className: string
    error?: boolean
}
const Input: FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(({ className, error = false, ...props }, ref) => {
    return (
        <input ref={ref} className={clsx(
            "w-[300px] border-solid  border-2 px-6 py-2 text-sm rounded-3xl  focus:outline-[#d0cce4]",
            className,
            error ? "border-red-500" : "border-primary-button-light"
        )}
            {...props} />
    )
})
export default Input