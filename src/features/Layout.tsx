import { lazy, memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { useConfirm } from '../hooks/useConfirm';
import { socket } from '../service/socket';
import { clearTempFilesUrl } from '../store/temp-files-slice';
import useSequene from '../hooks/useSequence';
import AdvanceMessages from '../components/advance/AdvanceMessages';
import GroupSetting from '../components/group/GroupSetting';
import { fetchInfomationThunk } from '../store/information-slice';

const Setting = lazy(() => import('../components/Setting'));
const Navigate = lazy(() => import('../components/new/Navigate'));
const Layout = memo(() => {
  const {
    entity: { userId },
    isLoading,
    isError,
  } = useAppSelector((state) => state.information);
  const sequence = useSequene();
  const { id } = useAppSelector((state) => state.currentConversation);
  const { urls } = useAppSelector((state) => state.tempFileUrls);
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      dispatch(fetchInfomationThunk(id));
    } else if (isError) {
      navigate('/signin');
    }
  }, [dispatch, id, isError, navigate, userId]);
  useEffect(() => {
    socket.auth = { id: userId };
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
  }, [userId]);
  useEffect(() => {
    socket.emit('join room', id);
    // if (id) {
    //   return () => {
    //     socket.emit('leave room', id);
    //   };
    // }
  }, [id]);
  // useEffect(() => {
  //   if (id) {
  //     socket.emit('join conversation', id);
  //     return () => {
  //       socket.emit('leave room', id);

  //     }
  //   }
  // })
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
        // urls.forEach((url) => URL.revokeObjectURL(url));
        dispatch(clearTempFilesUrl());
      };
    }
  });
  useEffect(() => {
    if (userId) {
      sequence(userId);
    }
  }, [userId, sequence]);

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
          <AdvanceMessages />
          <GroupSetting />
        </>
      ) : null}
    </>
  );
});
export default Layout;
