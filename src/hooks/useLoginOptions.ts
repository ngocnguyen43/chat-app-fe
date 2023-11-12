import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useLoginOptions = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (email: string) => {
            return axios.post<{ opts: unknown }>(
                'http://localhost:6001/api/v1/auth/login-options',
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
