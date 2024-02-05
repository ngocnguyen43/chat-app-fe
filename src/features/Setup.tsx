import clsx from 'clsx';

import { FaCamera } from 'react-icons/fa6';
import { MdModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import Icon from '../components/atoms/Icon';
import { useAppDispatch } from '../hooks';
import { useCreateAvatar } from '../hooks/useCreateAvatar';
import { useFetchSetupInformation } from '../hooks/useFetchSetupInfomation';
import { useUpdateAvatarLink } from '../hooks/useUpdateAvatarLink';
import { useUpdateFullName } from '../hooks/useUpdateFullName';
import { useUpdateProviderStatus } from '../hooks/useUpdateProviderStatus';
import { Storage } from '../service/LocalStorage';
import { setProvider } from '../store/provider-slice';
import { setId } from '../store/socket-id-slide';
import { useRef, ElementRef, useState, useCallback, useEffect, ChangeEvent, MouseEvent } from 'react';

export default function Setup() {
  const id = Storage.Get('_k') as string;
  const name = Storage.Get("_n") as string
  const { data } = useFetchSetupInformation(id, name);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useUpdateProviderStatus();
  const { mutate: createAvatar } = useCreateAvatar();
  const { mutate: updateAvatarLink } = useUpdateAvatarLink();
  const { mutate: updateFullNAme } = useUpdateFullName();
  const queryClient = useQueryClient();
  const divRef = useRef<ElementRef<'div'>>(null);
  const imgRef = useRef<ElementRef<'img'>>(null);
  const [file, setFile] = useState<{ file: File; url: string; type?: string } | undefined>(undefined);
  const handleOnClickEdit = useCallback((event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (data && data.isLoginBefore) {
      navigate('/me');
    }
  }, [data, navigate]);
  useEffect(() => {
    if (data && divRef.current) {
      divRef.current.innerText = data.full_name;
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      dispatch(setId(data.id));
      dispatch(setProvider(data.provider));
      Storage.Set<string>('_k', data.id);
      Storage.Set<string>('_a', data.access_token);
      Storage.Set<string>('_ifl', '1');
    }
  }, [data, dispatch]);
  useEffect(() => {
    document.title = 'First Set Up';
  }, []);

  useEffect(() => {
    if (file) {
      return () => {
        URL.revokeObjectURL(file.url);
      };
    }
  }, [file]);
  useEffect(() => {
    if (name && divRef.current) {
      divRef.current.innerText = name
    }
  }, [name])
  const handleOnChangeFileUpLoad = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.files && event.currentTarget.files.length === 1) {
      setFile({
        file: event.currentTarget.files[0],
        url: URL.createObjectURL(event.currentTarget.files[0]),
      });
      // const url = URL.createObjectURL(event.currentTarget.files[0])
      // console.log(url)
      // if (imgRef.current) {
      //     imgRef.current.src = url
      // }
    }
  }, []);
  useEffect(() => {
    if (file && imgRef.current) {
      imgRef.current.src = file.url;
    }
  }, [file]);
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, UIEvent>) => {
      event.preventDefault();
      queryClient.setQueryData(['get-login-success'], (user: typeof data | undefined) => {
        return { ...user, full_name: divRef.current?.innerText, user_name: divRef.current?.innerText };
      });
      // mutate()
      const id = Storage.Get('_k') as string;
      if (divRef.current && data) {
        if (divRef.current.innerText !== data.full_name && !file) {
          console.log(1);
          updateAvatarLink(data.picture);
          updateFullNAme(divRef.current.innerText);
          mutate();
        } else if (file && divRef.current.innerText === data.full_name) {
          console.log(2);
          createAvatar({
            id,
            file: file.file,
          });
          mutate();
        } else if (file && divRef.current.innerText !== data.full_name) {
          console.log(3);
          createAvatar({
            id,
            file: file.file,
          });
          updateFullNAme(divRef.current.innerText);
          mutate();
        } else {
          updateAvatarLink(data.picture);
          mutate();
        }
      }
      navigate('/me');
      // console.log(divRef.current?.innerText === data?.full_name)
    },
    [data, file, queryClient, createAvatar, mutate, updateAvatarLink, updateFullNAme, navigate],
  );

  return (
    <section className="flex items-center justify-center">
      {(data && !data.isLoginBefore || (name && id)) && (
        <form className="w-[400px] h-[500px] bg-white flex flex-col items-center justify-between gap-2 p-8 leading-7 rounded-xl">
          <div className="w-full flex-[2] flex items-center justify-center relative overflow-hidden">
            <img
              src={decodeURIComponent(data ? data.picture : name)}
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
            <div className="flex">
              <div
                contentEditable={true}
                spellCheck={false}
                suppressContentEditableWarning
                ref={divRef}
                className="text-3xl font-semibold mr-1 focus:outline-none"
              />
              <span className="text-3xl font-semibold">!</span>
              <span className="flex items-center justify-center cursor-pointer ml-2" onClick={handleOnClickEdit}>
                <Icon size="25" className="">
                  <MdModeEditOutline />
                </Icon>
              </span>
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
              onClick={handleOnClick}
            >
              <p>Start Chat</p>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
