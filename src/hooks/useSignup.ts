/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useAppDispatch } from './useAppDispatch';
import { fetchInfomationThunk } from '../store/information-slice';

export interface RegisterDto {
  email: string;
  userName: string;
  fullName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export const useSignup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (dto: RegisterDto) => {
      return await axios.post<string>(env.BACK_END_URL + '/auth/register', dto);
    },
    onSuccess: async (data) => {
      // eslint-disable-next-line camelcase
      const id = data.data;
      dispatch(fetchInfomationThunk(id));
      navigate('/setup');
    },
    // onError: (error) => {
    //     return error
    // },
  });
};
