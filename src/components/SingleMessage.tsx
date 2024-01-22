import clsx from 'clsx';
import React from 'react';
import { MessageRef, ISingleMessage } from '../@types';
import { useAppSelector, useAppDispatch } from '../hooks';
import { unselectedMessage, selectedMessage } from '../store/selectedMessage-slice';
import { Storage } from '../service';

const SingleMessage = React.forwardRef<MessageRef, ISingleMessage>((props, ref) => {
  const { message: data, children, id, sender, avatar, shouldShowAvatar, isDelete } = props;
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const { message } = useAppSelector((state) => state.selectedMessage);
  const userId = Storage.Get('_k');
  const dispatch = useAppDispatch();
  const handleOnClick = React.useCallback(() => {
    if (isSelected) {
      setIsSelected(false);
      dispatch(unselectedMessage(id));
    } else {
      setIsSelected(true);
      dispatch(selectedMessage(id));
    }
  }, [dispatch, id, isSelected]);
  // console.log(id + " " + isVisible)
  return (
    <>
      {
        <div
          ref={ref}
          className={clsx(
            'w-full h-auto gap-4 flex py-2  relative transition-all origin-center',
            sender !== userId ? 'flex-row' : 'flex-row-reverse',
            isSelected ? 'bg-purple-500/10 cursor-pointer' : '',
            message.length > 0 ? 'px-72' : 'px-64',
          )}
          onClick={() => {
            if (message.length > 0 && sender === userId && !isDelete) {
              handleOnClick();
            }
          }}
        >
          {sender && (
            <div className="rounded-full w-14 h-14 overflow-hidden">
              {shouldShowAvatar ? (
                <img src={'https://d3lugnp3e3fusw.cloudfront.net/' + avatar} alt="" className="w-full h-full" />
              ) : null}
            </div>
          )}
          <div
            className={clsx(
              'max-w-[500px] h-auto flex shrink-[1] flex-wrap relative ',
              sender === userId ? 'cursor-pointer' : '',
            )}
            onClick={() => {
              if (message.length === 0 && sender === userId && !isDelete) {
                handleOnClick();
              }
            }}
          >
            {data.map((item, _index, arr) => {
              if (item.type === 'text') {
                return (
                  <div
                    key={item.content}
                    className={clsx(
                      ' text-white font-medium max-w-[500px] flex flex-col gap-1 rounded-2xl  whitespace-pre-wrap break-words min-w-[8.5rem]',
                      isDelete
                        ? 'items-center justify-center px-2 border-purple-400 border-2 py-2'
                        : 'pb-8 p-2 bg-purple-400',
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
                        <span className="absolute bottom-1 left-1 z-10 text-white">{12}</span>
                      </div>
                    )}
                  </div>
                );
              }
            })}
            {!isDelete && children}
          </div>
          {sender === userId && !isDelete && (
            <div
              className={clsx(
                'absolute  w-6 h-6 ring-4 ring-gray-500 rounded-full flex items-center justify-center bg-red-100 -translate-x-1/2 -translate-y-1/2 top-1/2 left-40 transition-all',
                message.length > 0 ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className={clsx('w-4 h-4 m-[2px] rounded-full', isSelected ? 'bg-gray-500' : '')}></div>
            </div>
          )}
        </div>
      }
    </>
  );
});
export default SingleMessage;
