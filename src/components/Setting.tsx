import clsx from 'clsx';
import { ElementRef, MouseEvent, useCallback, useRef } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setSetting } from '../store';
import Icon from './atoms/Icon';
import SettingContent from './setting/SettingContent';

export default function Setting() {
  const dispacth = useAppDispatch();
  const { type } = useAppSelector((state) => state.setting);
  const divRef = useRef<ElementRef<'div'>>(null);
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
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
          className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-30 !backdrop-blur-sm"
          onClick={handleOnClick}
        >
          <div className="fixed top-0 left-0 w-full h-full hehe z-40"></div>
          <div
            ref={divRef}
            className="w-[60%] h-[70%] bg-surface-mix-300  border-none rounded-2xl flex p-2 z-40 relative "
          >
            <div className="flex-1 flex flex-col font-semibold pr-2 text-color-base-100 gap-5 py-5">
              <label htmlFor="general-btn" className="">
                <button
                  id="general-btn"
                  className={clsx(
                    'w-full h-[40px] items-center flex  rounded-lg px-2',
                    type === 'general' ? 'bg-surface-mix-400 drop-shadow-sm' : '',
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
                    'w-full h-[40px] items-center flex  rounded-lg px-2',
                    type === 'account' ? 'bg-surface-mix-400 drop-shadow-sm' : '',
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
                  className="w-full h-[40px] items-center flex  cursor-not-allowed rounded-lg px-2"
                  disabled
                  title="coming soon"
                >
                  Advance
                </button>
              </label>
              <label htmlFor="profile-btn">
                <button
                  id="profile-btn"
                  className={clsx(
                    'w-full h-[40px] items-center flex  rounded-lg px-2',
                    type === 'delete' ? 'bg-red-400 drop-shadow-sm' : '',
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
            <div className="flex-[4] border-l-2 border-l-color-base-100">
              <SettingContent />
            </div>
            <div className="absolute top-6 right-6 hover:scale-105 transition-transform">
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
