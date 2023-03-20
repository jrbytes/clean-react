import React from 'react'
import { cleanup, render, RenderResult, waitFor } from '@testing-library/react'
import faker from 'faker'
import userEvent from '@testing-library/user-event'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const sut = render(
    <SignUp validation={validationStub} addAccount={addAccountSpy} />
  )
  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  await Helper.populateField(sut, 'name', name)
  await Helper.populateField(sut, 'email', email)
  await Helper.populateField(sut, 'password', password)
  await Helper.populateField(sut, 'passwordConfirmation', password)
  const submitButton = sut.getByRole('button', { name: /entrar/i })
  await userEvent.click(submitButton)

  const form = sut.getByTestId('form')
  await waitFor(() => form)
}

describe('SignUp component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation success', async () => {
    const { sut } = makeSut()
    await Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email state if Validation success', async () => {
    const { sut } = makeSut()
    await Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation success', async () => {
    const { sut } = makeSut()
    await Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if Validation success', async () => {
    const { sut } = makeSut()
    await Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    await Helper.populateField(sut, 'name')
    await Helper.populateField(sut, 'email')
    await Helper.populateField(sut, 'password')
    await Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount wih correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name, email, password, passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    const submitButton = sut.getByRole('button', { name: /entrar/i })
    await userEvent.click(submitButton)
    await userEvent.click(submitButton)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })
})
