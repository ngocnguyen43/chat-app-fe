import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppDispatch } from './useAppDispatch';
import { deleteConversations, rollbackConversations } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';

export function useDeleteCovnersation() {
    const { axios } = useAxios();
    const location = useLocation();
    const path = location.pathname.split('/');
    const currentConversation = path.at(-1) as string;
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: async () => {
            return axios.delete(
                `${env.BACK_END_URL}/conversation/${currentConversation}`);
        }, onSuccess: () => {
            dispatch(deleteConversations(currentConversation))
            navigate('/me')
        }, onError: () => {
            dispatch(rollbackConversations())
        }
    });
}
