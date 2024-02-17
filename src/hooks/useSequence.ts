import { useCallback } from 'react';
import { fetchContactsThunk, fetchConversationsThunk } from '../store';
import { fetchThemeThunk } from '../store/theme-slice';
import { useAppDispatch } from './useAppDispatch';

export default function useSequene() {
  const dispatch = useAppDispatch();
  return useCallback(
    (key: string) =>
      dispatch(fetchThemeThunk(key))
        .then(() => {
          dispatch(fetchContactsThunk(key));
        })
        .then(async () => {
          await dispatch(fetchConversationsThunk(key));
        }),
    [dispatch],
  );
}
