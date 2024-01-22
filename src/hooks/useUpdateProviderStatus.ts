/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';
import { Storage } from '../service';

export const useUpdateProviderStatus = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();
  const { provider } = useAppSelector((state) => state.provider);
  const id = Storage.Get('_k');
  return useMutation({
    mutationFn: async () => {
      return await axios.post(env.BACK_END_URL + '/auth/update-status', {
        provider,
        id,
      });
    },
    onSuccess: async () => {
      Storage.Del('_ifl');
      navigate('/me');
    },
  });
};
