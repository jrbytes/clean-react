import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyResult } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

const makeSut = (): void => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult />
    </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    const error = new UnexpectedError()
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByText(error.message)).not.toBeInTheDocument()
    expect(screen.queryByText('Aguarde...')).not.toBeInTheDocument()
  })
})
