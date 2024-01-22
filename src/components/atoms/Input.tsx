import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
  error?: boolean;
  inputRef?: React.LegacyRef<HTMLInputElement> | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, inputRef, ...props }, _ref) => {
    return (
      <input
        ref={inputRef}
        className={clsx(
          ' border-solid  border-2 px-2 py-2 text-sm rounded-3xl focus:outline-none',
          className,
          error ? 'border-red-500' : 'border-gray-200',
        )}
        {...props}
      />
    );
  },
);
// const Input = React.forwardRef(function Input(
//     props: React.InputHTMLAttributes<HTMLInputElement>,
//     ref: React.ForwardedRef<HTMLDivElement>
// ) {
//     return <MuiInput ref={ref} {...props}  slotProps={{}}/>
// })
export default Input;
