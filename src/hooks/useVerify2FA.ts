import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { env } from '../config';
import { delay } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import { setMFASetupOpen } from '../store/MFA-setup-slice';
import { Storage } from '../service/LocalStorage';
import { useFetch2FA } from './useFetch2FA';

export const useVerify2FA = () => {
    const dispatch = useAppDispatch();
    const email = Storage.Get('_e') as string;
    const { refetch } = useFetch2FA()
    return useMutation({
        mutationFn: async (token: string) => {
            await delay(1000);
            return await axios.post(env.BACK_END_URL + '/auth/verify-otp', {
                email,
                token
            });
        },
        onSuccess: () => {
            refetch()
            dispatch(setMFASetupOpen(false));
        },
    });
};
