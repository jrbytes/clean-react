import { screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'

import { Header } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { renderWithHistory } from '@/presentation/test'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: Header,
    account,
  })
  return {
    history,
    setCurrentAccountMock,
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', async () => {
    const { history, setCurrentAccountMock } = makeSut()
    await userEvent.click(screen.getByRole('link', { name: /sair/i }))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render username correctly', async () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByText(account.name)).toBeInTheDocument()
  })
})
