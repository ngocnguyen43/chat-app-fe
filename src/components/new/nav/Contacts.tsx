/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx';
import { FunctionComponent, useCallback, useEffect, useId } from 'react';
import Carousel from 'react-multi-carousel';
import { NavLink } from 'react-router-dom';

import { ContactType } from '../../../@types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { socket } from '../../../service/socket';
import { updateContactStatus } from '../../../store';
import { setCurrentConversation } from '../../../store/current-conversation-slice';

const Skeleton: FunctionComponent<{ total: number }> = (props) => {
  const { total } = props;
  const id = useId();
  return (
    <>
      {Array(total)
        .fill(1)
        .map((i, index) => (
          <div className="flex flex-col gap-4 w-52" key={id + i + index}>
            <div className="flex gap-4 items-center">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            </div>
          </div>
        ))}
    </>
  );
};
const Contact: FunctionComponent<ContactType> = (props) => {
  const { userId: id, conversationId, avatar, status, fullName, state } = props;
  const {
    entity: {
      userId,
      profile: { avatar: userAvatar },
    },
  } = useAppSelector((state) => state.information);
  const { entities: conversations } = useAppSelector((state) => state.conversations);
  const existConversation = conversations.find((conversation) => conversation.conversationId === conversationId);
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    dispatch(
      setCurrentConversation({
        participants: [
          { id, avatar, fullName },
          { id: userId, avatar: userAvatar, fullName },
        ],
        id: conversationId,
        isGroup: false,
        isOnline: status === 'online',
        name: fullName,
        state: existConversation ? existConversation.state : undefined,
      }),
    );
  }, [avatar, conversationId, dispatch, existConversation, fullName, id, status, userAvatar, userId]);
  return (
    <NavLink to={conversationId} className="flex flex-col gap-2 justify-center items-center" onClick={onClick}>
      <div className="avatar relative ">
        <div
          className={clsx(
            'w-14 rounded-full ring  ring-offset-base-100 ring-offset-4',
            state.isBlocked ? 'ring-gray-500' : status === 'online' ? 'ring-green-300' : 'ring-red-300',
          )}
        >
          <img src={'https://d3lugnp3e3fusw.cloudfront.net/' + avatar} alt="minh ngoc" />
        </div>
      </div>
      <h2 className="text-[14px] font-medium fixed -bottom-8 z-90">{fullName}</h2>
    </NavLink>
  );
};
export default function Contacts() {
  const { entities, loading } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('user status', (arg: { id: string; status: 'online' | 'offline'; lastLogin: string }) => {
      const { id, status, lastLogin } = arg;
      dispatch(updateContactStatus({ id, status, lastLogin }));
    });
    return () => {
      socket.off('user status');
    };
  }, [dispatch]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2">
        <h2 className="font-semibold">Contacts</h2>
      </div>
      {
        <Carousel responsive={responsive} className={clsx('w-full py-9 flex gap-1 z-20')}>
          {entities ? entities.map((item) => <Contact key={item.userId} {...item} avatar={item.avatar} />) : null}
          {loading && (
            <div className="w-full flex items-center justify-center pl-36 gap-2">
              <Skeleton total={4} />
            </div>
          )}
        </Carousel>
      }
    </div>
  );
}
