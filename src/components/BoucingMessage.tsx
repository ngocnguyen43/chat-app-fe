import clsx from 'clsx';
import { AiOutlineArrowDown } from 'react-icons/ai';

import { IBoucingMesssageBox } from '../@types';
import { useAppSelector } from '../hooks';
import Icon from './atoms/Icon';

const BouncingMessage: React.FunctionComponent<IBoucingMesssageBox> = ({ handleClickBouncing }) => {
  const { isOpen } = useAppSelector((state) => state.bouncing);
  return (
    <>
      <div
        className={clsx(
          'absolute z-20 bottom-24 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-surface-mix-300 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-surface-mix-400',
          isOpen ? 'visible' : 'invisible',
        )}
      >
        <button onClick={handleClickBouncing}>
          <Icon className="text-xl text-color-base-100">
            <AiOutlineArrowDown />
          </Icon>
        </button>
      </div>
    </>
  );
};
export default BouncingMessage;
