import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';

type MediaMessage = {
  id: string;
  conversation: string;
  time: string;
  sender: string;
  type: 'image' | 'video' | 'audio';
  file: {
    file: File | Blob;
    url: string;
    type?: string | undefined;
  }[];
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

export function useCreateMediaMessage() {
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (data: MediaMessage) => {
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('conversation', data.conversation);
      formData.append('time', data.time);
      formData.append('sender', data.sender);
      data.file.forEach((f) => {
        formData.append('file', f.file);
      });
      formData.append('type', data.type);
      console.log(formData);
      return axios.post(
        `${env.BACK_END_URL}/file/media`,
        formData,
        // {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // }
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
