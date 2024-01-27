/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';
import { Storage } from '../service/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { env } from '../config';
import useAxios from './useAxios';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import { clearConntacts } from '../store/contacts-slice';
import { clearPasswordOptions } from '../store';

export const useLogout = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async () => {
      await delay(1000);
      return await axios.post(env.BACK_END_URL + '/auth/logout');
    },
    onSuccess: async () => {
      // const options = data.data
      // console.log(options)
      // const loginRes = await startAuthentication(options)
      // const request = {
      //     email: 'minhngocx2003.403@gmail.com',
      //     data: loginRes,
      // }
      // mutate(request)
      dispatch(clearConntacts());
      dispatch(clearPasswordOptions());
      Storage.Clear();
      navigate('/');
    },
  });
};
