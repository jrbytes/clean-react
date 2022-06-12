import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

const makeSut = (randomColumn?: string): EmailValidation => new EmailValidation(randomColumn || faker.database.column())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const randomColumn = faker.database.column()
    const sut = makeSut(randomColumn)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(randomColumn))
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
