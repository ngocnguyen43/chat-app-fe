import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { env } from '../config';
export type FetchSetupType =
    {
        "isLoginBefore": boolean,
        "id": string,
        "picture": string,
        "email": string,
        "full_name": string,
        "user_name": string
        "access_token": string
    }
export const useFetchSetupInformation = () => {
    const { axios } = useAxios()
    const getQueries = async () => {
        const res = await axios.get<FetchSetupType>(`${env.BACK_END_URL}/auth/login/success`);
        return res.data
    };
    const execute = useQuery({ queryKey: ["get-login-success"], queryFn: getQueries, refetchOnWindowFocus: false, retry: false })
    return { ...execute }
}