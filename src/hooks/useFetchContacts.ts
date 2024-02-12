import { useQuery } from '@tanstack/react-query';

import { ContactType } from '../@types';
import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export const useFetchContacts = () => {
  const { entity: { userId: id } } = useAppSelector(state => state.information);
  const { axios } = useAxios();
  const getContacts = async () => {
    const res = await axios.get<ContactType[]>(`${env.BACK_END_URL}/user/contacts/${id ?? ''}`);
    return res.data;
  };
  const query = useQuery({ queryKey: ['get-contacts', id], queryFn: getContacts, refetchOnWindowFocus: false });
  return { ...query };
};
