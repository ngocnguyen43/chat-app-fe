import clsx from 'clsx';
import { ElementRef, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';

import { isValidUrl } from '../../../utils';
import Icon from '../../atoms/Icon';
import Spinner from '../../atoms/Spinner';
import { useAppSelector } from '../../../hooks';

export default function Profile() {
  const {
    entity: { profile },
  } = useAppSelector((state) => state.information);
  let avatar;
  if (profile) {
    const { avatar: tempAvatar } = profile;
    avatar = tempAvatar;
  }
  const imgRef = useRef<ElementRef<'img'>>(null);
  return (
    <div className="w-full p-10">
      <form className="w-full  flex flex-col gap-20 first-letter:items-center justify-center">
        <div className="w-full relative flex items-center justify-center">
          <img
            src={isValidUrl(avatar) ? avatar : import.meta.env.VITE_BASE_RESOURCE + avatar}
            ref={imgRef}
            className="w-36 h-36 rounded-full border-2 border-gray-100 shadow-xl object-fill"
            alt=""
          />
          <div className="w-36 h-36 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute overflow-hidden flex items-center justify-center">
            <label htmlFor="file" className="cursor-pointer">
              <div className="absolute z-20 flex  bottom-0 right-0 cursor-pointer shadow-lg" title="Edit Avatar">
                <Icon size="40" color="rgb(234 236 237)">
                  <FaCamera />
                </Icon>
              </div>
              <input
                type="file"
                name=""
                title="Edit avatar"
                accept="image/png, image/jpeg"
                id="file"
                className=""
                hidden
                onChange={() => {}}
              />
            </label>
            <div className="w-36 h-36 absolute z-10 bg-gray-200/50 rounded-full flex "></div>
          </div>
        </div>
        <div className="flex flex-col gap-14 w-full">
          <div className="w-full flex gap-8 items-center justify-center">
            <div className="flex items-center justify-start w-32">
              <label htmlFor="email-input" className="font-semibold ">
                Email
              </label>
            </div>
            <div className="w-full relative">
              <input
                type="email"
                id="email-input"
                className={clsx(
                  'w-full font-medium py-2 px-2 bg-transparent absolute -bottom-5 rounded-lg border-[2px]  border-gray-500 focus:outline-none focus:border-[2px] focus:border-white',
                  // errors.oldPassword ? 'border-red-400 focus:outline-none' : 'border-gray-300',
                )}
              />
            </div>
          </div>
          <div className="w-full flex gap-8 items-center justify-center">
            <div className="flex items-center justify-start w-32">
              <label htmlFor="fullname-input" className="font-semibold ">
                Full Name
              </label>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                id="fullname-input"
                className={clsx(
                  'w-full font-medium py-2 px-2 bg-transparent absolute -bottom-5 rounded-lg border-[2px]  border-gray-500 focus:outline-none focus:border-[2px] focus:border-white',
                  // errors.oldPassword ? 'border-red-400 focus:outline-none' : 'border-gray-300',
                )}
              />
            </div>
          </div>
          <div className="w-full flex gap-8 items-center justify-center">
            <div className="flex items-center justify-start w-32">
              <label htmlFor="bio-input" className="font-semibold ">
                Bio
              </label>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                id="bio-input"
                className={clsx(
                  'w-full font-medium py-2 px-2 bg-transparent absolute -bottom-5 rounded-lg border-[2px]  border-gray-500 focus:outline-none focus:border-[2px] focus:border-white',
                  // errors.oldPassword ? 'border-red-400 focus:outline-none' : 'border-gray-300',
                )}
              />
            </div>
          </div>
          <div className=" flex justify-end">
            <button
              className="text-color-base-100 p-1  rounded-xl px-2 w-[100px] flex items-center justify-center bg-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled
              // disabled={!isDirty || !isValid || isSubmitting || isPending}
            >
              {
                //   !isPending ? (
                //   <p className=""> Save</p>
                // ) :
                <div className="w-full">
                  <Spinner size="loading-xs" />
                </div>
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
