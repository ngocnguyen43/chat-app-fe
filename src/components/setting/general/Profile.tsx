/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import { ChangeEvent, ElementRef, useCallback, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import { isValidUrl } from '../../../utils';
import Icon from '../../atoms/Icon';
import Spinner from '../../atoms/Spinner';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useCreateAvatar } from '../../../hooks/useCreateAvatar';
import { fetchInfomationThunk } from '../../../store/information-slice';
import { useUpdateProfile } from '../../../hooks/useUpdateProfile';

type ProfileValues = {
  fullname: string;
  email: string;
  bio: string;
};
export default function Profile() {
  const {
    entity: { fullName, profile, email, userId },
  } = useAppSelector((state) => state.information);
  let avatar = "";
  if (profile) {
    const { avatar: tempAvatar } = profile;
    avatar = tempAvatar;
  }
  const dispatch = useAppDispatch()
  const imgRef = useRef<ElementRef<'img'>>(null);
  const form = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      email,
      fullname: fullName
    }
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isValid, isSubmitting, isDirty } = formState;

  const { mutate: createAvatar, isPending } = useCreateAvatar()
  const { mutate: updateProfile } = useUpdateProfile()
  const [file, setFile] = useState<{ file: File; url: string; type?: string } | undefined>(undefined);
  const handleOnChangeFileUpLoad = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.files && event.currentTarget.files.length === 1) {
      const tempUrl = URL.createObjectURL(event.currentTarget.files[0])
      setFile({
        file: event.currentTarget.files[0],
        url: tempUrl
      });
      if (imgRef.current) {
        imgRef.current.src = tempUrl
      }
    }
  }, []);

  const onClick = (data: ProfileValues) => {
    let shouldReFetch = false
    if (file) {
      createAvatar({ file: file.file, id: userId }, {
        onSuccess: () => {
          dispatch(fetchInfomationThunk(userId))
          shouldReFetch = true
        }
      })
    }
    if (isDirty) {
      updateProfile({
        email: data.email,
        fullName: data.fullname,
        bio: data.bio
      }, {
        onSuccess: () => {
          // no
          if (!shouldReFetch) {
            dispatch(fetchInfomationThunk(userId))
          }
        }
      })
    }
  }
  return (
    <div className="w-full p-10">
      <form className="w-full  flex flex-col gap-20 first-letter:items-center justify-center" onSubmit={handleSubmit(onClick)}>
        <div className="w-full relative flex items-center justify-center">
          <img
            src={isValidUrl(decodeURIComponent(avatar)) ? decodeURIComponent(avatar) : import.meta.env.VITE_BASE_RESOURCE + avatar}
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
                onChange={handleOnChangeFileUpLoad}
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
                  'w-full font-medium py-2 px-2 bg-transparent absolute -bottom-5 rounded-lg border-[2px]  focus:outline-none focus:border-[2px] focus:border-white',
                  errors.email ? 'border-red-400 focus:outline-none' : 'border-gray-500',
                )}
                // defaultValue={email}
                {...register('email', {
                  required: 'This field is required',
                })}
              />
              <p className={clsx('text-xs text-red-500 absolute -bottom-10')}>{errors.email?.message}</p>
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
                  'w-full font-medium py-2 px-2 bg-transparent absolute -bottom-5 rounded-lg border-[2px]  focus:outline-none focus:border-[2px] focus:border-white',
                  errors.fullname ? 'border-red-400 focus:outline-none' : 'border-gray-500',
                )}
                // defaultValue={fullName}
                {...register('fullname', {
                  required: 'This field is required',
                })}
              />
              <p className={clsx('text-xs text-red-500 absolute -bottom-10')}>{errors.fullname?.message}</p>

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
              className={clsx('py-2 px-6 text-lg rounded-xl  font-bold   text-text-dark w-[100px] ',
                !isDirty || !isValid || isSubmitting || isPending
                  ? 'bg-surface-mix-400 cursor-not-allowed'
                  : 'hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-200 cursor-pointer')}
              disabled={!isValid || isSubmitting || isPending}
            >
              {
                !isPending ? (
                  <p className="font-medium"> Save</p>
                )
                  :
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
