import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  constructor (readonly field: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate (input: object): Error {
    return this.error
  }
}
