import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
