/* eslint-disable @typescript-eslint/require-await */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { env } from '../config';
import useAxios from './useAxios';

export const useUpdateProviderStatus = () => {
    const navigate = useNavigate()
    const { axios } = useAxios()
    return useMutation({
        mutationFn: async (provider: string) => {
            return await axios.post(
                env.BACK_END_URL + '/auth/update-status', {
                provider
            })
        },
        onSuccess: async () => {
            navigate("/me")
        }
    })
}