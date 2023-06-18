import React, { FC } from 'react'
import { clsx } from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    className: string
}
const Label: FC<LabelProps> = ({ className, children, ...props }) => {
    return (
        <label className={clsx("", className)} {...props}>{children}</label>
    )
}
export default Label