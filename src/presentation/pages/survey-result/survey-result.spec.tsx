import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyResult } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    const error = new UnexpectedError()

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
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByText(error.message)).not.toBeInTheDocument()
    expect(screen.queryByText('Aguarde...')).not.toBeInTheDocument()
  })
})
