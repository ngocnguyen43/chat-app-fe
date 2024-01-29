import clsx from 'clsx';
import { FaPhone } from 'react-icons/fa6';

import Icon from '../atoms/Icon';

interface IPhoneICon {
  color: 'green' | 'red';
}
const PhoneIcon: React.FunctionComponent<IPhoneICon> = (props) => {
  const { color } = props;
  return (
    <div className={clsx('text-color-base-100 text-3xl', color === 'red' ? 'rotate-[135deg]' : '')}>
      <Icon className={''}>
        <FaPhone />
      </Icon>
    </div>
  );
};
export default PhoneIcon;
