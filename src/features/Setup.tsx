/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import { ChangeEvent, ElementRef, useCallback, useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa6';
import { MdModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Icon from '../components/atoms/Icon';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchInfomationThunk } from '../store/information-slice';
import { useCreateAvatar } from '../hooks/useCreateAvatar';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { delay } from '../utils';

type ProfileValues = {
  fullName: string;
};
export default function Setup() {
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);
  const {
    entity: {
      fullName,
      profile: { avatar },
      userId,
    },
  } = useAppSelector((state) => state.information);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate: updateProfile } = useUpdateProfile();

  const imgRef = useRef<ElementRef<'img'>>(null);
  const [file, setFile] = useState<{ file: File; url: string; type?: string } | undefined>(undefined);
  const form = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      fullName,
    },
  });

  const { register, handleSubmit, formState } = form;
  const { mutate: createAvatar } = useCreateAvatar();

  const { isDirty } = formState;
  console.log(isDirty);

  useEffect(() => {
    if (!id) {
      dispatch(fetchInfomationThunk(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    document.title = 'First Set Up';
  }, []);

  const handleOnChangeFileUpLoad = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.files && event.currentTarget.files.length === 1) {
      const tempUrl = URL.createObjectURL(event.currentTarget.files[0]);
      setFile({
        file: event.currentTarget.files[0],
        url: tempUrl,
      });
      if (imgRef.current) {
        imgRef.current.src = tempUrl;
      }
    }
  }, []);
  useEffect(() => {
    if (file && imgRef.current) {
      imgRef.current.src = file.url;
    }
  }, [file]);
  const OnClick = async (data: ProfileValues) => {
    if (file) {
      createAvatar({ file: file.file, id: userId });
    }
    if (isDirty) {
      updateProfile(
        {
          fullName: data.fullName,
        },
        {
          onSuccess: async () => {
            await delay(1000)
            dispatch(fetchInfomationThunk(userId)).then(() => {
              navigate('/me');
            });
          },
        },
      );
    } else {
      await delay(1000)
      dispatch(fetchInfomationThunk(userId)).then(() => {
        navigate('/me');
      });
    }
  };

  return (
    <section className="flex items-center justify-center">
      {id && (
        <form
          className="min-w-[400px] h-[500px] bg-white flex flex-col items-center justify-between gap-2 p-8 leading-7 rounded-xl"
          onSubmit={handleSubmit(OnClick)}
        >
          <div className="w-full flex-[2] flex items-center justify-center relative overflow-hidden">
            <img
              src={decodeURIComponent(avatar)}
              ref={imgRef}
              className="w-36 h-36 rounded-full border-2 border-gray-100 shadow-xl object-fill"
              alt=""
            />
            <div className="w-36 h-36 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute overflow-hidden flex items-center justify-center">
              <label htmlFor="file" className="cursor-pointer">
                <div className="absolute z-20 flex  bottom-0 right-0 cursor-pointer shadow-lg">
                  <Icon size="40" color="rgb(234 236 237)">
                    <FaCamera />
                  </Icon>
                </div>
                <input
                  type="file"
                  name=""
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
          <div className="w-full text-gray-500 flex flex-col gap-1 ">
            <p className="text-2xl font-medium ">Wellcome to LiveChats</p>
            <div className="flex w-full">
              <input
                // contentEditable={true}
                spellCheck={false}
                type="text"
                {...register('fullName')}
                id="input-fullName"
                className="text-3xl font-semibold mr-1 focus:outline-none text-wrap w-full"
              />
              <span className="text-3xl font-semibold">!</span>
              <label htmlFor="input-fullName" className='flex items-center justify-center'>
                <span className="flex items-center justify-center cursor-pointer ml-2">
                  <Icon size="25" className="">
                    <MdModeEditOutline />
                  </Icon>
                </span>
              </label>
            </div>
          </div>
          <div className="mb-10">
            <p className="text-base text-gray-400 font-normal">
              Chat with your friends, share photo and video files and more ...{' '}
            </p>
          </div>
          <div className="w-full">
            <button
              type={'submit'}
              className={clsx(
                'py-2 px-6 text-lg rounded-xl  font-bold  text-text-dark w-full hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-button-light cursor-pointer',
              )}
            >
              <p>Start Chat</p>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
