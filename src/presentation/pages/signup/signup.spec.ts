import { fireEvent, waitFor, screen } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'

import {
  Helper,
  ValidationStub,
  AddAccountSpy,
  renderWithHistory,
} from '@/presentation/test'
import SignUp from './signup'
import { EmailInUseError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () =>
      SignUp({ validation: validationStub, addAccount: addAccountSpy }),
  })
  return {
    addAccountSpy,
    setCurrentAccountMock,
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  await Helper.populateField('name', name)
  await Helper.populateField('email', email)
  await Helper.populateField('password', password)
  await Helper.populateField('passwordConfirmation', password)
  const submitButton = screen.getByRole('button', { name: /cadastrar/i })
  await userEvent.click(submitButton)

  const form = screen.getByTestId('form')
  await waitFor(() => form)
}

describe('SignUp component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    await Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
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

  test('Should show passwordConfirmation error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    await Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation success', async () => {
    makeSut()
    await Helper.populateField('name')
    Helper.testStatusForField('name')
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

  test('Should show valid passwordConfirmation state if Validation success', async () => {
    makeSut()
    await Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await Helper.populateField('name')
    await Helper.populateField('email')
    await Helper.populateField('password')
    await Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount wih correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await userEvent.click(submitButton)
    await userEvent.click(submitButton)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
