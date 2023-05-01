import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryHistory, createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import { SurveyResult } from '@/presentation/pages'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
} from '@/domain/test'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1,
  })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock,
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
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00'),
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut(loadSurveyResultSpy)
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

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    await act(() => makeSut(loadSurveyResultSpy))
    expect(screen.queryByText('Aguarde...')).not.toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = await act(() =>
      makeSut(loadSurveyResultSpy)
    )
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new UnexpectedError())
    await act(() => makeSut(loadSurveyResultSpy))
    await userEvent.click(
      screen.getByRole('button', { name: /tentar novamente/i })
    )
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should go to SurveyList on back button click', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00'),
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    const { history } = makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByText('jan'))
    await userEvent.click(screen.getByRole('button', { name: /voltar/i }))
    expect(history.location.pathname).toBe('/')
  })

  test('Should not present Loading on active answer click', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00'),
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByText('jan'))
    const listItem = screen.getAllByRole('listitem')
    await userEvent.click(listItem[0])
    expect(screen.queryByText('Aguarde...')).not.toBeInTheDocument()
  })
})
