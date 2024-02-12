/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import {
  FocusEvent,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaImage } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { TbFileDescription, TbLocationFilled } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { useQueryClient } from '@tanstack/react-query';

import { MessageQueryType } from '../../../@types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useConfirm } from '../../../hooks/useConfirm';
import { useCreateConversation } from '../../../hooks/useCreateConversation';
import { useCreateMediaMessage } from '../../../hooks/useCreateMediaMessage';
import { useDeleteMsgs } from '../../../hooks/useDeleteMsgs';
import { useHandleConversation } from '../../../hooks/useHandleNewConversation';
import { useHandleNewGroup } from '../../../hooks/useHandleNewGroup';
import { socket } from '../../../service/socket';
import {
  addConversations,
  rollbackConversations,
  setAuthError,
  setCurrentConversation,
  updateLastDeletedMsg,
  updateLastMessage,
} from '../../../store';
import { setShowBouncing } from '../../../store/bouncing-slice';
import { clearNewConversation } from '../../../store/new-conversation-slice';
import { clearSelectedMessages } from '../../../store/selected-Message-slice';
import { addTempFilesUrl } from '../../../store/temp-files-slice';
import { setTempMessage } from '../../../store/temp-message-slice';
import { getCurrentUnixTimestamp } from '../../../utils';
import FourDots from '../../atoms/FourDots';
import Icon from '../../atoms/Icon';
import AudioRecordButton from '../../atoms/AudioRecordButton';

