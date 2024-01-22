import { useMutation } from '@tanstack/react-query';

import useAxios from './useAxios';
import { env } from '../config';

type UploadAvatarType = {
  id: string;
  file: File;
};
// export function useCreateMessage() {
//   const { axios } = useAxios()
//   return useMutation({
//     mutationFn: async (data: Message) => {
//       return axios.post('http://localhost:6101/message', data)
//     },
//     onSuccess: (data) => {
//       console.log(data)
//     },
//   })
// }

export function useCreateAvatar() {
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (data: UploadAvatarType) => {
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('file', data.file);
      console.log(formData);
      return await axios.post(`${env.BACK_END_URL}/file/avatar`, formData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
