import { clsx } from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className: string;
}
const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={clsx('', className)} {...props}>
      {children}
    </label>
  );
};
export default Label;
