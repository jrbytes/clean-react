import React from 'react'
import { MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'
import { Router } from 'react-router-dom'

import { currentAccountState } from '@/presentation/components'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

type StateProps = {
  atom: RecoilState<any>
  value: any
}

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
  states?: StateProps[]
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({
  Page,
  history,
  account = mockAccountModel(),
  states = [],
}: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  }
  const initializeState = ({ set }: MutableSnapshot): void => {
    return [
      ...states,
      { atom: currentAccountState, value: mockedState },
    ].forEach((state) => set(state.atom, state.value))
  }
  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock,
  }
}
