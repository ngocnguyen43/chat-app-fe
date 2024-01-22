import axios from 'axios';
import { Storage } from '../service/LocalStorage';

export default function useAxios() {
  const ACCESS_TOKEN = Storage.Get('_a');
  const id = Storage.Get('_k');
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'x-id': id,
    },
    withCredentials: true,
  });
  return { axios: instance };
}
