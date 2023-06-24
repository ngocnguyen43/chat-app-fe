import axios from 'axios'
import { useMutation } from 'react-query'
export const useWebAuthnRegistrationVerification = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return axios.post(
        'http://localhost:6001/api/v1/auth/webauth-registration-verification',
        {
          data,
        }
      )
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}
