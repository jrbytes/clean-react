import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { SurveyResult } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
} from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.surveyResult = surveyResult
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    const error = new UnexpectedError()
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByText(error.message)).not.toBeInTheDocument()
    expect(screen.queryByText('Aguarde...')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should present SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00'),
    })
    makeSut(surveyResult)
    await waitFor(() => screen.getByText('jan'))
    expect(screen.getByLabelText('day').textContent).toBe('10')
    expect(screen.getByLabelText('month').textContent).toBe('jan')
    expect(screen.getByLabelText('year').textContent).toBe('2020')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      surveyResult.question
    )
    const listItem = screen.getAllByRole('listitem')
    expect(listItem.length).toBe(2)
    expect(listItem[0]).toHaveClass('active')
    expect(listItem[1]).not.toHaveClass('active')
    const images = screen.getAllByLabelText('image list')
    expect(images.length).toBe(1)
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.getAllByLabelText('answer span')
    expect(answers.length).toBe(2)
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.getAllByLabelText('percent span')
    expect(percents.length).toBe(2)
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })
})
