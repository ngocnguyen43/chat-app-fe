import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className: string
    error?: boolean
}
const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(({ className, error = false, ...props }, ref) => {
    return (
        <input ref={ref} className={clsx(
            " border-solid  border-2 px-6 py-2 text-sm rounded-3xl  focus:outline-[#d0cce4]",
            className,
            error ? "border-red-500" : "border-primary-button-light"
        )}
            {...props} />
    )
})
export default Input