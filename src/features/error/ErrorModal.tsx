import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

import Icon from '../../components/atoms/Icon';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Storage } from '../../service/LocalStorage';
import { clearConntacts } from '../../store/contacts-slice';

export default function ErrorModal() {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { hasError } = useAppSelector((state) => state.error);
  const timer = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    Storage.Clear();
    dispatch(clearConntacts());
    setLoading(true);
    timer.current = setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };
  React.useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);
  if (hasError) {
    return (
      <section className="bg-transparent/10 w-full h-screen top-0 flex items-center justify-center absolute">
        <div className="w-[500px] h-[300px]  flex flex-col rounded-2xl overflow-hidden">
          <div className="h-1/2 w-full bg-purple-300 flex items-center justify-center">
            <Icon color="white" size="80">
              <RiErrorWarningLine />
            </Icon>
          </div>
          <div className="h-1/2 w-full bg-white flex justify-around flex-col items-center">
            <div className="flex items-center flex-col">
              <h1 className="font-semibold text-xl">Ooops&#33;</h1>
              <h4 className="font-medium text-lg">Something went wrong. Please login again.</h4>
            </div>
            <button
              className="btn btn-error btn-sm w-1/2 text-color-base-100 hover:bg-red-500 hover:outline-none hover:border-none flex items-center justify-center"
              onClick={handleLogout}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'LOG OUT'}
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
}
