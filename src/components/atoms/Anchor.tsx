import clsx from 'clsx';

interface AnchorProps extends React.HTMLProps<HTMLAnchorElement> {
  className: string;
}
const Anchor: React.FC<AnchorProps> = ({ className, children, ...props }) => {
  return (
    <a className={clsx('cursor-pointer', className)} {...props}>
      {children}
    </a>
  );
};
export default Anchor;
