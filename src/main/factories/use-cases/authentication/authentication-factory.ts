import { RemoteAuthentication } from 'data/use-cases'
import { AxiosClient } from 'infra/http'

export const makeAuthentication = () => {
  const authUrl = `${process.env.NEXT_PUBLIC_CMS_API_URL}/api/auth/local`
  return new RemoteAuthentication(authUrl, new AxiosClient())
}
