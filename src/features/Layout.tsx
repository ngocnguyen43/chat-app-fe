import React from 'react';
import { Outlet } from 'react-router-dom';

import Setting from '../components/Setting';
import { useAppDispatch } from '../hooks';
import { Storage } from '../service/LocalStorage';
import { socket } from '../service/socket';
import { fetchContactsThunk } from '../store/contacts-slice';
import { useGetTheme } from '../hooks/useGetTheme';
import Spinner from '../components/atoms/Spinner';

const Navigate = React.lazy(() => import('../components/new/Navigate'));
export default function Layout() {
  const key = Storage.Get('_k');
  const id = Storage.Get('id');
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    socket.auth = { id: key };
    socket.connect();
    socket.on('connect', () => {
      console.log(`connect ${socket.id}`);
    });
    socket.on('disconnect', () => {
      console.log(`disconnect`);
    });
    socket.on('connect_error', (err) => {
      console.log(err);
    });
    socket.emit('join conversation', id);
    socket.emit('join room', id);
    return () => {
      socket.disconnect();
      socket.off('disconnect');
      socket.off('connect');
      socket.off('connect_error');
    };
  });
  React.useEffect(() => {
    document.title = 'Chat';
  }, []);
  React.useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  // React.useEffect(() => {
  //   const handleDomLoaded = (event: Event) => {
  //     event.preventDefault();
  //     console.log('loaded');
  //   };
  //   document.addEventListener('DOMContentLoaded', handleDomLoaded);
  //   return () => {
  //     document.removeEventListener('DOMContentLoaded', handleDomLoaded);
  //   };
  // }, []);
  const { data, isLoading } = useGetTheme()

  const body = document.getElementsByTagName("body")
  React.useEffect(() => {
    if (body.length > 0 && !isLoading && data) {
      body[0].setAttribute("data-theme", data.theme)
      // Storage.Set("theme", data.theme)
    }
  }, [isLoading, body, data])

  return (
    <>
      {!isLoading ? <>

        <section className="flex gap-[2px]">
          <Navigate />
          <Outlet />
        </section>
        <Setting />
      </> : <section className='w-full h-full absolute top-0 left-0 flex items-center justify-center'><Spinner size='loading-lg' /></section>
      }
    </>
  );
}
