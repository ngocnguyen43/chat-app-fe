import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppSelector } from './useAppSelector';

export function useBlockUser() {
    const { axios } = useAxios();
    const { id } = useAppSelector(state => state.currentConversation)
    return useMutation({
        mutationFn: async ({ blocker, user }: { blocker: string, user: string }) => {
            return axios.post(`${env.BACK_END_URL}/user/block`, {
                blocker,
                user,
                conversation: id
            });
        }
    });
}
