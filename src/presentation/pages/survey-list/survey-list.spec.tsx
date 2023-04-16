import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { mockSurveyListModel } from '@/domain/test'
import { UnexpectedError } from '@/domain/errors'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy,
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    const error = new UnexpectedError()

    makeSut()
    const surveyList = screen.getByRole('list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(3)
    expect(screen.queryByText(error.message)).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading', { name: 'Enquetes' }))
  })

  test('Should render SurveyItems on success', async () => {
    const error = new UnexpectedError()

    makeSut()
    const surveyList = screen.getByRole('list')
    await waitFor(() =>
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    )
    expect(screen.queryByText(error.message)).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    await act(() => makeSut(loadSurveyListSpy))
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
  })
})
