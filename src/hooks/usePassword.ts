/* eslint-disable @typescript-eslint/require-await */

import { useContext } from 'react';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { UserContext } from '../store/context';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import useAxios from './useAxios';
import { fetchInfomationThunk } from '../store/information-slice';
import { useNavigate } from 'react-router-dom';

export const usePassword = () => {
  const { user } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const { axios } = useAxios();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (password: string) => {
      await delay(1000);
      return await axios.post<string>(env.BACK_END_URL + '/auth/login-password', {
        email: user,
        password,
      });
    },
    onSuccess: async (res) => {
      // const options = data.data
      // console.log(options)
      // const loginRes = await startAuthentication(options)
      // const request = {
      //     email: 'minhngocx2003.403@gmail.com',
      //     data: loginRes,
      // }
      // mutate(request)
      dispatch(fetchInfomationThunk(res.data)).then(() => {
        navigate("/me")
      });
      // console.log(data);

      // dispatch(setId("937409b2-b16b-4f56-ada4-a1c655d0a1c4"));
      // Storage.Set<string>('_k', "937409b2-b16b-4f56-ada4-a1c655d0a1c4");
      // // Storage.Set<string>('_a', ACT);
      // navigate('/me');
    },
  });
};
