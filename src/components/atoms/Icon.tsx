import React from 'react';
import { IconContext } from 'react-icons';

interface IconProps extends React.PropsWithChildren {
  className?: string;
  color?: string;
  size?: string;
}
const Icon: React.FC<IconProps> = ({ className, children, color, size }) => {
  return (
    <IconContext.Provider value={{ className: className ?? '', color: color ?? '', size: size ?? '' }}>
      {children}
    </IconContext.Provider>
  );
};
export default Icon;
