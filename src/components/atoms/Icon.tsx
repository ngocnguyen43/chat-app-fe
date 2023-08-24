import React from 'react';
import { IconContext } from 'react-icons';

interface IconProps extends React.PropsWithChildren {
    className?: string
    color?: string
}
const Icon: React.FC<IconProps> = ({ className, children, color }) => {
    return (
        <IconContext.Provider value={{ className: className ?? "", color: color ?? "" }} >
            {
                children
            }
        </IconContext.Provider>
    )
}
export default Icon