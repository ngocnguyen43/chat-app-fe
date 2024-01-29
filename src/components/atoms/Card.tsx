import clsx from 'clsx';
import { FC } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}
const Card: FC<CardProps> = ({ className, children }) => {
  return <div className={clsx('rounded-3xl drop-shadow-xl bg-surface-mix-200', className)}>{children}</div>;
};

export default Card;
