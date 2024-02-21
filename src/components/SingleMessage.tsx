/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import clsx from 'clsx';
import { ElementRef, forwardRef, useCallback, useEffect, useRef } from 'react';

import { ISingleMessage, MessageRef } from '../@types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectedMessage, unselectedMessage } from '../store/selected-Message-slice';
import { isValidUrl } from '../utils';
import WaveSurferPlayer from './atoms/WaveSurferPlayer';
import CustomHeartStroke from './shapes/CustomHeartStroke';
import { Shape, Burst } from '@mojs/core';
import MapComponent from './MapComponent';
import { v4 } from 'uuid';
import useUpdateReaction from '../hooks/useUpdateReaction';

const CIRCLE_RADIUS = 20;
const RADIUS = 32;
const SingleMessage = forwardRef<MessageRef, ISingleMessage>((props, ref) => {
  const { message: data, children, id, sender, shouldShowAvatar, isDelete, index, reactions } = props;
  const { message, indexes } = useAppSelector((state) => state.selectedMessage);
  const { participants, state } = useAppSelector((state) => state.currentConversation);
  const {
    entity: {
      profile: { avatar: userAvatar },
    },
  } = useAppSelector((state) => state.information);
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
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
    : rawAvatar
      ? 'https://d3lugnp3e3fusw.cloudfront.net/' + rawAvatar
      : userAvatar;

  const animDom = useRef<ElementRef<'div'>>(null);
  const heartShape = useRef<Shape>();
  const circleShape = useRef<Shape>();
  const burst = useRef<Burst>();
  const updateReaction = useUpdateReaction();
  useEffect(() => {
    // Prevent multiple instansiations on hot reloads
    if (heartShape.current || !animDom.current) return;

    // Assign a Shape animation to a ref
    heartShape.current = new Shape({
      parent: animDom.current,
      left: 0,
      top: 2,
      shape: 'heart',
      fill: '#E5214A',
      scale: !reactions ? { 0: 1 } : { 1: 0 },
      easing: 'elastic.out',
      duration: 800,
      delay: 300,
      radius: 11,
      // onStart() {
      //   setIsAnimating(false);
      // },
      isShowStart: reactions ? true : undefined,
      // onComplete() {
      //   setIsAnimating(true);
      // },
    });
  }, [reactions]);

  useEffect(() => {
    // Prevent multiple instansiations on hot reloads
    if (burst.current) return;

    // Assign a Shape animation to a ref
    burst.current = new Burst({
      parent: animDom.current,
      left: 0,
      top: 0,
      radius: { 4: RADIUS },
      angle: 45,
      count: 14,
      timeline: { delay: 300 },
      children: {
        radius: 2.5,
        fill: [
          // { '#91D2FA' : '#BDEFD8' },
          // { '#91D2FA' : '#ADD6CA' },
          { '#9EC9F5': '#9ED8C6' },
          { '#91D3F7': '#9AE4CF' },

          { '#DC93CF': '#E3D36B' },
          { '#CF8EEF': '#CBEB98' },

          { '#87E9C6': '#1FCC93' },
          { '#A7ECD0': '#9AE4CF' },

          { '#87E9C6': '#A635D9' },
          { '#D58EB3': '#E0B6F5' },

          { '#F48BA2': '#CF8EEF' },
          { '#91D3F7': '#A635D9' },

          { '#CF8EEF': '#CBEB98' },
          { '#87E9C6': '#A635D9' },
        ],
        scale: { 1: 0, easing: 'quad.in' },
        pathScale: [0.8, null],
        degreeShift: [13, null],
        duration: [500, 700],
        easing: 'quint.out',
        // speed: .1
      },
    });
  }, [reactions]);
  useEffect(() => {
    // Prevent multiple instansiations on hot reloads
    if (circleShape.current) return;
    // Assign a Shape animation to a ref
    circleShape.current = new Shape({
      parent: animDom.current,
      left: 0,
      top: 0,
      stroke: { '#E5214A': '#CC8EF5' },
      strokeWidth: { [2 * CIRCLE_RADIUS]: 0 },
      fill: 'none',
      scale: { 0: 1 },
      radius: CIRCLE_RADIUS,
      duration: 400,
      easing: 'cubic.out',
    });
  }, [reactions]);
  const handleReaction = useCallback(() => {
    if (userId !== sender) {
      if (reactions) {
        heartShape.current?.replay();
        updateReaction('remove', id);
      } else {
        burst.current?.replay();
        circleShape.current?.replay();
        heartShape.current?.replay();
        updateReaction('create', id);
      }
    }
    // socket.emit("create reaction", { userId, messageId: id })
  }, [id, reactions, sender, updateReaction, userId]);
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
              {shouldShowAvatar ? (
                <img
                  src={
                    avatar
                  }
                  alt=""
                  className="w-full h-full"
                />
              ) : null}
            </div>
          )}
          <div
            className={clsx(
              'max-w-[500px] h-auto flex shrink-[1] flex-wrap relative ',
              sender === userId && !(state && state.isBlocked) ? 'cursor-pointer' : '',
            )}
            onClick={(e) => {
              // e.preventDefault()
              e.stopPropagation();

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
              } else if (item.type !== 'coordinate') {
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
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(e.currentTarget.src);
                          }}
                        />
                      </>
                    )}
                    {item.type === 'video' && (
                      <div className="relative">
                        <video
                          controls
                          src={
                            item.content.startsWith('blob:')
                              ? item.content
                              : 'https://d3lugnp3e3fusw.cloudfront.net/' + item.content
                          }
                          className={clsx('w-full object-cover align-middle', arr.length === 1 ? '' : 'h-48')}
                        >
                          <track default kind="captions" srcLang="en" />
                        </video>
                        {/* <span className="absolute bottom-1 left-1 z-10 text-color-base-100">{12}</span> */}
                      </div>
                    )}
                    {item.type === 'audio' && (
                      <WaveSurferPlayer
                        barGap={2}
                        height={60}
                        barWidth={2}
                        cursorWidth={0}
                        barHeight={20}
                        waveColor="gray"
                        url={
                          item.content.startsWith('blob:')
                            ? item.content
                            : 'https://d3lugnp3e3fusw.cloudfront.net/' + item.content
                        }
                      />
                    )}
                  </div>
                );
              } else {
                const tempKey = v4();
                return (
                  <div key={tempKey} className="h-[600px] w-[500px]">
                    <MapComponent {...item.content} />
                  </div>
                );
              }
            })}
            {!isDelete && children}
            {!isDelete && !state?.isBlocked && (
              <>
                <div
                  ref={animDom}
                  className={clsx('-bottom-4', sender !== userId ? '-right-4' : 'left-3')}
                  style={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    marginLeft: '-12px',
                    marginTop: '-12px',
                    opacity: 1,
                    transform: 'translate(0px, 0px) rotate(0deg) scale(0.6, 0.6)',
                    transformOrigin: '50% 50%',
                    zIndex: 2,
                  }}
                  onClick={handleReaction}
                >
                  {sender !== userId && <CustomHeartStroke />}
                </div>
              </>
            )}
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
