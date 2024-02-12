import { useMutation } from '@tanstack/react-query';

import { env } from '../config';
import useAxios from './useAxios';
import { useAppDispatch } from './useAppDispatch';
import { setAuthError } from '../store';

export function useCheckAuth() {
    const { axios } = useAxios();
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: async () => {
            return axios.post(`${env.BACK_END_URL}/auth`);
        },
        onError: () => {
            dispatch(setAuthError(true));
        },
    });
}
