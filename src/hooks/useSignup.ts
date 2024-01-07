/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';
import { useMutation } from 'react-query';
import { setId } from '../store/socket-id-slide';
import { Storage } from '../service/LocalStorage';
import { env } from '../config';
import { useAppDispatch } from './useAppDispatch';
import { useNavigate } from 'react-router-dom';

export interface RegisterDto {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
interface LoginResponse {
    id: string,
    email: string,
    full_name: string,
    user_name: string,
    access_token: string
}
export const useSignup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (dto: RegisterDto) => {
            return await axios.post<LoginResponse>(
                env.BACK_END_URL + '/auth/register',
                dto
            )
        },
        onSuccess: async (data) => {
            const { id } = data.data
            console.log(data)
            dispatch(setId(id))
            Storage.Set<string>("key", id)
            console.log(id)
            navigate("/me")
        },
        // onError: (error) => {
        //     return error
        // },
    })
}