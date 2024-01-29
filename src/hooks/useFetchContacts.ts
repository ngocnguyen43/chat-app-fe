import { useQuery } from '@tanstack/react-query';

import { ContactType } from '../@types';
import { env } from '../config';
import { Storage } from '../service/LocalStorage';
import useAxios from './useAxios';

export const useFetchContacts = () => {
  const id = Storage.Get('_k');
  const { axios } = useAxios();
  const getContacts = async () => {
    const res = await axios.get<ContactType[]>(`${env.BACK_END_URL}/user/contacts/${id ?? ''}`);
    return res.data;
  };
  const query = useQuery({ queryKey: ['get-contacts', id], queryFn: getContacts, refetchOnWindowFocus: false });
  return { ...query };
};
