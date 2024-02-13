import { lazy, memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { useConfirm } from '../hooks/useConfirm';
import { socket } from '../service/socket';
import { clearTempFilesUrl } from '../store/temp-files-slice';
import useSequene from '../hooks/useSequence';

const Setting = lazy(() => import('../components/Setting'));
const Navigate = lazy(() => import('../components/new/Navigate'));
const Layout = memo(() => {
  const {
    entity: { userId: key },
    isLoading,
  } = useAppSelector((state) => state.information);
  const sequence = useSequene()
  const { id } = useAppSelector((state) => state.currentConversation);
  const { urls } = useAppSelector((state) => state.tempFileUrls);
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  useEffect(() => {
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

    return () => {
      socket.disconnect();
      socket.off('disconnect');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, [key]);
  useEffect(() => {
    socket.emit('join conversation', id);
    socket.emit('join room', id);
    return () => {
      socket.emit('leave room', id);
    };
  }, [id]);
  useEffect(() => {
    document.title = 'Chat';
  }, []);
  useEffect(() => {
    socket.on('error', async () => {
      const choice = await confirm({
        isOpen: true,
        buttonLabel: 'Reload',
        description: 'An error has occurred! Please reload the page!',
      });
      if (choice) {
        window.location.href = '/me';
      }
    });
    return () => {
      socket.off('error');
    };
  }, [confirm]);
  useEffect(() => {
    if (urls.length > 0) {
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
        dispatch(clearTempFilesUrl());
      };
    }
  });
  useEffect(() => {
    if (key) {
      sequence(key)
    }
  }, [key, sequence]);

  // useEffect(() => {
  //   const handleDomLoaded = (event: Event) => {
  //     event.preventDefault();
  //     console.log('loaded');
  //   };
  //   document.addEventListener('DOMContentLoaded', handleDomLoaded);
  //   return () => {
  //     document.removeEventListener('DOMContentLoaded', handleDomLoaded);
  //   };
  // }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <section className="flex gap-[2px]">
            <Navigate />
            <Outlet />
          </section>
          <Setting />
        </>
      ) : null}
    </>
  );
});
export default Layout;
