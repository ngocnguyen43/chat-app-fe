/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { clearPasswordOptions } from '../store';
import { clearConntacts } from '../store/contacts-slice';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import useAxios from './useAxios';
import { useSetTheme } from './useSetTheme';
import { persistor } from '../store/store';

export const useLogout = () => {
  // const navigate = useNavigate();
  const { axios } = useAxios();
  const dispatch = useAppDispatch();
  const { mutate: setTheme } = useSetTheme();
  return useMutation({
    mutationFn: async () => {
      await delay(1000);
      return await axios.post(env.BACK_END_URL + '/auth/logout');
    },
    onSuccess: () => {
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
      persistor.purge();
      const e = document.getElementsByTagName('body');
      if (e.length > 0) {
        e[0].setAttribute('data-theme', 'light');
        setTheme('light');
      }
      window.location.href = '/signin';
      // navigate('/signin');
    },
  });
};
