/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import { memo, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import { BsCameraVideo, BsPersonAdd, BsTelephone } from 'react-icons/bs';
import { CgUnblock } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { FaRegTrashCan } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { PiGearSixBold } from 'react-icons/pi';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useBlockUser } from '../../../hooks/useBlockUser';
import { useConfirm } from '../../../hooks/useConfirm';
import { useDeleteCovnersation } from '../../../hooks/useDeleteConversation';
import { Storage } from '../../../service/LocalStorage';
import { socket } from '../../../service/socket';
import { updateCurrentConversationState } from '../../../store';
import { setCallBoxOpen, setRoom } from '../../../store/open-call-slice';
import { generateRandomString } from '../../../utils';
import Icon from '../../atoms/Icon';

const ConversationUtils = () => {
  const settingButtonRef = useRef<HTMLDivElement | null>(null);
  const settingMenuRef = useRef<HTMLDivElement | null>(null);
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [shouldShowSettingMenu, setShouldShowSettingMenu] = useState<boolean>(false);
  const {
    entity: { userId: user },
  } = useAppSelector((state) => state.information);
  const dispacth = useAppDispatch();
  const { mutate: deleteConversation } = useDeleteCovnersation();
  const { id, state, participants, isGroup } = useAppSelector((state) => state.currentConversation);
  const confirm = useConfirm();
  const { mutate: blockUser } = useBlockUser();
  const { entities: contacts } = useAppSelector((state) => state.contacts);
  const handleOnClickVideoCamera = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    socket.emit('video chat open', { id, userCreate: user });
    const randomToken = generateRandomString(92);
    // dispatch(setVideoToken(randomToken))
    Storage.Set('video-token', randomToken);
    const popup = window.open(`/video/${randomToken}`, '_blank', 'popup=1');
    if (popup) {
      popup.onbeforeunload = function () {
        Storage.Del('video-token');
      };
    }
  };
  const handleDeleteConversation = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    const choice = await confirm({
      buttonLabel: 'Delete',
      description: 'Are you sure you want to delete this conversation?',
      isOpen: true,
    });
    if (choice) {
      deleteConversation();
    }
  };
  const handleBlockUser = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      const choice = await confirm({
        buttonLabel: 'Block',
        description: 'Are you sure you want to block this person?',
        isOpen: true,
      });
      if (choice) {
        blockUser(
          {
            blocker: user,
            user: participants.find((i) => i.id !== user)!.id,
            type: 'block',
          },
          {
            onSuccess: () => {
              dispacth(updateCurrentConversationState({ conversation: id, isBlocked: true, type: 'blocker' }));
              // dispacth(updateContactState({ id, isBlocked: true, type: 'blocker' }))
            },
          },
        );
      }
    },
    [blockUser, confirm, dispacth, id, participants, user],
  );
  const handleUnBlockUser = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    const choice = await confirm({
      buttonLabel: 'Unblock',
      description: 'Are you sure you want to unblock this person?',
      isOpen: true,
    });
    if (choice) {
      blockUser(
        {
          blocker: user,
          user: participants.find((i) => i.id !== user)!.id,
          type: 'unblock',
        },
        {
          onSuccess: () => {
            dispacth(updateCurrentConversationState({ conversation: id, isBlocked: false, type: 'blocker' }));
            // dispacth(updateContactState({ id, isBlocked: false, type: 'blocker' }))
          },
        },
      );
    }
  };
  useEffect(() => {
    socket.on('video chat open', (args: { room: string; userCreated: string }) => {
      console.log(args);
      if (args.room && args.userCreated) {
        dispacth(setCallBoxOpen(true));
        dispacth(setRoom(args.room));
      }
    });
    return () => {
      socket.off('video chat open');
    };
  });
  useEffect(() => {
    const handler = (event: globalThis.MouseEvent) => {
      if (
        settingButtonRef.current?.contains(event.target as HTMLElement) ||
        settingMenuRef.current?.contains(event.target as HTMLElement)
      ) {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
        debounce.current = setTimeout(() => {
          setShouldShowSettingMenu(true);
        }, 30);
      } else {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
        debounce.current = setTimeout(() => {
          setShouldShowSettingMenu(false);
        }, 30);
      }
    };
    document.addEventListener('mousemove', handler);
    return () => {
      document.removeEventListener('mousemove', handler);
    };
  });

  return (
    <div className="flex gap-6 items-center ">
      {contacts.find((contact) => contact.conversationId === id) && !(state && state.isBlocked) ? (
        <>
          <button onClick={handleOnClickVideoCamera}>
            <Icon className="text-2xl">
              <BsCameraVideo />
            </Icon>
          </button>
          <Icon className="text-2xl">
            <BsTelephone />
          </Icon>
          <Icon className="text-2xl">
            <CiSearch />
          </Icon>
        </>
      ) : null}
      <div ref={settingButtonRef} className="relative">
        <Icon className="text-2xl cursor-pointer">
          <HiDotsHorizontal />
        </Icon>
        <div
          ref={settingMenuRef}
          className={clsx(
            'absolute h-auto z-10 top-10 right-0 p-2 inline-block text-sm font-medium bg-surface-mix-300 border-none rounded-xl dark:text transition-all  duration-900 ease-in-out  w-44 origin-top-right',
            !shouldShowSettingMenu ? ' opacity-0 scale-0' : 'opacity-100 scale-100  ',
          )}
        >
          {isGroup && (
            <>
              <button
                type="button"
                className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2"
              >
                <Icon className="text-xl">
                  <PiGearSixBold />
                </Icon>
                Group Setting
              </button>
              <button
                type="button"
                className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2"
              >
                <Icon className="text-xl">
                  <BsPersonAdd />
                </Icon>
                Add User
              </button>
              <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2">
                <Icon className="text-xl">
                  <AiOutlineUsergroupDelete />
                </Icon>
                Group Users
              </button>
            </>
          )}
          {!isGroup &&
            (state && state.isBlocked ? (
              state.type === 'blocker' && (
                <button
                  className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 hover:text-white text-color-base-100 focus:outline-none flex items-center gap-2"
                  onClick={handleUnBlockUser}
                >
                  <Icon className="text-xl">
                    <CgUnblock />
                  </Icon>
                  Unblock User
                </button>
              )
            ) : (
              <button
                className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-600 hover:text-white text-color-base-100 focus:outline-none flex items-center gap-2"
                onClick={handleBlockUser}
              >
                <Icon className="text-xl">
                  <BiBlock />
                </Icon>
                Block User
              </button>
            ))}
          <button
            className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-600 hover:text-white text-color-base-100 focus:outline-none flex items-center gap-2"
            onClick={handleDeleteConversation}
          >
            <Icon className="text-xl">
              <FaRegTrashCan />
            </Icon>
            Delete Chat
          </button>
          {isGroup && (
            <button className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-red-600 hover:text-white text-color-base-100 focus:outline-none flex items-center gap-2">
              <Icon className="text-xl">
                <IoLogOutOutline />
              </Icon>
              Out group
            </button>
          )}
        </div>
      </div>
      {/* {isGroup && (
        <div className="avatar-group -space-x-6">
          <div className="avatar z-[4]">
            <div className="w-14  rounded-full ">
              <img src="https://th.bing.com/th/id/OIP.5dSi0zCpBrYxg1gwbe1IhgHaEo?pid=ImgDet&rs=1" alt="participant" />
            </div>
          </div>
          <div className="avatar z-[3]">
            <div className="w-14 rounded-full bg-gray-100">
              <svg
                className="absolute w-20 h-20 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="avatar z-[2]">
            <div className="w-14 rounded-full">
              <img src="https://th.bing.com/th/id/OIP.5dSi0zCpBrYxg1gwbe1IhgHaEo?pid=ImgDet&rs=1" alt="participant" />
            </div>
          </div>
          <div className="avatar placeholder z-[1]">
            <div className="w-14 rounded-full bg-neutral-focus text-neutral-content">
              <span>+99</span>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default memo(ConversationUtils);
