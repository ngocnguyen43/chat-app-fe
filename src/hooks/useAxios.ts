import axios from 'axios';

import { useAppSelector } from './useAppSelector';

export default function useAxios() {
  const { entity: { userId: id } } = useAppSelector(state => state.information);
  const instance = axios.create({
    headers: {
      'x-id': id,
    },
    withCredentials: true,
  });
  return { axios: instance };
}
