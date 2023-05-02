import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap).toHaveAttribute(
    'data-status',
    validationError ? 'invalid' : 'valid'
  )
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

export const populateField = async (
  fieldName: string,
  value = faker.random.word()
): Promise<void> => {
  const input = screen.getByTestId(fieldName)
  await userEvent.type(input, value)
}
