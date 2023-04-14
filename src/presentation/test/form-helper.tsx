import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button: HTMLButtonElement = screen.getByTestId(fieldName)
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = async (
  fieldName: string,
  value = faker.random.word()
): Promise<void> => {
  const input = screen.getByTestId(fieldName)
  await userEvent.type(input, value)
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
