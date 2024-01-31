import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { UserContext } from '../store/context';
import { delay } from '../utils';
import useAxios from './useAxios';
import { useContext } from 'react';

export const useUpdatePassword = () => {
  const { user } = useContext(UserContext);
  const { axios } = useAxios();

  return useMutation({
    mutationFn: async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
      await delay(1000);
      return await axios.patch(env.BACK_END_URL + '/auth/newpassword', {
        email: user,
        newPassword,
        oldPassword,
      });
    },
  });
};
