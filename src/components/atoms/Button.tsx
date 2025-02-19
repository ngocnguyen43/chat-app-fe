import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

const buttonClasses = cva(
  ['rounded-3xl', 'font-bold', 'hover:scale-105', 'active:scale-100', 'transition', 'duration-200', 'ease-in-out'],
  {
    variants: {
      intent: {
        primary: [
          // "bg-violet-500",
          // "text-color-base-100",
          // "border-transparent",
          // "hover:bg-violet-600",
          // "hover:font-medium"
        ],
        secondary: [
          // "bg-white",
          // "text-black",
          // "border-gray-400",
          // "hover:bg-gray-100",
          // "border-solid",
          // "border-2",
          // "border-gray-800",
        ],
        text: ['bg-transparent', 'text-text-light', 'hover:bg-gray-100'],
      },
      size: {
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

const Button: FC<ButtonProps> = ({ children, intent, size, className, ...props }) => {
  return (
    <button
      className={
        !props.disabled
          ? buttonClasses({ intent, size, className })
          : 'cursor-not-allowed bg-gray-100 py-2 px-6 text-lg font-bold rounded-lg'
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
