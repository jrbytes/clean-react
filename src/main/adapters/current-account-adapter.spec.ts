import { mockAccountModel } from '@/domain/test'
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { UnexpectedError } from '@/domain/errors'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LoadCurrentAccount.set with correct value', async () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should throw UnexpectedError', async () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })

  test('Should call LoadCurrentAccount.get with correct value', async () => {
    const account = mockAccountModel()
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)
    const result = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
