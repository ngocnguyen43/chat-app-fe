import { useQuery } from '@tanstack/react-query';

import { ACType } from '../@types';
import { env } from '../config';
import { useAppSelector } from './useAppSelector';
import useAxios from './useAxios';

export const useGetVACT = () => {
  const {
    entity: { userId: user },
  } = useAppSelector((state) => state.information);
  const { room } = useAppSelector((state) => state.callBox);
  const { axios } = useAxios();
  const getContacts = async () => {
    const res = await axios.get<ACType>(
      `${env.BACK_END_URL}/video/grant-identity?user=${user ?? ''}&conversation=${room}`,
    );
    return res.data;
  };
  const query = useQuery({ queryKey: ['get-contacts', user], queryFn: getContacts, refetchOnWindowFocus: false });
  return { ...query };
};
