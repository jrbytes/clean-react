import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Login } from '@/presentation/pages'
import {
  ValidationStub,
  AuthenticationSpy,
  Helper,
  renderWithHistory,
} from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () =>
      Login({ validation: validationStub, authentication: authenticationSpy }),
  })
  return {
    authenticationSpy,
    setCurrentAccountMock,
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  await Helper.populateField('email', email)
  await Helper.populateField('password', password)
  const submitButton = screen.getByRole('button', { name: /entrar/i })
  await userEvent.click(submitButton)

  const form = screen.getByTestId('form')
  await waitFor(() => form)
}

describe('Login component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    await Helper.populateField('email')

    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    await Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation success', async () => {
    makeSut()
    await Helper.populateField('email')

    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation success', async () => {
    makeSut()
    await Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await Helper.populateField('email')
    await Helper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call Authentication wih correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await userEvent.click(submitButton)
    await userEvent.click(submitButton)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to sign up page', () => {
    makeSut()
    const register = screen.getByTestId('signup-link')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
