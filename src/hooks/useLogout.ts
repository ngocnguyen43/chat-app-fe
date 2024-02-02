import { useNavigate } from 'react-router-dom';

/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import { clearPasswordOptions } from '../store';
import { clearConntacts } from '../store/contacts-slice';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import useAxios from './useAxios';
import { useSetTheme } from './useSetTheme';

export const useLogout = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();
  const dispatch = useAppDispatch();
  const { mutate: setTheme } = useSetTheme();
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
      const mode = Storage.Get('theme');
      Storage.Clear();
      Storage.Set('theme', mode!);
      const e = document.getElementsByTagName('body');
      if (e.length > 0) {
        e[0].setAttribute('data-theme', 'light');
        setTheme('light');

      }
      navigate('/');
    },
  });
};
