import React from 'react'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import { ApiContext } from '@/presentation/contexts'
import { Header } from '@/presentation/components'

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )
    await userEvent.click(screen.getByRole('link', { name: /sair/i }))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
