import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { env } from '../config';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import { setPasskeyOptions, setPasswordOptions } from '../store/auth-options-slice';

type AuthOptsType = {
  opts: {
    password: boolean;
    passkey: boolean | undefined;
  };
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
      dispatch(setPasswordOptions(password));
      navigate('/password');
    },
  });
};
