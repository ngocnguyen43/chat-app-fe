/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import { setId } from '../store/socket-id-slide';
import { useAppDispatch } from './useAppDispatch';

export interface RegisterDto {
  email: string;
  userName: string;
  fullName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
interface LoginResponse {
  id: string;
  email: string;
  full_name: string;
  user_name: string;
  access_token: string;
}
export const useSignup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (dto: RegisterDto) => {
      return await axios.post<LoginResponse>(env.BACK_END_URL + '/auth/register', dto);
    },
    onSuccess: async (data) => {
      // eslint-disable-next-line camelcase
      const { id, access_token, full_name } = data.data;
      dispatch(setId(id));
      Storage.Set<string>('_k', id);
      Storage.Set<string>("_n", full_name)
      Storage.Set<string>('_a', access_token);
      Storage.Set<string>('_ifl', '1');
      navigate('/setup');
    },
    // onError: (error) => {
    //     return error
    // },
  });
};
