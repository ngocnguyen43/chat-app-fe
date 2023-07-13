import axios from 'axios'
import { useMutation } from 'react-query'

export const useWebAuthnLoginVerification = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return axios.post(
        'http://localhost:6001/api/v1/auth/webauth-login-verification',
        {
          email: data.email,
          data: data.data,
        }
      )
    },
  })
}
