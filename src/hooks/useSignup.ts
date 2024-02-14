/* eslint-disable @typescript-eslint/require-await */
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { useAppDispatch } from './useAppDispatch';
import { fetchInfomationThunk } from '../store/information-slice';
import useAxios from './useAxios';

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
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (dto: RegisterDto) => {
      return await axios.post<string>(env.BACK_END_URL + '/auth/register', dto);
    },
    onSuccess: async (data) => {
      // eslint-disable-next-line camelcase
      const id = data.data;
      dispatch(fetchInfomationThunk(id)).then(() => {
        navigate('/setup');
      });
    },
    // onError: (error) => {
    //     return error
    // },
  });
};
