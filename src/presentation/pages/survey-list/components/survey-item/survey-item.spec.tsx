import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/test'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2023-01-10T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(
      screen.getByText(survey.question, { selector: 'p' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('day').textContent).toBe('10')
    expect(screen.getByLabelText('month').textContent).toBe('jan')
    expect(screen.getByLabelText('year').textContent).toBe('2023')
  })
})
