import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { set2FA, setPasskeyOptions, setPasswordOptions } from '../store/auth-options-slice';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';

type AuthOptsType = {
  opts: {
    password: boolean;
    passkey: boolean | undefined;
  };
  "2fa": boolean
};
export const useLoginOptions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (email: string) => {
      await delay(1000);
      return await axios.post<AuthOptsType>(env.BACK_END_URL + '/auth/login-options', {
        email,
      });
    },
    onSuccess: (data) => {
      console.log(data.data.opts);
      const { passkey, password } = data.data.opts;
      if (passkey) {
        dispatch(setPasskeyOptions(passkey));
      }
      dispatch(set2FA(data.data['2fa']))
      dispatch(setPasswordOptions(password));
      navigate('/password');
    },
  });
};
