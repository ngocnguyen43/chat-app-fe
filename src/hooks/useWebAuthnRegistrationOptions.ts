import axios from 'axios'
import { useMutation } from 'react-query'
import { useWebAuthnRegistrationVerification } from './useWebAuthnRegistrationVerification'
import { startRegistration } from '@simplewebauthn/browser'
export const useWebAuthnRegistrationOptions = () => {
  const { mutate } = useWebAuthnRegistrationVerification()
  return useMutation({
    mutationFn: async () => {
      return axios.post(
        'http://localhost:6001/api/v1/auth/webauth-registration-options',
        {
          email: 'minhngocnguyen.403@gmail.com',
        }
      )
    },
    onSuccess: async (data) => {
      const options = data?.data
      options['authenticatorSelection'].residentKey = 'required'
      options['authenticatorSelection'].requireResidentKey = true
      options.extensions = {
        credProps: true,
      }
      const loginRes = await startRegistration(options)
      console.log(loginRes)
      mutate({ user: { email: 'minhngocnguyen.403@gmail.com' }, loginRes })
    },
  })
}
