import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory, MemoryHistory } from 'history'

import { mockSurveyModel } from '@/domain/test'
import { Item } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'
import { renderWithHistory } from '@/presentation/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  renderWithHistory({ history, Page: () => Item({ survey }) })
  return { history }
}

describe('Item Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00'),
    })
    makeSut(survey)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(
      screen.getByText(survey.question, { selector: 'p' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('day').textContent).toBe('10')
    expect(screen.getByLabelText('month').textContent).toBe('jan')
    expect(screen.getByLabelText('year').textContent).toBe('2020')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2022-02-03T00:00:00'),
    })
    makeSut(survey)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbDown)
    expect(
      screen.getByText(survey.question, { selector: 'p' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('day').textContent).toBe('03')
    expect(screen.getByLabelText('month').textContent).toBe('fev')
    expect(screen.getByLabelText('year').textContent).toBe('2022')
  })

  test('Should go to SurveyResult', async () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    await userEvent.click(screen.getByRole('link', { name: /ver resultado/i }))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
