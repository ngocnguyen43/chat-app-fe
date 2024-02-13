import { useMutation } from '@tanstack/react-query';
import useAxios from './useAxios';
import { env } from '../config';
import { useAppSelector } from './useAppSelector';

export default function useDeleteFriendRequest(id: string | undefined) {
    const { axios } = useAxios();
    const {
        entity: { userId },
    } = useAppSelector((state) => state.information);
    return useMutation({
        mutationFn: async () => {
            return await axios.delete(env.BACK_END_URL + `/users/${userId}/friends/${id}`);
        },
    });
}