const MessageInput: FunctionComponent = () => {
  const advanceMessageBoxRef = useRef<HTMLDivElement>(null);
  const advanceMessageButtonRef = useRef<HTMLDivElement>(null);
  const textboxRef = useRef<HTMLDivElement>(null);
  const [shouldShowAdvanceMessage, setShouldShowAdvanceMessage] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const { message, indexes } = useAppSelector((state) => state.selectedMessage);
  const location = useLocation();
  const path = location.pathname.split('/');
  const currentConversation = path.at(-1) as string;
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const navigate = useNavigate();
  const { mutate: mutateMedia } = useCreateMediaMessage();
  const { mutate: mutateConversation } = useCreateConversation();
  const queryClient = useQueryClient();
  const { id, name, participants, isGroup } = useAppSelector((state) => state.newConversation);
  const { state, participants: numberUsers } = useAppSelector((state) => state.currentConversation);
  const { entities: newParticipants } = useAppSelector((state) => state.participants);
  const confirm = useConfirm();
  const handleOnFocus = (event: FocusEvent<HTMLDivElement, Element>) => {
    event.preventDefault();
    socket.emit('typing', { room: currentConversation, user: userId });
    // socket.emit('mark unread messages', { conversation: currentConversation, user: key, time: Date.now().toString() });
  };
  const handleOnBlur = (event: FocusEvent<HTMLDivElement, Element>) => {
    event.preventDefault();
    socket.emit('not typing', { room: currentConversation, user: userId });
  };
  const { isAuthError } = useAppSelector(state => state.error)
  const handleNewGroup = useHandleNewGroup();
  const handleNewConversation = useHandleConversation();
  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const text = event.currentTarget.innerText.trim();
        if (text) {
          if (newParticipants.length === 0) {
            handleNewConversation({ message: [{ type: 'text', content: text }] });
          } else {
            handleNewGroup({ message: [{ type: 'text', content: text }] });
          }
          event.currentTarget.innerText = '';
        }
        // console.log(files)
        // if (files.length > 0) {
        //     const msgs = []
        //     await Promise.all(files.map(async (data) => {
        //         const messageId = crypto.randomUUID()
        //         const time = Math.round(new Date().getTime() / 1000);
        //         const mime = await getMimeType(data.file)
        //         // console.log(mime)
        //         if (mime.startsWith("image/")) {
        //             msgs.push({
        //                 type: "image",
        //                 content: URL.createObjectURL(data.file)
        //             })
        //             // const data = {
        //             //     messageId,
        //             //     conversationId: currentConversation,
        //             //     message: {
        //             //         message: [{

        //             //             type: "image",
        //             //         }],
        //             //         sender: userId,
        //             //         recipients: [],
        //             //         isDeleted: false,
        //             //         createdAt: time.toString(),
        //             //         group:getCurrentUnixTimestamp()
        //             //     }
        //             //     // showAvatar: false,
        //             //     // url: data.url
        //             //     // url: "253afed0-99bb-4111-a569-efb4097f84e8-b4e01e2a-7fa4-46ba-a6e0-79ac2bf0a245"
        //             // };
        //             // mutate({ file: data.file, id: messageId, conversation: currentConversation, type: "image", "sender": key ?? "", content: "", time })
        //             // setMessages(prev => [...prev as [],
        //             //     msg
        //             // ])
        //             // data.type = "image"
        //         }
        //         return [];
        //         // if (mime.startsWith("video/")) {
        //         //     console.log(data.file)
        //         //     const msg = {
        //         //         messageId,
        //         //         conversationId: id,
        //         //         type: "video",
        //         //         sender: key,
        //         //         recipients: [],
        //         //         isDeleted: false,
        //         //         createdAt: time.toString(),
        //         //         showAvatar: false,
        //         //         url: data.url
        //         //     } as Message;
        //         //     setMessages(prev => [...prev as [], msg])
        //         // }
        //     }))
        //     setFiles([])
        //     // setFiles(prev => prev.)
        // }
      }
    },
    [handleNewConversation, handleNewGroup, newParticipants.length],
  );

  useEffect(() => {
    const handler = (event: globalThis.MouseEvent) => {
      if (
        advanceMessageBoxRef.current?.contains(event.target as HTMLElement) ||
        advanceMessageButtonRef.current?.contains(event.target as HTMLElement)
      ) {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
        debounce.current = setTimeout(() => {
          setShouldShowAdvanceMessage(true);
        }, 30);
      } else {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
        debounce.current = setTimeout(() => {
          setShouldShowAdvanceMessage(false);
        }, 30);
      }
    };
    document.addEventListener('mousemove', handler);
    return () => {
      document.removeEventListener('mousemove', handler);
    };
  }, []);
  useEffect(() => {
    if (textboxRef.current) {
      textboxRef.current.focus();
    }
  }, []);
  // useEffect(() => {
  //   const currentValue = textboxRef.current;
  //   const handler = (event: Event) => {
  //     if (event.target === currentValue && currentValue?.innerText.trim()) {
  //       setSendIcon(true);
  //     } else {
  //       setSendIcon(false);
  //     }
  //   };
  //   if (currentValue) {
  //     currentValue.addEventListener('input', handler);
  //     return () => currentValue.removeEventListener('input', handler);
  //   }
  // }, []);
  // useEffect(() => {
  //   const currentValue = textboxRef.current;
  //   const handler = (event: globalThis.MouseEvent) => {
  //     if (!currentValue?.contains(event.target as HTMLElement)) {
  //       setSendIcon(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handler);
  //   return () => document.removeEventListener('mousedown', handler);
  // }, []);
  // useEffect(() => {
  //     const handleFocus = (event: FocusEvent) => {
  //         event.preventDefault();
  //         console.log("input focused")
  //     }
  //     const currentTextbox = textboxRef.current
  //     if (currentTextbox) {
  //         currentTextbox.addEventListener("focus", handleFocus);
  //         return () => {
  //             currentTextbox.removeEventListener("focus", handleFocus)
  //         }
  //     }
  // }, [])
  // const location = useLocation()
  // const path = location.pathname.split("/")
  const { mutate: deleteMsgs } = useDeleteMsgs();
  const handleDeleteMsgs = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    // console.log(message)
    const choice = await confirm({
      isOpen: true,
      buttonLabel: 'Unsend',
      description: `Do you want to unsend ${message.length} ${message.length > 1 ? 'messages' : 'message'}? `,
    });
    if (choice) {
      queryClient.setQueryData(['get-messages', currentConversation], (data: MessageQueryType | undefined) => {
        if (data) {
          const newData = data.pages.map((entity) => {
            const updatedMessage = entity.messages.map((msg) => {
              const index = message.indexOf(msg.messageId);
              if (index !== -1) {
                return {
                  ...msg,
                  isDeleted: true,
                  message: [
                    {
                      type: 'text',
                      content: '',
                    },
                  ],
                };
              } else {
                return msg;
              }
            });
            return {
              ...entity,
              messages: updatedMessage,
            };
          });
          return {
            ...data,
            pages: newData,
          };
        }
      });
      dispatch(clearSelectedMessages());
      if (indexes.includes(0)) {
        dispatch(updateLastDeletedMsg(currentConversation));
      }
      deleteMsgs({ data: message, indexes }, {
        onError: () => {
          dispatch(setAuthError(true))
        }
      });
    } else {
      dispatch(clearSelectedMessages());
    }
  };
  const [files, setFiles] = useState<
    {
      file: File;
      url: string;
      type?: string;
    }[]
  >([]);
  useEffect(() => {
    if (files.length > 0) {
      return () => {
        files.forEach((file) => URL.revokeObjectURL(file.url));
      };
    }
  }, [files, files.length]);
  const handleSubmitFiles = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    if (files.length > 0) {
      const messageId = v4();
      const data = files.map((file) => {
        dispatch(addTempFilesUrl(file.url));
        return {
          content: file.url,
          type: file.file.type.split('/')[0] as 'video' | 'image' | 'file',
        };
      });
      console.log(data);
      if (!(name && id)) {
        queryClient.setQueryData(['get-messages', currentConversation], (oldData: MessageQueryType) => {
          const [first, ...rest] = oldData.pages;
          const messagesData = [
            {
              messageId,
              message: data,
              sender: userId,
              recipients: [],
              isDeleted: false,
              createdAt: Date.now().toString(),
              group: getCurrentUnixTimestamp(),
            },
            ...first.messages,
          ];

          return {
            ...oldData,
            pages: [
              {
                ...first,
                messages: [...messagesData],
              },
              ...rest,
            ],
          };
        });
        dispatch(setShowBouncing(false));
        dispatch(
          updateLastMessage({
            id: currentConversation,
            lastMessage: `Send ${files.length === 1 ? 'an image' : ' images'}`,
            lastMessageAt: Date.now().toString(),
            isLastMessageSeen: true,
            totalUnreadMessages: 0,
          }),
        );
      } else {
        console.log('else');

        const createdAt = Date.now().toString();
        queryClient.setQueryData(['get-messages', id], () => {
          const messagesData = [
            {
              messageId,
              message: data,
              sender: userId,
              recipients: [],
              isDeleted: false,
              createdAt: Date.now().toString(),
              group: getCurrentUnixTimestamp(),
            },
          ];

          return {
            pageParams: [''],
            pages: [
              {
                conversationId: id,
                hasNextPage: false,
                messages: [...messagesData],
              },
            ],
          };
        });
        dispatch(
          addConversations({
            conversationId: id,
            name,
            isGroup,
            isLastMessageSeen: false,
            createdAt,
            creator: null,
            lastMessage: `Send ${files.length === 1 ? 'an image' : ' images'}`,
            lastMessageAt: createdAt,
            status: 'offline',
            totalUnreadMessages: 0,
            participants,
            state: undefined,
          }),
        );
        dispatch(
          setTempMessage({
            messageId,
            message: data,
            sender: userId,
            recipients: [],
            isDeleted: false,
            createdAt: Date.now().toString(),
            group: getCurrentUnixTimestamp(),
          }),
        );
        dispatch(
          setCurrentConversation({
            id,
            name,
            isGroup,
            participants,
            isOnline: false,
            state: undefined,
          }),
        );
        dispatch(clearNewConversation());
        mutateConversation(
          { id, recipient: participants.find((i) => i.id !== userId)!.id, sender: userId },
          {
            onError: () => {
              dispatch(rollbackConversations());
              dispatch(clearNewConversation());
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['get-messages', id],
              });
              socket.emit('private message', {
                id: messageId,
                conversation: id,
                time: Date.now().toString(),
                message: data,
                sender: userId,
              });
              navigate('../' + id);
            },
          },
        );
      }
      mutateMedia({
        id: messageId,
        conversation: currentConversation,
        time: Date.now().toString(),
        sender: userId,
        type: 'image',
        file: files,
      });
      // setShouldOpenFilePreview(false)
      setFiles([]);
    }
  };

  return (
    <>
      {!(
        (state && state.isBlocked && currentConversation !== 'new') ||
        (newParticipants.length === 1 && newParticipants[0].state.isBlocker)
      ) ? (
        <div className="flex w-full items-center z-10 justify-center bg-inherit mt-4 absolute bottom-6">
          <div
            className={clsx(
              'h-full flex items-end justify-center gap-2 relative transition-all duration-500',
              message.length > 0 ? 'w-[30%]' : 'w-[60%]',
            )}
          >
            <div
              ref={advanceMessageButtonRef}
              className={clsx(
                'w-10 h-10 rounded-lg focus:outline-none flex items-center justify-center relative transition-all border-none',
                message.length > 0 ? 'hidden' : 'block',
              )}
            >
              <div className="cursor-pointer bg-surface-mix-300 rounded-lg border-none overflow-hidden">
                {/* <img src={fourDots} alt="" className="w-10  rounded-lg" /> */}
                <FourDots />
              </div>
              <div
                ref={advanceMessageBoxRef}
                className={clsx(
                  'absolute bottom-12 left-0 z-10 p-2 inline-block text-sm font-medium bg-surface-mix-300 border-none rounded-xl transition-all  duration-900 ease-in-out  w-44 origin-bottom-left',
                  !shouldShowAdvanceMessage ? ' opacity-0 scale-0' : 'opacity-100 scale-100  ',
                )}
              >
                <button
                  type="button"
                  className="w-full px-2 py-2 font-medium text-left rounded-[8px] cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2 "
                  onClick={() => {
                    setShouldShowAdvanceMessage(false);
                    // setShouldShowFileMessage(true)
                  }}
                >
                  <label htmlFor="file" className="flex items-center gap-2 text-color-base-100">
                    <Icon className="text-xl text-color-base-100">
                      <TbFileDescription />
                    </Icon>
                    <span className="text-color-base-100">File</span>
                  </label>
                </button>
                <button
                  type="button"
                  className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none"
                  onClick={() => {
                    setShouldShowAdvanceMessage(false);
                  }}
                >
                  <label htmlFor="media" className=" flex items-center gap-2">
                    <Icon className="text-xl">
                      <FaImage />
                    </Icon>
                    <span className="text-color-base-100">Image or Video</span>
                  </label>
                </button>
                <button
                  type="button"
                  className="w-full px-2 py-2 font-medium text-left rounded-[8px] border-gray-200 cursor-pointer hover:bg-surface-mix-400 text-color-base-100 focus:outline-none flex items-center gap-2 "
                >
                  <Icon className="text-xl">
                    <TbLocationFilled />
                  </Icon>
                  <span>Location</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col bg-surface-mix-300 min-h-[40px] w-[90%] border-2  border-none rounded-lg items-center">
              {/* <form onSubmit={hanldeSubmit}> */}
              {/* <Input className='absolute !rounded-xl  !px-2 !text-xl w-full pr-4 break-all break-words'
                onChange={(event) => setMessage(event.target.value)} value={message}
                onBlur={handleOnBlur} onFocus={handleOnFocus}
            /> */}
              {/* {files.length > 0 && <div className='w-full py-2 bg-[#343142] flex gap-2 rounded-t-lg  items-center px-4'>
            {files.map(data => {
                return (
                    <PreviewFile url={data.url} type={data.type} file={data.file} key={data.url} onClick={handleOnclickImage} />
                )
            })}
        </div>} */}

              {
                <div
                  ref={textboxRef}
                  contentEditable={
                    (message.length === 0 && currentConversation !== 'new') && !isAuthError ||
                    participants.length > 0 ||
                    newParticipants.length > 0
                  }
                  suppressContentEditableWarning={true}
                  spellCheck={false}
                  className={clsx(
                    ' align-middle rounded-md text-xl leading-[1.2] break-all break-words min-h-[40px] max-h-[160px]   w-full focus:outline-none ',
                    message.length > 0 ? 'flex items-center justify-center ' : 'px-4 py-2 overflow-y-auto ',
                    !(currentConversation !== 'new' || participants.length > 0 || newParticipants.length > 0)
                      ? 'cursor-not-allowed'
                      : '',
                  )}
                  onKeyDown={handleOnKeyDown}
                  onBlur={(event) => {
                    handleOnBlur(event);
                  }}
                  onFocus={(event) => {
                    handleOnFocus(event);
                  }}
                >
                  {message.length > 0 && (
                    <button
                      className={clsx(
                        'bg-red-400 font-semibold transition-colors text-base w-full h-10 rounded-lg text-color-base-100 hover:bg-red-500',
                      )}
                      onClick={handleDeleteMsgs}
                    >
                      unsend {message.length} {message.length > 1 ? 'messages' : 'message'}
                    </button>
                  )}
                </div>
              }
            </div>
            {/* <button
              className={clsx(
                'w-10 h-10 rounded-lg focus:outline-none flex items-center justify-center relative transition-transform bg-surface-mix-300 text-white',
                message.length > 0 ? 'hidden ' : 'block',
              )}
              onClick={handleClickMicroPhone}
            >
              <Icon
                className={clsx(
                  'absolute text-2xl transition-all duration-500 ',
                  !sendIcon ? 'visible opacity-100 ' : 'invisible opacity-0',
                )}
              >
                <FaMicrophone />
              </Icon>
              <Icon
                className={clsx(
                  'text-2xl transition-all duration-500 ',
                  sendIcon ? 'visible opacity-100 ' : 'invisible opacity-0',
                )}
              >
                <RiSendPlane2Fill />
              </Icon>
            </button> */}
            <AudioRecordButton shouldHidden={message.length > 0} />
          </div>
        </div>
      ) : (
        <div className=" flex w-full items-center justify-center absolute mt-4 bottom-6 ">
          <h1 className="text-color-base-100 font-semibold">
            {`You cannot send message to this ${numberUsers.length > 2 ? 'group' : 'person'}`}{' '}
          </h1>
        </div>
      )}
      {files.length > 0 && (
        <>
          <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-20 flex items-center justify-center">
            <div className="bg-surface-mix-200  max-w-[26.5rem]  h-auto p-2 min-h-[300px]  flex flex-col drop-shadow-lg rounded-lg overflow-hidden gap-2">
              {
                // ref
              }
              <div className="w-full h-auto flex gap-4 items-center">
                <button
                  className="w-10 h-10 rounded-full hover:bg-surface-mix-300 flex  items-center justify-center"
                  onClick={() => {
                    // setShouldOpenFilePreview(false)
                    files.length > 0 && files.forEach((file) => URL.revokeObjectURL(file.url));
                    setFiles([]);
                  }}
                >
                  <Icon className="text-2xl">
                    <IoCloseOutline />
                  </Icon>
                </button>
                <h1 className="pointer-events-none text-color-base-100 font-semibold">Send File</h1>
              </div>
              <div className="w-full h-full flex shrink-[1] flex-wrap gap-2">
                {files.map((item, _index, arr) => {
                  const id = v4();
                  // console.log(item.type)
                  return (
                    <div
                      key={item.file.name + id}
                      className={clsx(
                        'flex-1 rounded-[8px] overflow-hidden relative',
                        arr.length === 1 ? 'w-96' : 'basis-[calc(50%-0.5rem)]',
                      )}
                    >
                      <img
                        src={item.url}
                        alt=""
                        className={clsx('w-full object-cover align-middle', arr.length === 1 ? 'h-full' : 'h-48')}
                      />
                      <div className="absolute right-1 top-1 w-4 h-4 bg-gray-100 rounded-full cursor-pointer flex items-center justify-center">
                        <button onClick={() => setFiles((prev) => prev.filter((i) => i.url !== item.url))}>
                          <Icon className=" text-black">
                            <IoCloseOutline />
                          </Icon>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                className="w-full text-color-base-100 bg-surface-mix-400 rounded-[8px] py-2 font-semibold"
                onClick={handleSubmitFiles}
              >
                Send Message
              </button>
            </div>
          </div>
        </>
      )}
      {/* <div className='fixed w-full h-full backdrop-blur-sm'>
        <audio src='https://d3lugnp3e3fusw.cloudfront.net/blob?versionId=CXBV1gpBMFGhMUCfVaUlQZrk385dIe9g'>
          <track kind="captions" srcLang="en" label="english_captions" />
        </audio>
        <track>
        </track>
      </div> */}
    </>
  );
};

export default MessageInput;
