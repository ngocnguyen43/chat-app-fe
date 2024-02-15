/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { fetchInfomationThunk } from '../store/information-slice';
import { useAppDispatch } from './useAppDispatch';
import useAxios from './useAxios';

export const useWebAuthnLoginVerification = () => {
  const dispatch = useAppDispatch();
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.post<string>(`${env.BACK_END_URL}/auth/webauth-login-verification`, {
        email: data.email,
        data: data.data,
      });
    },
    onSuccess: (res) => {
      // const { id, access_token: ACT } = data.data;
      // dispatch(setId(id));
      // Storage.Set<string>('_k', id);
      // Storage.Set<string>('_a', ACT);
      dispatch(fetchInfomationThunk(res.data));
    },
  });
};
