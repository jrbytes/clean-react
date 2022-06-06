import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const randomWord = faker.random.word()
    const sut = new EmailValidation(randomWord)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(randomWord))
  })

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
