/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserContext } from '../store/context';
import { useAppDispatch } from './useAppDispatch';
import { setId } from '../store/socket-id-slide';
import { Storage } from '../service/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { env } from '../config';
import useAxios from './useAxios';

interface LoginResponse {
    id: string,
    email: string,
    full_name: string,
    user_name: string,
    access_token: string
}
export const usePassword = () => {
    const { user } = React.useContext(UserContext)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { axios } = useAxios()
    return useMutation({
        mutationFn: async (password: string) => {
            return await axios.post<LoginResponse>(
                env.BACK_END_URL + '/auth/login-password',
                {
                    email: user,
                    password,
                }
            )
        },
        onSuccess: async (data) => {
            // const options = data.data
            // console.log(options)
            // const loginRes = await startAuthentication(options)
            // const request = {
            //     email: 'minhngocx2003.403@gmail.com',
            //     data: loginRes,
            // }
            // mutate(request)
            const { id, access_token: ACT } = data.data
            dispatch(setId(id))
            Storage.Set<string>("key", id)
            Storage.Set<string>("_a", ACT)
            navigate("/me")
        }
    })
}