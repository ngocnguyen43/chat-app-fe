import { IoMdCloseCircle } from 'react-icons/io';
import Icon from './atoms/Icon';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSetting } from '../store';
import clsx from 'clsx';
import SettingContent from './Setting/SettingContent';
import React from 'react';

export default function Setting() {
  const dispacth = useAppDispatch();
  const { type } = useAppSelector((state) => state.setting);
  const divRef = React.useRef<React.ElementRef<'div'>>(null);
  const handleOnClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (divRef.current && !divRef.current.contains(event.target as HTMLElement) && type !== 'none') {
        dispacth(setSetting('none'));
      }
    },
    [dispacth, type],
  );
  return (
    <>
      {type !== 'none' ? (
        <div
          className="backdrop-blur-xl flex items-center justify-center fixed top-0 left-0 w-full h-full z-30"
          onClick={handleOnClick}
        >
          <div
            ref={divRef}
            className="w-[60%] h-[70%] bg-[#1e1b2e] border-[#2a2741] border-2 rounded-2xl flex p-2 z-40 relative"
          >
            <div className="flex-1 flex flex-col font-semibold pr-2 text-white gap-5 py-5">
              <label htmlFor="general-btn" className="">
                <button
                  id="general-btn"
                  className={clsx(
                    'w-full h-[40px] items-center flex  rounded-xl px-2',
                    type === 'general' ? 'bg-purple-500 drop-shadow-lg' : '',
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    dispacth(setSetting('general'));
                  }}
                >
                  General
                </button>
              </label>
              <label htmlFor="sercurity-btn">
                <button
                  id="sercurity-btn"
                  className={clsx(
                    'w-full h-[40px] items-center flex  rounded-xl px-2',
                    type === 'account' ? 'bg-purple-500 drop-shadow-lg' : '',
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    dispacth(setSetting('account'));
                  }}
                >
                  Account
                </button>
              </label>
              <label htmlFor="advance-btn">
                <button
                  id="advance-btn"
                  className="w-full h-[40px] items-center flex  cursor-not-allowed rounded-xl px-2"
                >
                  Advance
                </button>
              </label>
              <label htmlFor="profile-btn">
                <button
                  id="profile-btn"
                  className={clsx(
                    'w-full h-[40px] items-center flex  rounded-xl px-2',
                    type === 'delete' ? 'bg-red-400 drop-shadow-lg' : '',
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    dispacth(setSetting('delete'));
                  }}
                >
                  Delete Account
                </button>
              </label>
            </div>
            <div className="flex-[4] border-l-2 border-l-[#2a2741]">
              <SettingContent />
            </div>
            <div className="absolute top-2 right-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispacth(setSetting('none'));
                }}
              >
                <Icon size="32">
                  <IoMdCloseCircle />
                </Icon>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
