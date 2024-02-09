/* eslint-disable @typescript-eslint/require-await */

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { LoginResponse } from '../@types';
import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import { UserContext } from '../store/context';
import { setId } from '../store/socket-id-slide';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import useAxios from './useAxios';

export const usePassword = () => {
  const { user } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (password: string) => {
      await delay(1000);
      return await axios.post<LoginResponse>(env.BACK_END_URL + '/auth/login-password', {
        email: user,
        password,
      });
    },
    onSuccess: async (data) => {
      // const options = data.data
      // console.log(options)
      // const loginRes = await startAuthentication(options)
      // const request = {
      //     email: 'minhngocx2003.403@gmail.com',
      //     data: loginRes,
      // }
      // mutate(request)
      const { id, access_token: ACT } = data.data;
      dispatch(setId(id));
      Storage.Set<string>('_k', id);
      Storage.Set<string>('_a', ACT);
      navigate('/me');
    },
  });
};
