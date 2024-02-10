import clsx from 'clsx';
import { forwardRef, useCallback } from 'react';

import { ISingleMessage, MessageRef } from '../@types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Storage } from '../service';
import { selectedMessage, unselectedMessage } from '../store/selected-Message-slice';
import { isValidUrl } from '../utils';
import WaveSurferPlayer from './atoms/WaveSurferPlayer';
// eslint-disable-next-line import/named

const SingleMessage = forwardRef<MessageRef, ISingleMessage>((props, ref) => {
  const { message: data, children, id, sender, shouldShowAvatar, isDelete, index } = props;
  const { message, indexes } = useAppSelector((state) => state.selectedMessage);
  const { participants, state } = useAppSelector((state) => state.currentConversation);
  const userId = Storage.Get('_k');
  const dispatch = useAppDispatch();
  const handleOnClick = useCallback(() => {
    if (state && state.isBlocked) return;
    if (indexes.includes(index)) {
      dispatch(unselectedMessage({ message: id, index }));
    } else {
      dispatch(selectedMessage({ message: id, index }));
    }
  }, [dispatch, id, index, indexes, state]);
  // console.log(id + " " + isVisible)
  const rawAvatar = participants.find((i) => i.id === sender)?.avatar as string;

  const avatar = isValidUrl(decodeURIComponent(rawAvatar))
    ? decodeURIComponent(rawAvatar)
    : 'https://d3lugnp3e3fusw.cloudfront.net/' + rawAvatar;

  return (
    <>
      {
        <div
          ref={ref}
          className={clsx(
            'w-full h-auto gap-4 flex py-2  relative transition-all origin-center cursor-pointer',
            sender !== userId ? 'flex-row' : 'flex-row-reverse',
            indexes.includes(index) ? 'bg-surface-mix-200 ' : '',
            message.length > 0 ? 'px-72' : 'px-64',
          )}
          onClick={() => {
            if (sender === userId && !isDelete) {
              handleOnClick();
            }
          }}
        >
          {sender && (
            <div className="rounded-full w-14 h-14 overflow-hidden">
              {shouldShowAvatar ? <img src={avatar} alt="" className="w-full h-full" /> : null}
            </div>
          )}
          <div
            className={clsx(
              'max-w-[500px] h-auto flex shrink-[1] flex-wrap relative ',
              sender === userId && !(state && state.isBlocked) ? 'cursor-pointer' : '',
            )}
            onClick={(e) => {
              // e.preventDefault()
              e.stopPropagation()
              console.log("trueee");

              // if (message.length === 0 && sender === userId && !isDelete) {
              //   handleOnClick();
              // }
            }}
          >
            {data.map((item, _index, arr) => {
              if (item.type === 'text') {
                return (
                  <div
                    key={item.content}
                    className={clsx(
                      ' text-color-base-100 font-medium max-w-[500px] flex flex-col gap-1 rounded-2xl  whitespace-pre-wrap break-words min-w-[8.5rem]',
                      isDelete
                        ? 'items-center justify-center px-2 border-surface-mix-300 border-2 py-2'
                        : 'pb-8 p-2 bg-surface-mix-300',
                    )}
                  >
                    {!isDelete && <p>{item.content}</p>}
                    {isDelete && (
                      <p>
                        <i>unsent message</i>
                      </p>
                    )}
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.content}
                    className={clsx(
                      'flex-1 rounded-[8px] overflow-hidden cursor-pointer',
                      arr.length === 1 ? '' : 'basis-[calc(50%-0.5rem)]',
                    )}
                  >
                    {item.type === 'image' && (
                      <>
                        <img
                          src={
                            item.content.startsWith('blob:')
                              ? item.content
                              : 'https://d3lugnp3e3fusw.cloudfront.net/' + item.content
                          }
                          alt=""
                          loading="lazy"
                          className={clsx(
                            'w-full bg-gray-500 object-cover align-middle',
                            arr.length === 1 ? '' : 'h-48',
                          )}
                        />
                      </>
                    )}
                    {item.type === 'video' && (
                      <div className="relative">
                        <video
                          src={item.content}
                          className={clsx('w-full object-cover align-middle', arr.length === 1 ? '' : 'h-48')}
                        >
                          <track default kind="captions" srcLang="en" />
                        </video>
                        <span className="absolute bottom-1 left-1 z-10 text-color-base-100">{12}</span>
                      </div>
                    )}
                    {
                      item.type === "audio" && (
                        <WaveSurferPlayer barGap={2}
                          height={60}
                          barWidth={2}
                          cursorWidth={0}
                          barHeight={20}
                          waveColor="gray"
                          url={item.content.startsWith('blob:')
                            ? item.content
                            : 'https://d3lugnp3e3fusw.cloudfront.net/' + item.content}

                        />
                      )
                    }
                  </div>
                );
              }
            })}
            {!isDelete && children}
          </div>
          {sender === userId && !isDelete && (
            <div
              className={clsx(
                'absolute  w-6 h-6 ring-4 ring-gray-500 rounded-full flex items-center justify-center bg-transparent -translate-x-1/2 -translate-y-1/2 top-1/2 left-40 transition-all',
                message.length > 0 ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className={clsx('w-4 h-4 m-[2px] rounded-full', indexes.includes(index) ? 'bg-gray-500' : '')}></div>
            </div>
          )}
        </div>
      }
    </>
  );
});
export default SingleMessage;
