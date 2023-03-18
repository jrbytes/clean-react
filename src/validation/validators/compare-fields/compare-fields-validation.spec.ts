import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const equalWord = faker.random.word()
    const sut = makeSut(faker.random.word())
    const error = sut.validate(equalWord)
    expect(error).toEqual(new InvalidFieldError(equalWord))
  })
})
