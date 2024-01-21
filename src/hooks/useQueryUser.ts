import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { env } from '../config';
export type QueriesType =
    {
        "userId": string,
        "email": string,
        "fullName": string,
        "request": [{
            "status": "pending" | "accepted"
        }] | [],
        profile: {
            avatar: string
        } | null
    }
export const useQueryUser = (query: string) => {
    const { axios } = useAxios()
    const getQueries = async () => {
        const res = await axios.get<QueriesType[]>(`${env.BACK_END_URL}/user?q=${query ?? ""}`);
        return res.data
    };
    const execute = useQuery({ queryKey: query ? ["get-queries", query] : ["get-queries"], queryFn: getQueries, refetchOnWindowFocus: false, enabled: Boolean(query) })
    return { ...execute }
}