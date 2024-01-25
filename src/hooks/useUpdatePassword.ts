import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserContext } from '../store/context';
import { env } from '../config';
import useAxios from './useAxios';
import { delay } from '../utils';

export const useUpdatePassword = () => {
    const { user } = React.useContext(UserContext);
    const { axios } = useAxios();

    return useMutation({
        mutationFn: async ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) => {
            await delay(1000);
            return await axios.patch(env.BACK_END_URL + '/auth/newpassword', {
                email: user,
                newPassword,
                oldPassword
            });
        },
    });
};
