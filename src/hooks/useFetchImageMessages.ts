import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Example {
  success: boolean;
  total_photos: number;
  message: string;
  offset: number;
  limit: number;
  photos: {
    url: string;
    title: string;
    user: number;
    id: number;
  }[];
}
export default function useFetchImageMessages() {
  // const { axios } = useAxios();
  const fetchFriendStatus = async () => {
    const res = await axios.get<Example>(`https://api.slingacademy.com/v1/sample-data/photos`);
    return res.data;
  };
  const query = useQuery({
    queryKey: ['get-images'],
    queryFn: fetchFriendStatus,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { ...query };
}
