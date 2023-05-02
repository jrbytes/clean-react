import { faker } from '@faker-js/faker'

import { GetStorage } from '../protocols/cache'

export class GetStorageSpy implements GetStorage {
  key: string
  value: any = faker.science.unit()

  get(key: string): any {
    this.key = key
    return this.value
  }
}
