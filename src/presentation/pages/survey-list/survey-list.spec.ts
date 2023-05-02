import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory, MemoryHistory } from 'history'

import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { mockSurveyListModel } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { renderWithHistory } from '@/presentation/test'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SurveyList({ loadSurveyList: loadSurveyListSpy }),
  })
  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock,
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

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    await act(() => makeSut(loadSurveyListSpy))
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = await act(() =>
      makeSut(loadSurveyListSpy)
    )
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError())
    await act(() => makeSut(loadSurveyListSpy))
    await userEvent.click(
      screen.getByRole('button', { name: /tentar novamente/i })
    )
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
