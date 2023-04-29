import React from 'react'
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { mockSurveyModel } from '@/domain/test'
import { Item } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'

type SutTypes = {
  survey: LoadSurveyList.Model
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  render(
    <Router history={createMemoryHistory()}>
      <Item survey={survey} />
    </Router>
  )
  return {
    survey,
  }
}

describe('Item Component', () => {
  test('Should render with correct values', () => {
    const surveyMock = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2023-01-03T00:00:00'),
    })
    const { survey } = makeSut(surveyMock)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(
      screen.getByText(survey.question, { selector: 'p' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('day').textContent).toBe('03')
    expect(screen.getByLabelText('month').textContent).toBe('jan')
    expect(screen.getByLabelText('year').textContent).toBe('2023')
  })

  test('Should render with correct values', () => {
    const surveyMock = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-23T00:00:00'),
    })
    makeSut(surveyMock)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByLabelText('day').textContent).toBe('23')
    expect(screen.getByLabelText('month').textContent).toBe('mai')
    expect(screen.getByLabelText('year').textContent).toBe('2019')
  })
})
