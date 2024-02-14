import { useNavigate } from 'react-router-dom';

/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import { Storage } from '../service';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';

export const useUpdateProviderStatus = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();
  const { provider } = useAppSelector((state) => state.provider);
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);
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
