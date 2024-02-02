import clsx from 'clsx';

import { BsPerson } from 'react-icons/bs';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { MdOpenInNew, MdOutlineDarkMode } from 'react-icons/md';
import { PiDotsNineBold, PiGearSixBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { useLogout } from '../../hooks/useLogout';
import { setSetting } from '../../store';
import Icon from '../atoms/Icon';
import Spinner from '../atoms/Spinner';
import Contacts from './nav/Contacts';
import Conversations from './nav/Conversations';
import SearchBox from './nav/SearchBox';
import { useSetTheme } from '../../hooks/useSetTheme';
import { useState, useRef, useEffect, MouseEvent } from 'react';
import { User } from '../User';

export default function Navigate() {
  const [shouldSettingOpen, setSettingOpen] = useState<boolean>(false);
  const buttonSettingRef = useRef<HTMLButtonElement | null>(null);
  const settingMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();
  const { mutate: setTheme } = useSetTheme();
  const { mutate: deleteUser, isPending: isPendingDeleteUser } = useDeleteUser();
  const handleDeleteUser = (event: MouseEvent<HTMLButtonElement, globalThis.UIEvent>) => {
    event.preventDefault();
    deleteUser();
  };
  const dispatch = useAppDispatch();
  const handleLogout = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    mutate();
  };
  const handleNewConversation = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    navigate('new');
  };
  useEffect(() => {
    const handler = (event: globalThis.MouseEvent) => {
      if (
        !(
          settingMenuRef.current?.contains(event.target as HTMLElement) ||
          buttonSettingRef.current?.contains(event.target as HTMLDivElement)
        )
      ) {
        setSettingOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);
  return (
    <div className="w-[25%] h-full px-2 py-8 gap-6 flex flex-col bg-surface-mix-200">
      <User />
      <div className="flex gap-2 w-full pr-4 items-center justify-center">
        <SearchBox />
        <div className="w-[15%] h-full">
          <button
            className="w-full h-full rounded-lg flex items-center justify-center bg-surface-mix-100 hover:bg-surface-mix-300 outline-none border-none m-0 "
            onClick={handleNewConversation}
          >
            <Icon className="text-3xl">
              <MdOpenInNew />
            </Icon>
          </button>
        </div>
      </div>
      <Contacts />
      <div className="flex justify-between items-center px-2">
        <h2 className="font-semibold">Message</h2>
        <Icon className="text-xl">
          <IoChatbubbleOutline />
        </Icon>
      </div>
      <Conversations />
      <div className="w-full flex gap-2 relative ">
        <div className="w-full ">
          <button
            className="btn btn-error btn-sm w-full text-color-base-100 hover:bg-red-500 hover:outline-none hover:border-none disabled:!bg-red-500 disabled:!cursor-not-allowed disabled:text-color-base-100"
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? <Spinner size="loading-sm" /> : <p className="font-semibold">LOG OUT</p>}
          </button>
        </div>
        <button
          ref={buttonSettingRef}
          className="flex items-center"
          onClick={() => {
            setSettingOpen((prev) => !prev);
          }}
        >
          <Icon className="text-3xl">
            <PiDotsNineBold />
          </Icon>
        </button>
        <div
          ref={settingMenuRef}
          className={clsx(
            'absolute  bottom-10  z-10 right-0 p-2 inline-block text-sm font-medium bg-surface-mix-300 border-none rounded-xl dark:text transition-transform  duration-900 ease-in-out  w-44 h-auto origin-bottom-right',
            !shouldSettingOpen ? ' opacity-0 scale-0' : 'opacity-100 scale-100  ',
          )}
        >
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-600 hover:text-white transition-colors hover:text-color-base-100 text-color-base-100 focus:outline-none flex items-center gap-2 disabled:"
            onClick={handleDeleteUser}
            disabled={isPendingDeleteUser}
          >
            {isPendingDeleteUser ? (
              <div className="w-full flex items-center justify-center">
                <Spinner size="loading-sm" />
              </div>
            ) : (
              <>
                <Icon className="text-xl">
                  <IoMdRemoveCircleOutline />
                </Icon>
                <p>Delete Account</p>
              </>
            )}
          </button>
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2"
            onClick={() => {
              const e = document.getElementsByTagName('body');
              if (e.length > 0) {
                const theme = e[0].getAttribute('data-theme');
                if (theme === 'dark') {
                  e[0].setAttribute('data-theme', 'light');
                  setTheme('light');
                } else {
                  e[0].setAttribute('data-theme', 'dark');
                  setTheme('dark');
                }
              }
            }}
          >
            <Icon className="text-xl">
              <MdOutlineDarkMode />
            </Icon>
            Change Mode
          </button>
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setSetting('general'));
              setSettingOpen(false);
            }}
          >
            <Icon className="text-xl">
              <PiGearSixBold />
            </Icon>
            Settings
          </button>
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setSetting('account'));
              setSettingOpen(false);
            }}
          >
            <Icon className="text-xl">
              <BsPerson />
            </Icon>
            Account
          </button>
        </div>
      </div>
    </div>
  );
}
