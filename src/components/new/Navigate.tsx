import clsx from 'clsx';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { MdOpenInNew, MdOutlineDarkMode } from 'react-icons/md';
import { PiDotsNineBold, PiGearSixBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import Icon from '../atoms/Icon';
import Contacts from './nav/Contacts';
import Conversations from './nav/Conversations';
import SearchBox from './nav/SearchBox';
import { useLogout } from '../../hooks/useLogout';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import Spinner from '../atoms/Spinner';

export default function Navigate() {
  const [shouldSettingOpen, setSettingOpen] = React.useState<boolean>(false);
  const buttonSettingRef = React.useRef<HTMLButtonElement | null>(null);
  const settingMenuRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();
  const { mutate: deleteuser, isPending: isPendingDeleteUser } = useDeleteUser();
  const handleDeleteUser = (event: React.MouseEvent<HTMLButtonElement, UIEvent>) => {
    event.preventDefault();
    deleteuser();
  };
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    // Storage.Clear();
    // dispatch(clear())
    mutate();
    // navigate("/signin")
  };
  const handleNewConversation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate('new');
  };
  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
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
    <div className="w-[25%] h-full px-2 py-8 gap-6 flex flex-col bg-[#221f34]">
      <div className="flex gap-2 w-full pr-4 items-center justify-center">
        <SearchBox />
        <div className="w-[10%] h-full">
          <button className="btn bg-[#343142] hover:bg-[#343142] m-0 " onClick={handleNewConversation}>
            <Icon className="text-2xl">
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
            className="btn btn-error btn-sm w-full text-white hover:bg-red-500 hover:outline-none hover:border-none disabled:!bg-red-500 disabled:!cursor-not-allowed disabled:text-white"
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
            'absolute  bottom-10  z-10 right-0 p-2 inline-block text-sm font-medium bg-gray-600/40 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 h-auto origin-bottom-right',
            !shouldSettingOpen ? ' opacity-0 scale-0' : 'opacity-100 scale-100  ',
          )}
        >
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-700 text-white focus:outline-none flex items-center gap-2 disabled:"
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
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2"
          >
            <Icon className="text-xl">
              <MdOutlineDarkMode />
            </Icon>
            Change Mode
          </button>
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2"
          >
            <Icon className="text-xl">
              <PiGearSixBold />
            </Icon>
            Settings
          </button>
          <button
            type="button"
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-gray-700 text-white focus:outline-none flex items-center gap-2"
          >
            <Icon className="text-xl">
              <BsPerson />
            </Icon>
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
