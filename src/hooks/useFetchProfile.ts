import { useQuery } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export type FetchSetupType = {
  userId: string;
  userName: string;
  email: string;
  fullName: string;
  profile: {
    avatar: string | null;
    bio: string | null;
    birthDay: string | null;
  };
};
export const useFetchProfile = () => {
  const { axios } = useAxios();
  const {
    entity: { userId: id },
  } = useAppSelector((state) => state.information);
  const getQueries = async () => {
    const res = await axios.get<FetchSetupType>(`${env.BACK_END_URL}/user/profile/${id}`);
    return res.data;
  };
  const execute = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: getQueries,
    staleTime: Infinity,
  });
  return { ...execute };
};
