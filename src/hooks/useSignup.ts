/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';
import { useMutation } from 'react-query';
import { setId } from '../store/socket-id-slide';
import { Storage } from '../service/LocalStorage';
import { env } from '../config';

export interface RegisterDto {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
export const useSignup = () => {

    return useMutation({
        mutationFn: async (dto: RegisterDto) => {
            return await axios.post(
                env.BACK_END_URL + '/auth/register',
                dto
            )
        },
        onSuccess: async (data) => {
            console.log(data)
        },
        // onError: (error) => {
        //     return error
        // },
    })
}