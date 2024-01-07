import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { env } from '../config';

export const useLoginOptions = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (email: string) => {
            return axios.post<{ opts: unknown }>(
                env.BACK_END_URL + '/auth/login-options',
                {
                    email
                }
            )
        },
        onSuccess: (data) => {
            console.log(data.data.opts)
            navigate("/password")
        },
    })
}
