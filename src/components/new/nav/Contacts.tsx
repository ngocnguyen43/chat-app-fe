/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx';

import Carousel from 'react-multi-carousel';
import { NavLink } from 'react-router-dom';

import { ContactType } from '../../../@types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Storage } from '../../../service/LocalStorage';
import { setCurrentConversation } from '../../../store/current-conversation-slice';
import { FunctionComponent, useCallback } from 'react';

const Skeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
      </div>
    </div>
  );
};
const Contact: FunctionComponent<ContactType> = (props) => {
  const { userId: id, conversationId, avatar, status, fullName } = props;
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    dispatch(
      setCurrentConversation({
        participants: [{ id, avatar }],
        id: conversationId,
        isGroup: false,
        isOnline: status === 'online',
        name: fullName,
      }),
    );
  }, [avatar, conversationId, dispatch, fullName, id, status]);
  return (
    <NavLink to={conversationId} className="flex flex-col gap-2 justify-center items-center" onClick={onClick}>
      <div className="avatar relative ">
        <div
          className={clsx(
            'w-14 rounded-full ring  ring-offset-base-100 ring-offset-4',
            status === 'online' ? 'ring-green-300' : 'ring-red-300',
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
            <div className="w-full flex items-center justify-center">
              <Skeleton />
            </div>
          )}
        </Carousel>
      }
    </div>
  );
}
