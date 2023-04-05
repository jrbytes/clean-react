import faker from 'faker'

import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void => {
  Helper.mockInvalidCredentialsError(/login/)
}

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  Helper.mockUnexpectedError(/signup/, 'POST')
}

export const mockOk = (): void => {
  Helper.mockOk(/login/, 'POST', { accessToken: faker.random.uuid() })
}

export const mockInvalidData = (): void => {
  Helper.mockOk(/login/, 'POST', { invalid: faker.random.uuid() })
}
