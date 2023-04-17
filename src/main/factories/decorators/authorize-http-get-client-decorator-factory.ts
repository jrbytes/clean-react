import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { HttpGetClient } from '@/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )
}
